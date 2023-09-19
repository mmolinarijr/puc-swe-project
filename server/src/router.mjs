import express from 'express';
import version from './model/version.mjs';
import user from './model/user.mjs';
import appointment from './model/appointment.mjs';

const router = express.Router();

/**
 * @swagger
 * /api:
 *   get:
 *     tags:
 *       - Hello World
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

router.get('/user', async (req, res) => {
    console.log('GET /api/user');
    res.send(await user.read());
});

router.post('/user', async (req, res) => {
    console.log('POST /api/user', req.body);
    res.send(req.body);
    await user.create(req.body);
});

router.get('/appointment', async (req, res) => {
    console.log('GET /api/appointment', req.params.id);
    res.send(await appointment.read());
});

router.post('/appointment', async (req, res) => {
    console.log('POST /api/appointment', req.params.id, req.body);
    res.send(req.body);
    await appointment.create(req.body);
});

export default router;
