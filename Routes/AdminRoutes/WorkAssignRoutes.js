const express = require('express');
const { assignedwork } = require('../../Controller/Admin/WorkAssignController');

router.post('/work', assignedwork);

module.exports = router