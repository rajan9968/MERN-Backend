const ensureAuthenticated = require('../Middleware/Auth');

const router = require('express').Router();

router.get('/', ensureAuthenticated, (req, res) => {
    return res.status(200).json({ message: "Welcome to the demo route" });
});

module.exports = router;    