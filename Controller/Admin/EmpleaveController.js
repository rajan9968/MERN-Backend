const EmpLeaveModels = require('../../Models/AdminModel/EmployeeLeave');

// Employee Select Leave API

const empLeave = async (req, res) => {
    try {
        const empLeaveData = await EmpLeaveModels.find();
        return res.status(200).json({
            message: "Employee Leave Data",
            success: true,
            data: empLeaveData
        });
    }
    catch (error) {
        console.error("Error in empLeave:", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}

module.exports = {
    empLeave
}
