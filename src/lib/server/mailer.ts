import net from "node:net";
import tls from "node:tls";

// T7-2: minimal config-driven SMTP sender — zero new dependencies (roadmap
// law: no deps unattended; nodemailer can replace this later if Samy prefers).
// Env: LAYAIDA_SMTP_HOST, LAYAIDA_SMTP_PORT (587), LAYAIDA_SMTP_USER,
// LAYAIDA_SMTP_PASS, LAYAIDA_MAIL_FROM. With LAYAIDA_DEV_MAIL_LOG=1 or no host
// configured, mail is logged instead of sent so dev/e2e never needs creds.

export type Mail = { to: string; subject: string; text: string };

function smtpConfigured(): boolean {
  return Boolean(process.env.LAYAIDA_SMTP_HOST);
}

export function devMailLogEnabled(): boolean {
  return process.env.LAYAIDA_DEV_MAIL_LOG === "1" || !smtpConfigured();
}

type Conn = {
  socket: net.Socket | tls.TLSSocket;
  readReply: () => Promise<string>;
  writeLine: (line: string) => void;
  destroy: () => void;
};

function connect(host: string, port: number): Promise<Conn> {
  return new Promise((resolve, reject) => {
    const socket = net.connect({ host, port });
    socket.setEncoding("utf8");
    let buffer = "";
    const readReply = (): Promise<string> =>
      new Promise((res, rej) => {
        const finish = (): void => {
          const last = buffer.trimEnd().split("\r\n").pop() ?? "";
          if (/^[1-5]\d\d/.test(last)) res(buffer);
          else rej(new Error(`smtp malformed reply: ${JSON.stringify(last)}`));
        };
        const onData = (chunk: string): void => {
          buffer += chunk;
          // a reply ends when the final line has no "-" after its code
          if (/\r\n\d{3} /.test(buffer) || /^\d{3} \r?\n/.test(buffer)) {
            socket.removeListener("data", onData);
            const out = buffer;
            buffer = "";
            res(out); // raw resolve; status checked by caller
            void finish;
          }
        };
        socket.on("data", onData);
        socket.once("error", (e) => {
          socket.removeListener("data", onData);
          rej(e);
        });
      });
    socket.on("connect", () => {
      resolve({
        socket,
        readReply,
        writeLine: (line) => socket.write(line + "\r\n"),
        destroy: () => socket.destroy(),
      });
    });
    socket.once("error", reject);
    socket.setTimeout(15_000, () => {
      socket.destroy();
      reject(new Error("smtp connect timeout"));
    });
  });
}

async function cmd(conn: Conn, line: string | null, expect: [number, number]): Promise<string> {
  if (line !== null) conn.writeLine(line);
  const reply = await conn.readReply();
  const code = parseInt(reply.trimEnd().split("\r\n").pop()!.slice(0, 3), 10);
  if (code < expect[0] || code > expect[1]) {
    throw new Error(`smtp ${code} for ${line?.split(" ")[0] ?? "connect"}: ${reply.trimEnd().split("\r\n").pop()}`);
  }
  return reply;
}

/** EHLO → STARTTLS → EHLO → AUTH PLAIN → MAIL → RCPT → DATA → QUIT. */
async function smtpSend(mail: Mail): Promise<void> {
  const host = process.env.LAYAIDA_SMTP_HOST!;
  const port = Number(process.env.LAYAIDA_SMTP_PORT ?? "587");
  const user = process.env.LAYAIDA_SMTP_USER ?? "";
  const pass = process.env.LAYAIDA_SMTP_PASS ?? "";
  const from = process.env.LAYAIDA_MAIL_FROM ?? "ecole@localhost";

  const plain = await connect(host, port);
  try {
    await cmd(plain, null, [200, 299]); // banner
    await cmd(plain, `EHLO ecole.local`, [200, 299]);
    await cmd(plain, "STARTTLS", [200, 299]);

    // upgrade in place
    const tlsSocket = await new Promise<tls.TLSSocket>((resolve, reject) => {
      const t = tls.connect({ socket: plain.socket as net.Socket, servername: host }, () => resolve(t));
      t.once("error", reject);
    });
    tlsSocket.setEncoding("utf8");
    const conn: Conn = {
      socket: tlsSocket,
      readReply: plain.readReply,
      writeLine: (line) => tlsSocket.write(line + "\r\n"),
      destroy: () => tlsSocket.destroy(),
    };

    await cmd(conn, `EHLO ecole.local`, [200, 299]);
    if (user) {
      const initial = Buffer.from(`\0${user}\0${pass}`).toString("base64");
      await cmd(conn, `AUTH PLAIN ${initial}`, [200, 299]);
    }
    await cmd(conn, `MAIL FROM:<${from}>`, [200, 299]);
    await cmd(conn, `RCPT TO:<${mail.to}>`, [200, 299]);
    await cmd(conn, "DATA", [300, 399]);
    const body = [
      `From: Layaida <${from}>`,
      `To: <${mail.to}>`,
      `Subject: ${mail.subject}`,
      "MIME-Version: 1.0",
      "Content-Type: text/plain; charset=utf-8",
      "",
      mail.text.replace(/^\./gm, ".."),
      ".",
    ].join("\r\n");
    await cmd(conn, body, [200, 299]);
    conn.writeLine("QUIT");
    conn.destroy();
  } catch (err) {
    plain.destroy();
    throw err;
  }
}

export async function sendMail(mail: Mail): Promise<boolean> {
  if (devMailLogEnabled()) {
    console.log(`[mail:dev] to=${mail.to} subject=${JSON.stringify(mail.subject)}\n${mail.text}`);
    return true;
  }
  try {
    await smtpSend(mail);
    return true;
  } catch (err) {
    console.error("[mail] send failed:", err);
    return false;
  }
}
