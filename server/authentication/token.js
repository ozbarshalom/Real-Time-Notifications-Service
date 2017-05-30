/**
 * Created by ozbar on 5/30/2017.
 */
const url = require('url');
const events = require('events');


/*
 The service will always send the ws and the req object to the login function
 That is an example for authentication module
 Authentication module should return username / user ID if authenticated

 make sure to use emit to notify if authenticated of not !
 see example below
 */

const TokenAuth = new events.EventEmitter();

TokenAuth.login = (ws, req) => {
    let location = url.parse(req.url, true);
    let token = location.query.token;
    console.log(token);
    if (token === '111') {
        let username = 'admin';
        TokenAuth.emit('authenticated', username);
    }
    else {
        TokenAuth.emit('unauthorized');
    }
};

module.exports.TokenAuth = TokenAuth;
