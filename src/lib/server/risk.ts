import { getSessionsDb } from "./db";

/**
 * Notice-only signal for the first sharing-detection pass. A later phase can
 * combine this with trusted-device history and account context before adding
 * alerts or enforcement; this count alone must not block a learner.
 */
export function countDistinctActiveDevices(userId: number, windowMs = 24 * 60 * 60 * 1000): number {
  const now = Date.now();
  const row = getSessionsDb()
    .prepare(
      `SELECT COUNT(*) AS count FROM (
         SELECT ip, user_agent FROM sessions
         WHERE user_id = ? AND expires_at > ? AND last_seen_at >= ?
         GROUP BY ip, user_agent
       )`
    )
    .get(userId, now, now - windowMs) as { count: number };
  return row.count;
}
