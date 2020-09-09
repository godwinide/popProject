const Router = require("express").Router();
const { ensureAuthenticated, ensureIsAdmin } = require('../../config/auth');
const Project = require("../../models/projectModel");


Router.get("/", ensureAuthenticated, ensureIsAdmin, (req, res) => {
    Project.find()
        .then(project => {
            return res.render("project/index", { project, req })
        })
});

module.exports = Router;