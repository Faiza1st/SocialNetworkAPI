const router = require('express').Router();
const apiRoute = require('./api');

router.use('/api', apiRoute);

router.use((req, res) => res.status(404).send('Please Check Route, Incorrect!'));

module.exports = router;