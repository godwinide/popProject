const Router = require("express").Router();
const { ensureAuthenticated, ensureIsAdmin } = require("../config/auth");
const Transaction = require("../models/transactionModel");
const moment = require("moment");

// utils
const padRefNum = require("../utils/padRefNum");
const padAccountNum = require("../utils/paddAccountNum");

Router.get("/:id", ensureAuthenticated, (req, res) => {
    const id = req.params.id;
    Transaction.findById(id, (err, ticket) => {
        return res.render("ticketDetails", { req, ticket, moment, padAccountNum, padRefNum });
    })
});

Router.post("/:id", ensureAuthenticated, ensureIsAdmin, (req, res) => {
    const id = req.params.id;
    Transaction.deleteOne({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            req.flash(
                'error_msg',
                'Record failed to deleted'
            );
            return res.redirect("/")
        }
        req.flash(
            'success_msg',
            'Record deleted successfully'
        );
        return res.redirect("/");
    })
})

module.exports = Router;