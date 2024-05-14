// payment.model.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    // Link to the company that this payment belongs to
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    // Additional details
    paymentMethod: {
        type: String,
        required: true
    },
    // Add more fields as needed
    description: {
        type: String
    }
});

module.exports = mongoose.model('Payment', paymentSchema);
