const router = require('express').Router();
const { assignedwork, selectWorkbyUser } = require('../../Controller/Admin/WorkAssignController');

router.post('/assignedwork', assignedwork);
router.get('/selectassignedwork', selectWorkbyUser);

module.exports = router;