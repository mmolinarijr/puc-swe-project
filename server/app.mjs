import express from 'express';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import specs from './swaggerOptions.js';
import router from './src/router.mjs';

const app = express();
const port = process.env.PORT || 3000;

app.use(passport.initialize());

app.use(
    session({
        secret: 'a8f5f167f44f4964e6c998dee827110c',
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.session());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(express.json());
app.use(cors());

app.use(express.static('public'));

app.use('/api', router);

app.listen(port, () => {
    console.info(`App listening on port ${port}`);
});
