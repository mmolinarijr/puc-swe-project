import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcryptjs';
import sql from './src/config/db.mjs';
import user from './src/model/user.mjs';

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await sql`
                SELECT * FROM username WHERE name = ${username}
            `;

            if (user.length !== 0) {
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }

                const isPasswordValid = await bcrypt.compare(password, user[0].password);

                if (!isPasswordValid) {
                    return done(null, false, { message: 'Incorrect password.' });
                }

                return done(null, user);
            } else {
                return done(null, false, { message: 'Incorrect username.' });
            }
        } catch (error) {
            return done(error);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user[0].id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const users = await user.readById(id);

        if (!users) {
            return done(null, false);
        }

        return done(null, users);
    } catch (error) {
        return done(error);
    }
});

export default passport;
