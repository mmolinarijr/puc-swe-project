import dotenv from 'dotenv';
import postgres from 'postgres';

dotenv.config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`;
const sql = postgres(URL, { ssl: 'require' });

try {
    await sql`select version()`;
} catch (error) {
    console.error('DB connection error', error);
}

export default sql;
