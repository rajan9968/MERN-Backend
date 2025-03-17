const jwt = require('jsonwebtoken');
const LeavesModels = require('../Models/Leaves');
const moment = require('moment');

// Apply Leave API

const applyLeave = async (req, res) => {
    try {
        const auth = req.headers['authorization'];
        if (!auth) {
            return res.status(403).json({ message: "Unauthorized, JWT token is invalid" });
        }
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        const userId = decoded.userId;
        const username = decoded.name;


        let { reason, type, fromdate, todate, leavetype, noofday } = req.body;
        if (!reason || !type || !fromdate || !todate) {
            return res.status(400).json({ message: "Please fill all the fields", success: false });
        }
        // Convert input date to standard format (YYYY-MM-DD HH:mm:ss)
        fromdate = moment(fromdate, ["DD/MM/YYYY", "MM-DD-YYYY", "YYYY/MM/DD", "YYYY-MM-DD"]).format("YYYY-MM-DD HH:mm:ss");
        todate = moment(todate, ["DD/MM/YYYY", "MM-DD-YYYY", "YYYY/MM/DD", "YYYY-MM-DD"]).format("YYYY-MM-DD HH:mm:ss");

        const leaveData = new LeavesModels({
            userid: userId,
            username: username,
            type: type,
            reason: reason,
            fromdate: fromdate,
            todate: todate,
            leavetype: leavetype,
            noofday: noofday,
            status: 1
        });

        await leaveData.save();

        return res.status(200).json({
            message: "Leave applied successfully",
            success: true
        });

    }
    catch (error) {
        console.error("Error in applyLeave:", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }

}

// User Leave Select API


const selectLeave = async (req, res) => {
    try {
        const auth = req.headers['authorization'];
        if (!auth) {
            return res.status(403).json({ message: "Unauthorized, JWT token is required" });
        }

        try {
            const decoded = jwt.verify(auth, process.env.JWT_SECRET);
            const userId = decoded.userId;
            const username = decoded.name;

            const leaveData = await LeavesModels.find({ userid: userId, status: 1 });

            return res.status(200).json({
                message: "Attendance data retrieved successfully",
                success: true,
                data: leaveData
            });

        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: "JWT token has expired. Please log in again.", success: false });
            } else if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ message: "Invalid JWT token", success: false });
            }
            throw error;
        }

    } catch (error) {
        console.error("Error in selectLeave:", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};




module.exports = {
    applyLeave,
    selectLeave
};
