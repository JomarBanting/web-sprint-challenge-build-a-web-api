// Write your "actions" router here!
const express = require("express");

const Action = require("./actions-model");

const router = express.Router();

const { validateId, validateBody } = require("./actions-middlware");


// Actions GET
router.get("/", (req, res, next) => {
    Action.get()
        .then(actions => {
            res.status(200).json(actions)
        }).catch(err => {
            next(err);
        })
})

router.get("/:id", validateId, (req, res, next) => {
    Action.get(req.params.id)
        .then(actions => {
            res.status(200).json(actions)
        }).catch(err => {
            next(err)
        })
})

// Actions Post
router.post("/", validateBody, (req, res, next) => {
    Action.insert({
        project_id: req.project_id,
        description: req.description,
        notes: req.notes,
        completed: req.completed
    })
        .then(action => {
            res.status(201).json(action);
        }).catch(err => {
            next(err);
        })
})

//Actions Put
router.put("/:id", validateId, validateBody, (req, res, next) => {
    Action.update(req.project_id, {
        project_id: req.project_id,
        description: req.description,
        notes: req.notes,
        completed: req.completed
    }).then(action => {
        res.status(200).json(action)
    }).catch(err => {
        next(err);
    })
})

//Action DELETE
router.delete("/:id", validateId, (req, res, next) => {
    Action.remove(req.params.id)
    .then(action => {
        res.status(200).json(action)
    }).catch(err => {
        next(err);
    })
})



// ERROR HANDLER
router.use((error, req, res, next) => { //eslint-disable-line
    res.status(error.status || 500).json({
        message: error.message,
        customMessage: "Something bad happened inside the actions-router"
    })
})


module.exports = router;