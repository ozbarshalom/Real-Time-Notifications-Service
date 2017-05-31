/**
 * Created by ozbar on 5/30/2017.
 */

const WebSocket = require('ws');
const events = require('events');
const config = require('config');

WebSocketServer = new events.EventEmitter();

WebSocketServer.auth = process.env.USE_AUTH || config.get('notifications.auth');

if (WebSocketServer.auth) {
    if (process.env.AUTH_MODULE_NAME && process.env.AUTH_MODULE_PATH) {
        WebSocketServer.authModule = require(__base + process.env.AUTH_MODULE_PATH)[process.env.AUTH_MODULE_NAME]
    }
    else {
        const authModuleConfig = config.get('notifications.authModule');
        WebSocketServer.authModule = require(__base + authModuleConfig.path)[authModuleConfig.name]
    }
}

WebSocketServer.start =  (server) => {
    WebSocketServer.wss = new WebSocket.Server({server});
    WebSocketServer.wss.on('connection', function connection(ws, req) {
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

WebSocketServer.broadcastNotification = (notificationData, username) => {
    if (username == undefined) {
          // broadcast everyone !
          // Broadcast to all.
        WebSocketServer.wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(notificationData));
            }
        });
    }
    else {
        WebSocketServer.wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN && client.username === username) {
                client.send(JSON.stringify(notificationData));
            }
        });
    }
};

module.exports = WebSocketServer;
