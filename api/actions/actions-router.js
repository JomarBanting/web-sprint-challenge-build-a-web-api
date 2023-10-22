// Write your "actions" router here!
const express = require("express");

const Action = require("./actions-model");

const router = express.Router();

router.use("/", (req, res) => {
    Action.get()
    .then(actions => {
        res.status(200).json(actions)
    }).catch(err => {
        res.status(500).json({
            message: "ERROR ACTIONS"
        })
    })
})


module.exports = router;