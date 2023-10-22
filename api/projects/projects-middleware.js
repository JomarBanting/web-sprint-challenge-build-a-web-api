// add middlewares here related to projects
const Project = require("./projects-model");

async  function validateId(req, res, next) {
    try {
        const project = await Project.get(req.params.id);
        if (project){
            req.project = project;
            next();
        } else {
            next({
                status: 404,
                message: "ERROR, ID not found!"
            })
        }
    } catch(err){
        next(err);
    }
}

function validateBody(req, res, next) {
    const {description, name, completed} = req.body;

    if (!description || !description.trim() || !name || !name.trim()){
        next({
            status: 400,
            message: "missing required [name, body] field"
        })
    } else {
        req.name = name;
        req.description = description;
        if (completed){
            req.completed = completed;
        }
        next();
    }
}

module.exports = {
    validateId,
    validateBody,
}