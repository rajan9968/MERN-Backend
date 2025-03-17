const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeLeaveSchema = new Schema({
    annualLeave: {
        type: Number,
        required: true
    },
    medicalleave: {
        type: Number,
        required: true
    },
    casualleave: {
        type: Number,
        required: true
    },
    otherleave: {
        type: Number,
        required: true
    }
});

const EmpLeaveModels = mongoose.model('employeeLeave', employeeLeaveSchema);
module.exports = EmpLeaveModels;