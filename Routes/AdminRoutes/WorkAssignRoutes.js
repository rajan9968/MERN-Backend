const router = require('express').Router();
const { assignedwork } = require('../../Controller/Admin/WorkAssignController');

router.post('/assignedwork', assignedwork);

module.exports = router;