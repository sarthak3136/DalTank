const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema
const InvestorPortfolioSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    investmentPreferences: {
        type: String,
        required: true
    },
    industryExpertise: {
        type: String,
        required: true
    },
    trackRecord: {
        type: String,
        required: true
    },
    uploadedFileData:{
            type: String,  // This is in base64 format
            required: true

    }
});

// Compile the model from the schema
const InvestorPortfolio = mongoose.model('InvestorPortfolio', InvestorPortfolioSchema);

module.exports = InvestorPortfolio;
