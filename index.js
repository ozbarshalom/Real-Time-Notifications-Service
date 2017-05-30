const express = require('express');
const http = require('http');
const url = require('url');
const WebSocket = require('ws');
var routes = require('./server/routes');

const app = express();

app.use('/', routes);


const server = http.createServer(app);
const wss = new WebSocket.Server({server});

const heartbeat_interval = setInterval(function ping() {
    wss.clients.forEach(function each(ws) {
        if (ws.isAlive === false) return ws.terminate();

        ws.isAlive = false;
        ws.ping('', false, true);
    });
}, 30000);

const send_notification_interval = setInterval(
    function lookForConnectionByUsername() {
        wss.clients.forEach(function each(ws) {
            if (ws.username === 'oz') {
                var message = {title: 'new user', content: 'Welcome new user!'};
                ws.send(JSON.stringify(message));
            }
        });
    }, 5000);

function heartbeat() {
    this.isAlive = true;
}


wss.on('connection', function connection(ws, req) {
    // check connection heartbeat - in case of no heartbeat terminate the connection
    // to avoid to many unused connections
    ws.isAlive = true;
    ws.on('pong', heartbeat);

    const location = url.parse(req.url, true);
    // You might use location.query.access_token to authenticate or share sessions
    // or req.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

    ws.username = location.query.username;
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        ws.send('thank you for ' + message);
    });

    ws.send('something');
});

server.listen(80, function listening() {
    console.log('Listening on %d', server.address().port);
});