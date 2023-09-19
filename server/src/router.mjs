import express from 'express';
import version from './model/db-version.mjs';
import user from './model/user.mjs';
import appointment from './model/appointment.mjs';

const router = express.Router();

/**
 * @swagger
 * /api:
 *   get:
 *     tags:
 *       - API
 *     description: Returns the API Hello World message
 *     responses:
 *       '200':
 *         description: successful response
 */
router.get('/', (req, res) => {
    console.log('GET /api');
    res.send('Hello World!');
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
    console.log('POST /api/user', req.body);
    res.send(req.body);
    await user.create(req.body);
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
    console.log('GET /api/appointment', req.params.id);
    res.send(await appointment.read());
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
    console.log('POST /api/appointment', req.params.id, req.body);
    res.send(req.body);
    await appointment.create(req.body);
});

export default router;
