const mongoose = require('mongoose');

// project schema
const projectSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    status: {type: String, enum: ['Active', 'Completed'], default: 'Active'},
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;