const MongoDB = require('./server/mongodb/mongoDB');
const ExpressServer = require('./server/api/expressServer');
const WebsocketServer = require('./server/websocket/websocketServer');

MongoDB.on('connected', () => {
    WebsocketServer.start(ExpressServer.server);
});

WebsocketServer.on('started', () => {
    ExpressServer.start();
});

MongoDB.connect();

