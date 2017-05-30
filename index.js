const ExpressServer = require('./server/api/expressServer');
const WebsocketServer = require('./server/websocket/websocketServer');

WebsocketServer.on('started', () => {
    ExpressServer.start();
});

WebsocketServer.start(ExpressServer.server);