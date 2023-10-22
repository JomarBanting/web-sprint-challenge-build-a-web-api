// add middlewares here related to projects
const Project = require("./projects-model");

async function validateId(req, res, next) {
    try {
        const project = await Project.get(req.params.id);
        if (project) {
            req.project = project;
            next();
        } else {
            next({
                status: 404,
                message: "ERROR, ID not found!"
            })
        }
    } catch (err) {
        next(err);
    }
}

function validateBody(req, res, next) {
    const { description, name} = req.body;
    if (!description || !description.trim() || !name || !name.trim() || req.body.completed === undefined) {
        next({
            status: 400,
            message: "missing required [name, description] field"
        })
    } else {
        req.name = name;
        req.description = description;
        if (typeof req.body.completed !== "boolean"){
            req.completed = false;
        }
        req.completed = req.body.completed ? true : false;
        next();
    }
}

module.exports = {
    validateId,
    validateBody,
}