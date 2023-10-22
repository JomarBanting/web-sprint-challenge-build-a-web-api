const express = require('express');
const server = express();
const actionRouter = require("./actions/actions-router");
const projectRouter = require("./projects/projects-router");

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.use(express.json());
server.use("/api/actions", actionRouter);
server.use("/api/projects", projectRouter);

server.use("*", (req, res) => {
    res.status(404).json({
      message: `${req.method} ${req.baseUrl} not found!`
    })
  })

module.exports = server;