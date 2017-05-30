/**
 * Created by ozbar on 5/30/2017.
 */
const express = require('express');
const http = require('http');
const routes = require('./expressRoutes');
const events = require('events');
const config = require('config');

const port = config.get('server.port');

const expressApp = express();
expressApp.use('/', routes);

expressServer = new events.EventEmitter();
expressServer.server = http.createServer(expressApp);

expressServer.start = () => {
    expressServer.server.listen(port, function listening() {
        console.log('Listening on %d', expressServer.server.address().port);
    });
};

module.exports = expressServer;
