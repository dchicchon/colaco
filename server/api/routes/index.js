const router = require('express').Router();
const apiRoutes = require('./apiRoutes');
const adminRoutes = require('./adminRoutes');

router.use('/api', apiRoutes);
router.use('/admin', adminRoutes);

module.exports = router;
