// document.model.js
const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    // Link to the company that this document belongs to
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    // Additional metadata
    fileType: {
        type: String
    },
    fileSize: {
        type: Number
    },
    // Add more fields as needed
    description: {
        type: String
    }
});

module.exports = mongoose.model('Document', documentSchema);
