import dotenv from "dotenv";
dotenv.config();

import postgres from "postgres";

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`;

const sql = postgres(URL, { ssl: "require" });

console.error("DB URL:", URL);
console.info("DB sql:", sql);

try {
  await sql`select version()`;
  console.log("DB connected");
} catch (error) {
  console.error("DB connection error", error);
}

export default sql;
