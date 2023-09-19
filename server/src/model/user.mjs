import sql from '../config/db.mjs';

async function create({ name, password, type, email }) {
    try {
        const [user] = await sql`
            insert into username
                (name, password, type, email)
            values
                (${name}, ${password}, ${type}, ${email})
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

        console.log('11read - ', users);

        return users;
    } catch (error) {
        console.error('DB connection error', error);
        return error;
    }
}

export default { create, read };
