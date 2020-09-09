const Router = require("express").Router();
const { ensureAuthenticated, ensureIsAdmin } = require('../../config/auth');

const Project = require("../../models/projectModel");


Router.get("/", ensureAuthenticated, ensureIsAdmin, (req, res) => {
    return res.render("project/create", { req });
});


Router.post("/", ensureAuthenticated, ensureIsAdmin, (req, res) => {
    const { name, budget, category } = req.body;

    if (!name || !budget || !category) {
        req.flash(
            'error_msg',
            "Please fill all fields"
        );
        return res.redirect("/project/create");
    }

    console.log(category)
    const newProject = new Project({
        name,
        budget: budget.replace(/[-,a-zA-Z]/g, ""),
        category: category.split(" "),
        budgetRemain: budget.replace(/[-,a-zA-Z]/g, ""),
    });

    newProject.save()
        .then((project) => {
            return res.redirect("/project/detail/" + project._id);
        })
})

module.exports = Router;