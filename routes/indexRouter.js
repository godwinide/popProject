const Router = require("express").Router();
const Transaction = require("../models/transactionModel");
const User = require("../models/userModel");
const { ensureAuthenticated } = require('../config/auth');
const moment = require("moment");

Router.get("/", ensureAuthenticated, (req, res) => {
    const user = req.user;
    if (!user.isAdmin) {
        Transaction.find({ ["cashier._id"]: user._id, month: new Date().getMonth() + 1, day: new Date().getDate() }).sort({ date: -1 })
            .then(trans => {
                return res.render("home", { trans, req, user, moment });
            });
    }
    else {
        Transaction.find({ month: new Date().getMonth() + 1, day: new Date().getDate() }).sort({ date: -1 })
            .then(trans => {
                return res.render("home", { trans, req, user, moment });
            });
    }
});



Router.post("/findByDate", (req, res) => {
    const user = req.user;
    const { fromDate, toDate } = req.body;
    if (!user.isAdmin) {
        Transaction.find({ date: { $gte: new Date(`${fromDate}:00`).toISOString(), $lte: new Date(`${toDate}:00`).toISOString() }, ["cashier._id"]: user._id })
            .then(trans => {
                return res.render("home", { trans, req, user, moment, fromDate, toDate });
            })
    }

    else {
        Transaction.find({ date: { $gte: new Date(`${fromDate}:00`).toISOString(), $lte: new Date(`${toDate}:00`).toISOString() } })
            .then(trans => {
                return res.render("home", { trans, req, user, moment, fromDate, toDate });
            })
    }
});



Router.post("/", ensureAuthenticated, (req, res) => {
    const user = req.user

    const { name, clientName, imgURI, date, amount, fee, bankName, refNum, accNum, customerNum, type, status, card } = req.body;

    let errors = [];


    if (!name || !clientName || !amount || !fee || !bankName || !refNum || !accNum || !type || !status || !card) {
        errors.push({ msg: 'Please fill all fields' })
    }

    if (type == "Debit" && parseInt(user.cash) < amount) {
        req.flash(
            'error_msg',
            "Insufficient balance"
        );
        return res.redirect("/");
    }

    if (errors.length > 0) {
        req.flash(
            'error_msg',
            "Please fill all fields"
        );
        return res.redirect("/");
    }

    const newTransaction = new Transaction({
        name,
        clientName,
        amount: amount.replace(/[-,]/g, ""),
        fee: fee.replace(/[-,]/g, ""),
        imgURI,
        bankName,
        refNum: refNum.replace(/[-,]/g, ""),
        accNum: accNum.replace(/[-,]/g, ""),
        customerNum: customerNum.replace(/[-,]/g, ""),
        type,
        status,
        card,
        cashBal: user.cash,
        cashier: user,
        date,
        day: new Date(date).getDate(),
        dateL: new Date(date).toLocaleDateString(),
        month: new Date(date).getMonth() + 1
    })




    newTransaction.save()
        .then(() => {
            // deduct user balance
            if (type == "Debit") {
                const newCash = user.cash - parseInt(amount.replace(/[-,]/g, ""));
                User.updateOne({ username: user.username }, { cash: newCash }, { upsert: true }).then(user => {
                })
            }
            if (type == "Credit") {
                const newCash = parseInt(user.cash) + parseInt(amount.replace(/[-,]/g, ""));
                User.updateOne({ username: user.username }, { cash: newCash }, { upsert: true }).then(user => {
                })
            }

            req.flash(
                'success_msg',
                'Record Scucessfully added'
            );
            res.redirect("/");
        })
        .catch(err => {
            console.log(err);
            req.flash(
                'error_msg',
                'Failed to add record'
            );
            res.redirect("/");
        })

})


module.exports = Router;