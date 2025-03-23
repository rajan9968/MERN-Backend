const router = require('express').Router();
const { assignedwork } = require('../../Controller/Admin/WorkAssignController');

// router.post('/assignedwork', assignedwork);

router.post('/assignedwork', (req, res) => {
    console.log("Route hit!");
    console.log("Body:", req.body);  // Log the request body
    res.status(200).send("Route is working!");
});

module.exports = router;