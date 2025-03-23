const WorkAssignModels = require('../../Models/AdminModel/Workassgin');


// INSERT WORK

const assignedwork = async (req, res) => {
    try {
        const { title, description, assigned_employee, due_date, status } = req.body;

        const newWork = WorkAssignModels({
            title,
            description,
            assigned_employee,
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

module.exports = {
    assignedwork
}
