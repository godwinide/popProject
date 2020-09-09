const mongoose = require("mongoose");


const projectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    budget: {
        type: String,
        required: true
    },
    budgetRemain: {
        type: String,
        required: true
    },
    expenses: {
        type: Array,
        default: []
    },
    category: {
        type: Object,
        required: true
    }
});


module.exports = Project = mongoose.model("Project", projectSchema);