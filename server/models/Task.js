const mongoose = require('mongoose');

//task schema
const taskSchema = new mongoose.Schema({
    title: {type: String, required: true},
    assignedTo: {type: String, required: true},
    dueDate: {type: Date, required: true},
    status: {type: String, enum: ['To Do', 'In Progress', 'Completed'], default: 'To Do'},
    projectId: {type: mongoose.Schema.Types.ObjectId, ref: 'Project'},  // Reference to Project table in database
    taskId: {type: mongoose.Schema.Types.ObjectId, ref: 'Task'}

    // Reference to the User who created the task
    // user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;