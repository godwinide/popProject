const mongoose = require("mongoose");


const BetSchema = new mongoose.Schema({
    players: {
        type: String,
        required: true
    },
    potWin: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true
    },
    stake: {
        type: String,
        required: true
    }
});


module.exports = Bet = mongoose.model("Bet", BetSchema);