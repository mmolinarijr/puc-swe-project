import express from 'express';
import version from './model/db-version.mjs';
import user from './model/user.mjs';
import appointment from './model/appointment.mjs';
import passport from '../passportConfig.js';

const router = express.Router();

/**
 * @swagger
 * /api:
 *   get:
 *     tags:
 *       - API
 *     description: Returns the API default message
 *     responses:
 *       '200':
 *         description: successful response
 */
router.get('/', (req, res) => {
    console.log('GET /api');
    res.send('Puc SWE Project API');
});

/**
 * @swagger
 * /api:
 *   post:
 *     tags:
 *       - Login
 *     description: tries to login
 *     responses:
 *       '200':
 *         description: successful response
 */
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.log('router.post - err - ', err);
            return next(err);
        }

        if (!user) {
            console.log('router.post - !user - ', user);
            return res.status(401).send({ message: 'Authentication failed' });
        }

        console.log('err - ', err);
        console.log('user - ', user);
        console.log('info - ', info);

        return res.status(200).json({ message: 'User logged in successfully' });
    })(req, res, next);
});

/**
 * @swagger
 * /api/version:
 *   get:
 *     tags:
 *       - Version
 *     description: Returns the PostGres Database version
 *     responses:
 *       '200':
 *         description: successful response
 */
router.get('/version', async (req, res) => {
    console.log('GET /api/version');
    res.send(await version);
});

/**
 * @swagger
 * /api/user:
 *   get:
 *     tags:
 *       - User
 *     description: Returns all registered users
 *     responses:
 *       '200':
 *         description: successful response
 */
router.get('/user', async (req, res) => {
    console.log('GET /api/user');
    res.send(await user.read());
});

/**
 * @swagger
 * /api/user:
 *   post:
 *     tags:
 *       - User
 *     description: Saves a new user
 *     responses:
 *       '200':
 *         description: successful response
 */
router.post('/user', async (req, res) => {
    try {
        console.log('POST /api/user', req.body);
        await user.create(req.body);
        res.status(200).send('User created');
    } catch (error) {
        console.error('POST /api/user', error);
        res.status(500).send('Internal Server Error' + error);
    }
});

/**
 * @swagger
 * /api/user/{id}:
 *   put:
 *     tags:
 *       - User
 *     parameters: id
 *     description: Edit an user by Id
 *     responses:
 *       '200':
 *         description: successful response
 */
router.put('/user/:id', async (req, res) => {
    try {
        console.log('PUT /api/user', req.body);
        await user.editById(req.params.id, req.body);
        res.status(200).send('User edited successfully');
    } catch (error) {
        console.error('PUT /api/user', error);
        res.status(500).send('Internal Server Error' + error);
    }
});

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     tags:
 *       - User
 *     parameters: id
 *     description: Deletes an user by Id
 *     responses:
 *       '200':
 *         description: successful response
 */
router.delete('/user/:id', async (req, res) => {
    try {
        console.log('DELETE /api/user', req.params.id);
        await user.deleteById(req.params.id);
        res.status(200).send('User deleted successfully');
    } catch (error) {
        console.error('DELETE /api/user', error);
        res.status(500).send('Internal Server Error' + error);
    }
});

/**
 * @swagger
 * /api/appointment:
 *   get:
 *     tags:
 *       - Appointment
 *     description: Returns all patients apoointments
 *     responses:
 *       '200':
 *         description: successful response
 */
router.get('/appointment', async (req, res) => {
    try {
        const params = req.query;
        const getData = await appointment.read(params);
        console.log('GET /api/appointment params', req.query);

        console.log('GET /api/appointment getData', getData);

        if (Array.isArray(getData)) {
            res.send(getData);
        } else {
            res.status(404).json({ error: 'No appointment data found' });
        }
    } catch (error) {
        console.error('GET /api/appointment', error);
        res.status(500).send('Internal Server Error' + error);
    }
    // res.json(await appointment.read(req.query));
});

/**
 * @swagger
 * /api/appointment:
 *   post:
 *     tags:
 *       - Appointment
 *     description: Saves a new appointment
 *     responses:
 *       '200':
 *         description: successful response
 */
router.post('/appointment', async (req, res) => {
    try {
        console.log('POST /api/appointment', req.params.id, req.body);
        await appointment.create(req.body);
        res.status(200).send('Appointment created successfully');
    } catch (error) {
        console.error('POST /api/appointment', error);
        res.status(500).send('Internal Server Error' + error);
    }
});

export default router;
