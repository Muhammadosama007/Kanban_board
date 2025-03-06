const { Task } = require('../models/taskModel');
const { log } = require('../models/logModel')

const create = async (req, res) => {
    try {
        const { name, description, stat, userId } = req.body;
        if (!name || !description || !stat) {
            res.status(400).json({
                message: "name description status and userId required!!"
            })
        }
        const newTask = new Task({ name, description, stat, userId });
        await newTask.save();


        const logEntry = new log({
            taskId: newTask._id,
            createdBy: userId,
            newStatus: stat,
            action: "Created"
        });
        await logEntry.save();

        res.status(201).json({ message: "Task created successfully", task: newTask, log: logEntry });
    } catch (error) {
        res.status(500).json({ message: "Error creating task", error });
    }

};
const getTask = async (req, res) => {
    try {
        //const userId = req.user._id;

        const tasks = await Task.find().populate('userId');

        if (!tasks.length) {
            return res.status(404).json({ message: "No tasks found!" });
        }
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving tasks", error: error.message });
    }
};

const updateTask = async (req, res) => {
    const bTask = await Task.findById(req.params.id);
    const statusBefore = bTask.stat;
    //console.log("status", statusBefore);

    //console.log("userId: ",req.user._id);
    // if (BTask.userId.toString() !== req.user._id.toString()) {
    //     return res.status(403).json({ message: "You are not authorized to update this task" });
    // }

    const updateTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    const statusAfter = updateTask.stat;
    //console.log("status", statusAfter);

    const activityLog = new log({
        taskId: updateTask._id,
        changedBy: req.body.userId,
        previousStatus: statusBefore,
        newStatus: statusAfter,
        action: "Updated"
    })
    if (!updateTask) {
        res.status(404).send({
            message: "cant Update Task!!!"
        })
    }
    else {
        updateTask.save();
        activityLog.save();
        res.status(201).json({ message: "Task Updated successfully", task: updateTask, log: activityLog });
        // res.send(updateTask);

    }
}

const delTask = async (req, res) => {
    const BTask = await Task.findById(req.params.id);
    const statusBefore = BTask.stat;
    //console.log("status", statusBefore);
    // if (BTask.userId.toString() !== req.user._id.toString()) {
    //     return res.status(403).json({ message: "You are not authorized to delete this task" });
    // }
    const userId = BTask.userId;
    //console.log("userId: ", userId);
    const delTask = await Task.findByIdAndDelete(req.params.id);
    const logEntry = new log({
        taskId: delTask._id,
        changedBy: userId,
        previousStatus: statusBefore,
        newStatus: null,
        action: "Deleted"
    });
    if (!delTask) {
        res.status(404).send({
            message: "cant delete Task!!!"
        })
    }
    else {
        await logEntry.save();
        res.status(201).json({ message: "Task deleted successfully", task: delTask, log: logEntry });
    }
}

module.exports = {
    create,
    getTask,
    updateTask,
    delTask
}