import { adminUserExists, findUserByEmail, setUserRole } from "../src/lib/server/db";

const email = process.argv[2]?.trim().toLowerCase();

if (!email) {
  console.error("Usage: npx tsx scripts/seed-admin.ts user@example.com");
  process.exit(1);
}

const user = findUserByEmail(email);
if (!user) {
  console.error(`No account found for ${email}`);
  process.exit(1);
}

if (user.role === "admin") {
  console.log(`${email} is already an admin.`);
  process.exit(0);
}

const promoted = setUserRole(email, "admin");
if (!promoted || !adminUserExists()) {
  console.error(`Could not promote ${email}.`);
  process.exit(1);
}

console.log(`Promoted ${email} to admin.`);
