const mongoose = require("mongoose");



const tranSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 255
    },
    clientName: {
        type: String,
        required: true,
        max: 255
    },
    amount: {
        type: String,
        required: true,
        max: 10
    },
    fee: {
        type: String,
        required: true,
        max: 10
    },
    cashBal: {
        type: String,
        required: true,
        max: 10
    },
    accNum: {
        type: String,
        required: true,
        max: 10
    },
    refNum: {
        type: String,
        required: true,
        max: 10
    },
    bankName: {
        type: String,
        required: true,
        max: 100
    },
    customerNum: {
        type: String,
        required: false,
        max: 10
    },
    type: {
        type: String,
        required: true,
        max: 10
    },
    card: {
        type: String,
        required: true,
        max: 10
    },
    status: {
        type: String,
        required: true,
        max: 10
    },
    imgURI: {
        type: String,
        required: false,
    },
    cashier: {
        type: Object,
        required: true,
    },
    date: {
        type: Date,
    },
    day: {
        type: Date
    },
    dateL: {
        type: Date,
    },
    month: {
        type: Date,
    }
});



const Transaction = mongoose.model('Transaction', tranSchema);

module.exports = Transaction;