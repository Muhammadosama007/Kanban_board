const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'task',
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    changedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    previousStatus: {
        type: String,
        required: false
    },
    newStatus: {
        type: String,
        required: false
    },
    action: {
         type: String, 
         enum: ["Created", "Updated", "Deleted"], 
         required: true
        },
    time: {
        type: Date,
        default: Date.now
    }
})

exports.log = mongoose.model('log', logSchema);