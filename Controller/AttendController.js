const AttendModels = require('../Models/Attendance');
const LeavesModels = require('../Models/Leaves');
const jwt = require('jsonwebtoken');
const express = require('express');
const { compareSync } = require('bcrypt');

// Punch In API
const punchin = async (req, res) => {
    try {
        const auth = req.headers['authorization'];
        if (!auth) {
            return res.status(403).json({ message: "Unauthorized, JWT token is invalid" });
        }
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        const userId = decoded.userId;
        const username = decoded.name;

        const attendModel = new AttendModels({
            userid: userId,
            username: username,
            date: new Date().toISOString().split('T')[0], // Store the current date
            punchin: new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" }),
            punchout: null,
            latitude: req.body.latitude,
            longitude: req.body.longitude
        });

        await attendModel.save();
        return res.status(201).json({ message: "Punch-in recorded successfully", success: true });

    } catch (error) {
        console.error("Error in punchin:", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};
// Punch Out API
const punchout = async (req, res) => {
    try {
        const istDate = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
        const selectedDate = new Date(istDate).toISOString().split('T')[0];
        const auth = req.headers['authorization'];
        if (!auth) {
            return res.status(403).json({ message: "Unauthorized, JWT token is invalid" });
        }

        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        const userId = decoded.userId;
        const attendData = await AttendModels.findOneAndUpdate(
            { userid: userId, date: selectedDate }, // Find the document by userid
            {
                punchout: new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" }),
                outlatitude: req.body.outlatitude,
                outlongitude: req.body.outlongitude
            },
            { new: true } // Return the updated document
        );

        return res.status(200).json({
            message: "Attendance data updated successfully",
            success: true,
            data: attendData
        });

    } catch (error) {
        console.error("Error in punchin:", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}
// Selct User By ID 
const selectUserData = async (req, res) => {
    try {
        const istDate = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
        const selectedDate = new Date(istDate).toISOString().split('T')[0];

        const auth = req.headers['authorization'];
        if (!auth) {
            return res.status(403).json({ message: "Unauthorized, JWT token is invalid" });
        }
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        const userId = decoded.userId;

        const attendData = await AttendModels.find({ userid: userId, date: selectedDate });

        return res.status(200).json({
            message: "Attendance data retrieved successfully",
            success: true,
            data: attendData
        });

    } catch (error) {
        console.error("Error in punchin:", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};
// selct user all 
const selectUserAllData = async (req, res) => {
    try {
        const istDate = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
        const currentDate = new Date(istDate);
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // Get current month (1-based)

        const auth = req.headers['authorization'];
        if (!auth) {
            return res.status(403).json({ message: "Unauthorized, JWT token is invalid" });
        }
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        const userId = decoded.userId;

        // Get first and last date of the current month
        const firstDayOfMonth = new Date(year, month - 1, 1).toISOString().split('T')[0]; // Start of month
        const lastDayOfMonth = new Date(year, month, 0).toISOString().split('T')[0]; // End of month

        // Fetch attendance data for the current month
        const attendData = await AttendModels.find({
            userid: userId,
            date: { $gte: firstDayOfMonth, $lte: lastDayOfMonth }
        });

        // Fetch leave data for the current month
        const leaveData = await LeavesModels.find({
            userid: userId,
            // date: { $gte: firstDayOfMonth, $lte: lastDayOfMonth }
        });

        return res.status(200).json({
            message: "Attendance and leave data retrieved successfully",
            success: true,
            data: attendData,
            leaves: leaveData
        });

    } catch (error) {
        console.error("Error in selectUserAllData:", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

// selectDataByDateRange 
const selectDataByDateRange = async (req, res) => {
    try {
        const auth = req.headers['authorization'];
        if (!auth) {
            return res.status(403).json({ message: "Unauthorized, JWT token is invalid" });
        }
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        const userId = decoded.userId;

        let { startDate, endDate } = req.body;

        if (!startDate || !endDate) {
            return res.status(400).json({ message: "startDate and endDate are required", success: false });
        }

        const convertToISO = (dateStr) => {
            const parts = dateStr.split('/');
            if (parts.length !== 3) {
                throw new Error("Invalid date format. Expected DD/MM/YYYY");
            }
            const [day, month, year] = parts;
            const isoDate = new Date(`${year}-${month}-${day}T00:00:00.000Z`);
            if (isNaN(isoDate)) {
                throw new Error("Invalid date format. Use DD/MM/YYYY");
            }
            return isoDate;
        };

        try {
            const startISO = convertToISO(startDate);
            const endISO = convertToISO(endDate);
            endISO.setHours(23, 59, 59, 999); // Ensure the full day's range

            // Fetch attendance data in the given date range
            const attendData = await AttendModels.find({
                userid: userId,
                date: {  // Ensure this matches your DB field name
                    $gte: startISO,
                    $lte: endISO
                }
            });

            return res.status(200).json({
                message: "Attendance data retrieved successfully",
                success: true,
                data: attendData
            });

        } catch (dateError) {
            return res.status(400).json({ message: dateError.message, success: false });
        }

    } catch (error) {
        console.error("Error in fetching attendance data:", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};
// SelectMonthData

const selectMonthData = async (req, res) => {
    try {

        const auth = req.headers['authorization'];
        if (!auth) {
            return res.status(403).json({ message: "Unauthorized, JWT token is invalid" });
        }
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        const userId = decoded.userId;
        const { month, year } = req.body;

        if (!month || !year) {
            return res.status(400).json({
                message: "Month and year are required"
            });
        }

        const currentYear = new Date().getFullYear();
        const selectedYear = year || currentYear;

        let startDate, endDate;

        if (month === "all") {
            startDate = new Date(selectedYear, 0, 1);
            endDate = new Date(selectedYear, 11, 31, 23, 59, 59, 999);
        } else {
            startDate = new Date(selectedYear, month - 1, 1);
            endDate = new Date(selectedYear, month, 0, 23, 59, 59, 999);
        }

        const leaveData = await LeavesModels.find({
            userid: userId,
        })

        const attendData = await AttendModels.find({
            userid: userId,
            date: {
                $gte: startDate,
                $lte: endDate
            }
        });

        if (!attendData.length) {
            return res.status(404).json({
                message: "No attendance data found for the given month",
                success: false
            });
        }

        return res.status(200).json({
            message: "Attendance data retrieved successfully",
            success: true,
            data: attendData,
            leaves: leaveData
        });

    }
    catch (error) {
        console.error("Error in fetching attendance data:", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}





module.exports = {
    punchin,
    punchout,
    selectUserData,
    selectUserAllData,
    selectDataByDateRange,
    selectMonthData
};
