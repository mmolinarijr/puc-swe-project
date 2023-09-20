import sql from '../config/db.mjs';
import bcrypt from 'bcrypt';

async function create({ name, password, type, email }) {
    function hashPassword(passwords) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(passwords, salt);

        return hash;
    }

    const hashed = hashPassword(password);

    try {
        const [user] = await sql`
            insert into username
                (name, password, type, email)
            values
                (${name}, ${hashed}, ${type}, ${email})
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

async function readById(id) {
    try {
        const [user] = await sql`
            select * from username where id = ${id};
        `;

        console.log('readById - ', user);

        return user;
    } catch (error) {
        console.error('DB connection error', error);
        return error;
    }
}

async function editById(id, { name, cpf, email }) {
    try {
        const [user] = await sql`
                update username
                    set name = ${name},
                        cpf = ${cpf},
                        email = ${email}
                    where id = ${id}
                returning *;
            `;

        console.log('editById - ', user);

        return user;
    } catch (error) {
        console.error('DB connection error', error);
        return error;
    }
}

async function deleteById(id) {
    try {
        const [user] = await sql`
            delete from username where id = ${id};
        `;

        console.log('deleteById - ', user);

        return user;
    } catch (error) {
        console.error('DB connection error', error);
        return error;
    }
}

export default { create, read, readById, editById, deleteById };
