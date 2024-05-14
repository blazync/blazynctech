// company.model.js
const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subscriptionType: {
        type: String,
    },
    // Other fields for company onboarding
    address: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    // Subscription details
    subscriptionStartDate: {
        type: Date
    },
    subscriptionEndDate: {
        type: Date
    },
    
    timestamps: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Company', companySchema);
