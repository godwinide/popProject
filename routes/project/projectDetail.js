const Router = require("express").Router();
const { ensureAuthenticated, ensureIsAdmin } = require('../../config/auth');
const Project = require("../../models/projectModel");
const uuid = require("uuid")

Router.get("/:id", ensureAuthenticated, ensureIsAdmin, (req, res) => {
    Project.findOne({ _id: req.params.id })
        .then(project => {
            res.render("project/details", { project, req })
        })
});

Router.post("/d", ensureAuthenticated, ensureIsAdmin, (req, res) => {
    const { id } = req.body
    Project.deleteOne({ _id: id })
        .then(() => {
            res.redirect("/project")
        })
});


// add expenses
Router.post("/expenses/", ensureAuthenticated, ensureIsAdmin, (req, res) => {
    const { id, newExpense, amount, category } = req.body;
    let oldProject = {
        expenses: [],
        budgetRemain: 0
    }

    Project.findOne({ _id: id })
        .then(project => {
            oldProject.expenses = [...project.expenses];
            oldProject.budgetRemain = parseInt(project.budgetRemain) - parseInt(amount);
        }).then(() => {
            Project.updateOne({ _id: id }, {
                expenses: [...oldProject.expenses, { expense: newExpense, amount, category, id: uuid.v4() }],
                budgetRemain: oldProject.budgetRemain
            }, { upsert: true })
                .then(() => {
                    Project.findOne({ _id: id })
                        .then(project => {
                            res.redirect("/project/detail/" + project.id)
                        })
                })
        })
});


// remove expenses
Router.post("/expenses/d", ensureAuthenticated, ensureIsAdmin, (req, res) => {
    const { e_id, id, amt } = req.body;
    let oldProject = {
        expenses: [],
        budgetRemain: 0
    }

    Project.findOne({ _id: id })
        .then(project => {
            oldProject.expenses = project.expenses.filter(e => e.id != e_id)
            oldProject.budgetRemain = parseInt(project.budgetRemain) + parseInt(amt);
        }).then(() => {
            Project.updateOne({ _id: id }, {
                expenses: [...oldProject.expenses],
                budgetRemain: oldProject.budgetRemain
            }, { upsert: true })
                .then(() => {
                    Project.findOne({ _id: id })
                        .then(project => {
                            res.redirect("/project/detail/" + project.id)
                        })
                })
        })
});

module.exports = Router;