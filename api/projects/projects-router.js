// Write your "projects" router here!
const express = require("express");

const Project = require("./projects-model");

const router = express.Router();

const { validateId, validateBody } = require("./projects-middleware.js")

// Project GET

router.get("/", (req, res, next) => {
    Project.get()
    .then(projects => {
        res.status(200).json(projects)
    }).catch(err => {
        next(err);
    })
})

router.get("/:id", validateId, (req, res, next) => {
    Project.get(req.params.id)
    .then(project => {
        res.status(200).json(project);
    }).catch(err => {
        next(err);
    })
})

// Project POST
router.post("/", validateBody, (req, res, next) => {
    Project.insert({
        name: req.name,
        description: req.description,
        completed: req.completed
    })
    .then(project => {
        console.log(req.completed)
        res.status(201).json(project)
    }).catch(err => {
        next(err);
    })
})

// Project PUT
router.put("/:id", validateId, validateBody, (req, res, next) => {
    Project.update(req.params.id, {
        name: req.name,
        description: req.description,
        completed: req.completed
    }).then(project => {
        res.status(200).json(project);
    }).catch(err => {
        next(err);
    })
})

// Project DELETE
router.delete("/:id", validateId, (req, res, next) => {
    Project.remove(req.params.id)
    .then(project => {
        console.log(project)
        res.status(202).json(project)
    }).catch(err => {
        next(err);
    })
})





//ERROR HANDLER
router.use((error, req, res, next) => { //eslint-disable-line
    res.status(error.status || 500).json({
        message: error.message,
        customMessage: "Something bad happened inside the projects-router"
    })
})

module.exports = router;