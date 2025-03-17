const router = require('express').Router();
const { empLeave } = require('../../Controller/Admin/EmpleaveController');

router.get('/empleave', empLeave);

module.exports = router;
