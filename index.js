const MongoDB = require('./server/mongodb/mongoDB');

global.__base = __dirname + '/';

MongoDB.on('connected', () => {
    const WebsocketServer = require('./server/websocket/websocketServer');
    const ExpressServer = require('./server/api/expressServer');

    WebsocketServer.on('started', () => {
        ExpressServer.start();
    });

    WebsocketServer.start(ExpressServer.server);

});


MongoDB.connect();

