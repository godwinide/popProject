const mongoose = require("mongoose");


const CompanySchema = new mongoose.Schema({
    name: {
        type: String,
        max: 70,
        required: true,
        default: "First Monie"
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

const Company = mongoose.model("Company", CompanySchema);

module.exports = Company;