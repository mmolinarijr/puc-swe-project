import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';
import sql from './src/config/db.mjs';
import user from './src/model/user.mjs';

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await sql`
                SELECT * FROM username WHERE name = ${username}
            `;

            console.log('000 - user - ', user);

            if (user.length !== 0) {
                if (!user) {
                    console.log('001 - Incorrect username.');
                    return done(null, false, { message: 'Incorrect username.' });
                }

                const isPasswordValid = await bcrypt.compare(password, user[0].password);

                console.log('isPasswordValid - ', isPasswordValid);

                if (!isPasswordValid) {
                    console.log('002 - Incorrect password.');
                    return done(null, false, { message: 'Incorrect password.' });
                }

                return done(null, user);
            } else {
                return done(null, false, { message: 'Incorrect username.' });
            }
        } catch (error) {
            console.log('003 - Error - ', error);
            return done(error);
        }
    })
);

passport.serializeUser((user, done) => {
    console.log('004 - serializeUser user - ', user);
    console.log('004 - serializeUser done - ', done);
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
