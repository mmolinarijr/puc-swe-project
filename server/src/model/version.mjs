import sql from "../config/db.mjs";

async function getPgVersion() {
  try {
    const result = await sql`select version()`;
    console.log('getPgVersion', result);
    return result;
  } catch (error) {
    console.error("DB connection error", error);
  }
}

export default getPgVersion();
