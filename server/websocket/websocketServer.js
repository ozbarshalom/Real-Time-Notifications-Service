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
                return ws.terminate();
            });
            // use authentication based notifications - notification is for a specific user or for everyone
            WebSocketServer.authModule.login(ws, req);
        }
    });
    WebSocketServer.emit('started');
};

module.exports = WebSocketServer;
