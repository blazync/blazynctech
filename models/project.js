// project.model.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date
    },
    assignedPerson: {
        type: String
    },
    // Link to the company that this project belongs to
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    // Additional fields if needed
    status: {
        type: String,
        enum: ['ongoing', 'completed', 'paused', 'cancelled']
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high']
    },
    // Add more fields as needed
    description: {
        type: String
    }
});

module.exports = mongoose.model('Project', projectSchema);
