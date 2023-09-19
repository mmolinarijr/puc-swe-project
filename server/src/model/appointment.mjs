import sql from "../config/db.mjs";

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
    console.error("DB connection error", error);
  }
}

async function read() {
  try {
    const appointment = await sql`
        select * from appointment;
        `;
    return appointment;
  } catch (error) {
    console.error("DB connection error", error);
  }
}

export default { create, read };
