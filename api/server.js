// Server
const express = require("express");
const server = express();
server.use(express.json());

// Router
const accountsRouter = require('./accounts/accounts-router');
server.use('/api/accounts', accountsRouter);

// Export
module.exports = server;
