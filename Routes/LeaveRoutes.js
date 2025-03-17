const { applyLeave } = require('../Controller/LeaveController');
const { selectLeave } = require('../Controller/LeaveController');
const router = require('express').Router();


router.post('/applyleave', applyLeave);
router.get('/selectleave', selectLeave);

module.exports = router;