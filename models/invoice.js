// invoice.model.js
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const invoiceSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        default: uuidv4
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    // Link to the company that this invoice belongs to
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    // Additional details
    dueDate: {
        type: Date
    },
    // Add more fields as needed
    description: {
        type: String
    }
});

module.exports = mongoose.model('Invoice', invoiceSchema);
