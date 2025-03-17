const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
    userid: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    // status: {
    //     type: String,
    //     required: true
    // },
    // time: {
    //     type: String,
    //     required: true
    // },
    // location: {
    //     type: String,
    //     required: true
    // },
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    },
    outlatitude: {
        type: String,
    },
    outlongitude: {
        type: String,
    },
    punchin: {
        type: String,
        // required: true
    },
    punchout: {
        type: String,
        // required: true
    }
});

const AttendanceModels = mongoose.model('attendance', attendanceSchema);
module.exports = AttendanceModels;