const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leavesSchema = new Schema({
    userid: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    leavetype: {
        type: String,
        required: true
    },
    noofday: {
        type: String,
        required: true
    },
    fromdate: {
        type: Date,
        required: true
    },
    todate: {
        type: Date,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    approvedby: {
        type: String,
    },
    approveddate: {
        type: Date,
    }
});

const LeavesModels = mongoose.model('leaves', leavesSchema);
module.exports = LeavesModels;