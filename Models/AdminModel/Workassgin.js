const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workAssignedSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    assigned_employee: {
        type: String,
        required: true
    },
    assigned_date: {
        type: String,
        required: true
    },
    due_date: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

const WorkAssginModels = mongoose.model('WorkAssigned', workAssignedSchema);
module.exports = WorkAssginModels;

