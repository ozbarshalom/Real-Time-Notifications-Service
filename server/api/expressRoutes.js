/**
 * Created by ozbar on 5/29/2017.
 */

module.exports = (function() {
    'use strict';
    var router = require('express').Router();

    router.get('/', function(req, res) {
        res.send('Welcome to Notifications service');
    });

    return router;
})();