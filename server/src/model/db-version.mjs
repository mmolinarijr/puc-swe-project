import sql from '../config/db.mjs';

async function getPgVersion() {
    try {
        const result = await sql`select version()`;
        console.info('getPgVersion', result);

        return result;
    } catch (error) {
        console.error('DB connection error', error);
        return error;
    }
}

export default getPgVersion();
