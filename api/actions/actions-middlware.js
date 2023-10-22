// add middlewares here related to actions
const Action = require("./actions-model");
const Project = require("../projects/projects-model");

async function validateId(req, res, next) {
    try {
        const action = await Action.get(req.params.id);
        if (action) {
            req.action = action;
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

async function validateBody(req, res, next) {
    const { project_id, description, notes } = req.body;
    const project = await Project.get(project_id);
    if (!project) {
        next({
            status: 404,
            message: "ERROR, ID not found!"
        })
    } else if (!description || !description.trim() || !notes || !notes.trim() || req.body.completed === undefined){
        next({
            status: 400,
            message: "missing required [notes, description] field"
        })
    } else {
        req.project_id = project_id;
        req.description = description;
        req.notes = notes;
        if (typeof req.body.completed !== "boolean"){
            req.completed = false;
        }
        req.completed = req.body.completed ? true : false;
        next();
    }
}


module.exports = {
    validateId,
    validateBody
};
