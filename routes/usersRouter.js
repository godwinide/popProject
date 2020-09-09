const Router = require("express").Router();
const Users = require("../models/userModel");
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { ensureAuthenticated, ensureIsAdmin } = require("../config/auth");

Router.get("/:id", ensureAuthenticated, ensureIsAdmin, (req, res) => {
    const userId = req.params.id;
    Users.find()
        .then(users => {
            user = users.filter(u => u.id == userId)[0]
            res.render("userDetails", { req, user });
        })
});

Router.post("/:id", ensureAuthenticated, ensureIsAdmin, (req, res) => {
    const userId = req.params.id;
    let { cash, password } = req.body;

    if (cash) {
        Users.updateOne(
            { _id: userId },
            { cash: cash.replace(/[-,]/g, "") },
            { upsert: true }
        ).then(() => {
            req.flash(
                "success_msg",
                "User cash updated"
            );
        });
    }

    if (password) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) throw err;
                password = hash;
                Users.updateOne(
                    { _id: userId },
                    { password },
                    { upsert: true }
                ).then(() => {
                    req.flash(
                        'success_msg',
                        'User password Updated'
                    );
                });
            });
        });
    }

    return res.redirect("/admin")
});

Router.post("/delete/:id", ensureAuthenticated, ensureIsAdmin, (req, res) => {
    const userId = req.params.id;

    Users.deleteOne({ _id: userId })
        .then(() => {
            req.flash(
                'success_msg',
                'User deleted'
            );
            return res.redirect("/admin");
        })
});

Router.post("/disable/:id", ensureAuthenticated, ensureIsAdmin, (req, res) => {
    const userId = req.params.id;

    Users.updateOne(
        { _id: userId },
        { isActive: false },
        { upsert: true }
    ).then(() => {
        req.flash(
            'success_msg',
            'User disabled'
        );
        return res.redirect("/admin")
    });
});


Router.post("/enable/:id", ensureAuthenticated, ensureIsAdmin, (req, res) => {
    const userId = req.params.id;

    Users.updateOne(
        { _id: userId },
        { isActive: true },
        { upsert: true }
    ).then(() => {
        req.flash(
            'success_msg',
            'User enaled'
        );
        return res.redirect("/admin")
    });
});



module.exports = Router;