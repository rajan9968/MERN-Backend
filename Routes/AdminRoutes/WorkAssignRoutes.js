const router = require('express').Router();
const { assignedwork } = require('../../Controller/Admin/WorkAssignController');

router.get('/work', assignedwork);

module.exports = router;