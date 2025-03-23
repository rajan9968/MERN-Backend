const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRoutes');
const AttendRouter = require('./Routes/AttendRoutes');
const LeaveRouter = require('./Routes/LeaveRoutes');
// Admin 
const EmpLeaveRouter = require('./Routes/AdminRoutes/EmpLeaveRoutes');
const WorkAssignRouter = require('./Routes/AdminRoutes/WorkAssignRoutes');

require('dotenv').config();
require('./Models/db');

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

app.use('/auth', AuthRouter);
app.use('/attend', AttendRouter);
app.use('/leave', LeaveRouter);
// Admin 
app.use('/admin', EmpLeaveRouter);
app.use('/admin', WorkAssignRouter);




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
