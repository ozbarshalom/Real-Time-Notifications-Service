/**
 * Created by ozbar on 5/30/2017.
 */
const events = require('events');
const mongoose = require('mongoose');
const config = require('config');

const connectionURL = process.env.MONGODB_URL || config.get('mongodb.url');

mongoose.Promise = global.Promise;

MongoDB = new events.EventEmitter();

MongoDB.connect = () => {
    mongoose.connect(connectionURL);
    MongoDB.connection = mongoose.connection;
    MongoDB.connection.on('error', () => {
        MongoDB.emit('error');
        console.error.bind(console, 'connection error:')
    });
    MongoDB.connection.once('open', () => {
        MongoDB.emit('connected')
    });
};


module.exports = MongoDB;