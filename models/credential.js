// clientCredential.model.js
const mongoose = require('mongoose');

const clientCredentialSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // Link to the company that these credentials belong to
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    // Additional details if needed
    clientName: {
        type: String
    },
});

module.exports = mongoose.model('credential', clientCredentialSchema);
