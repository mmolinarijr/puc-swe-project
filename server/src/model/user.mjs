import sql from '../config/db.mjs';

async function create({ username, password, type, email }) {
    try {
        const [user] = await sql`
            insert into username
                (username, password, type, email)
            values
                (${username}, ${password}, ${type}, ${email})
            returning *;
        `;

        return user;
    } catch (error) {
        console.error('DB connection error', error);
        return error;
    }
}

async function read() {
    try {
        const users = await sql`
            select * from username;
        `;

        return users;
    } catch (error) {
        console.error('DB connection error', error);
        return error;
    }
}

export default { create, read };
