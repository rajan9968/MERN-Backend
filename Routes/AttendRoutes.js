const { punchin, punchout, selectUserData, selectUserAllData, selectDataByDateRange, selectMonthData } = require('../Controller/AttendController');
const router = require('express').Router();

router.post('/punchin', punchin);
router.post('/punchout', punchout);
router.get('/selectuserdata', selectUserData);
router.get('/selectuseralldata', selectUserAllData);
router.get('/selectdatabydate', selectDataByDateRange);
router.post('/selectmonthdate', selectMonthData);


module.exports = router;  