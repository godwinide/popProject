const Router = require("express").Router();
const Transaction = require("../models/transactionModel");
const { ensureAuthenticated, ensureIsAdmin } = require('../config/auth');

Router.get("/:username?", ensureAuthenticated, ensureIsAdmin, (req, res) => {
    if (!req.params.username) {

        transData = {
            debitsToday: 0,
            profitsToday: 0,
            creditToday: 0,
            numTransToday: 0,
            numDebitsToday: 0,
            numCreditToday: 0,
            transToday: 0,
            numTransToday: 0,

            debitsThisMonth: 0,
            profitsThisMonth: 0,
            creditThisMonth: 0,
            numTransThisMonth: 0,
            numDebitsThisMonth: 0,
            numCreditThisMonth: 0,
            transThisMonth: 0,
            numTransThisMonth: 0,
        }


        Transaction.find({ type: "Debit", dateL: new Date().toLocaleDateString() }).then(trans => {
            trans.forEach(t => {
                // add to debits today
                transData.debitsToday = parseInt(transData.debitsToday) + parseInt(t.amount);
                transData.numDebitsToday += 1;
            })
        }).then(() => {

            Transaction.find({ type: "Credit", dateL: new Date().toLocaleDateString() })
                .then(trans => {
                    trans.forEach(tran => {
                        transData.creditToday = parseInt(transData.creditToday) + parseInt(tran.amount);
                        transData.numCreditToday += 1;
                        transData.profitsToday = parseInt(transData.profitsToday) + parseInt(tran.fee);
                    })
                })
        }).then(() => {
            Transaction.find({ card: "Transfer", dateL: new Date().toLocaleDateString() })
                .then(trans => {
                    trans.forEach(tran => {
                        transData.transToday = parseInt(transData.transToday) + parseInt(tran.amount);
                        transData.numTransToday += 1;
                    })
                })
        })
            // this month
            .then(() => {
                Transaction.find({ type: "Debit", month: new Date().getMonth() + 1 }).then(trans => {
                    trans.forEach(t => {
                        // add to debits this month
                        transData.debitsThisMonth = parseInt(transData.debitsThisMonth) + parseInt(t.amount);
                        transData.numDebitsThisMonth += 1;
                    })
                })
            }).then(() => {
                // credits this month
                Transaction.find({ type: "Credit", month: new Date().getMonth() + 1 })
                    .then(trans => {
                        trans.forEach(tran => {
                            transData.creditThisMonth = parseInt(transData.creditThisMonth) + parseInt(tran.amount);
                            transData.numCreditThisMonth += 1;
                            transData.profitsThisMonth = parseInt(transData.profitsThisMonth) + parseInt(tran.fee);
                        })
                    }).then(() => {
                        Transaction.find({ card: "Transfer", month: new Date().getMonth() + 1 })
                            .then(trans => {
                                trans.forEach(tran => {
                                    transData.transThisMonth = parseInt(transData.transThisMonth) + parseInt(tran.amount);
                                    transData.numTransThisMonth += 1;
                                })
                            }).then(() => {
                                return res.render("dashboard", { req, transData });
                            })
                    })
            })
    }
});


module.exports = Router;