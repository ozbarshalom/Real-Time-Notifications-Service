/**
 * Created by ozbar on 5/30/2017.
 */

/*
 The service will always send the ws object to the login function
 That is an example for authentication module
 Authentication module should return username / user ID if authenticated
 OR null if not authorized
 */

const BasicAuth = () => {};

BasicAuth.login = (username, password) => {
    if (username === 'admin' && password === 'Password1') {
        return username;
    }
    return null;
};

module.exports.BasicAuth = BasicAuth;
