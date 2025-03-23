const WorkAssignModels = require('../../Models/AdminModel/Workassgin');
const jwt = require('jsonwebtoken');

// INSERT WORK

const assignedwork = async (req, res) => {
    try {
        const { user_id, title, description, assigned_employee, assigned_date, due_date, status } = req.body;

        const newWork = WorkAssignModels({
            user_id,
            title,
            description,
            assigned_employee,
            assigned_date,
            due_date,
            status: status || 'pending'
        });

        await newWork.save();

        return res.status(200).json({ message: 'Work Assigned Successflly', sccess: true, data: newWork });


    }
    catch (error) {
        console.error("Error in empLeave:", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}

// SECLET WORK BY USER

const selectWorkbyUser = async (req, res) => {
    try {
        const auth = req.headers['authorization'];
        if (!auth) {
            return res.status(403).json({ message: "Unauthorized, JWT token is invalid" });
        }

        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        const userId = decoded.userId;

        const workData = await WorkAssignModels.find({ user_id: userId });

        return res.status(200).json({
            message: "Work data retrieved successfully",
            success: true,
            data: workData
        });

    } catch (error) {
        console.error("Error in punchin:", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}

module.exports = {
    assignedwork,
    selectWorkbyUser
}
