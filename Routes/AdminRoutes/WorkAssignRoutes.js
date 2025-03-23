const router = require('express').Router();
const { assignedwork } = require('../../Controller/Admin/WorkAssignController');

router.post('/work', assignedwork);

module.exports = router