const router = require('express').Router();

const apiRoutes = require('./api/index.js');

router.use('/api', apiRoutes);

router.use((req, res) => {
    return res.status(404).send('404 Route not found!');
});

module.exports = router;
