import sql from '../config/db.mjs';

async function create({ user_id, description, date }) {
    try {
        const [user] = await sql`
            insert into appointment
                (user_id, description, date)
            values
                (${user_id}, ${description}, ${date})
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
        const appointment = await sql`
            select appointment.*, username.name
            from appointment
            join username on appointment.user_id = username.id;
        `;

        return appointment;
    } catch (error) {
        console.error('DB connection error', error);
        return error;
    }
}

export default { create, read };
