const router = require('express').Router();
const thoughtRoute = require('./thoughtRoute');
const userRoute = require('./userRoutes');


router.use('/user', userRoute);
router.use('/thought', thoughtRoute);



module.exports = router;