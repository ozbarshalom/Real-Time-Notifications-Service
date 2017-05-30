/**
 * Created by ozbar on 5/30/2017.
 */

const WebSocket = require('ws');
const events = require('events');
const config = require('config');

WebSocketServer = new events.EventEmitter();

WebSocketServer.auth = config.get('notifications.auth');
if (WebSocketServer.auth) {
    const authModuleConfig = config.get('notifications.authModule');
    WebSocketServer.authModule = require(__base + authModuleConfig.dir)[authModuleConfig.name]
}

WebSocketServer.start =  (server) => {
    const wss = new WebSocket.Server({server});
    wss.on('connection', function connection(ws, req) {
        if (WebSocketServer.auth) {
            WebSocketServer.authModule.on('authenticated', (username) => {
                ws.username = username;
            });
            WebSocketServer.authModule.on('unauthorized', () => {
                console.log('not authorized teminating ws');
                return ws.terminate();
            });
            // use authentication based notifications - notification is for a specific user or for everyone
            WebSocketServer.authModule.login(ws, req);
        }

        else {
            // user public notifications - everyone who connects to this websocket will receive the notifications
        }
        // You might use location.query.access_token to authenticate or share sessions
        // or req.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

        // ws.on('message', function incoming(message) {
        //     console.log('received: %s', message);
        //     ws.send('something ' + message);
        // });
        //
        // ws.send('connected');
    });
    WebSocketServer.emit('started');
};


module.exports = WebSocketServer;
