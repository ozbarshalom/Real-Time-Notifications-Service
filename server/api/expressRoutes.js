/**
 * Created by ozbar on 5/29/2017.
 */

const router = require('express').Router();
const NotificationsEndPoints = require('./endpoints/notifications').NotificationsEndPoints;

router.get('/', function(req, res) {
    res.send('Welcome to Notifications service');
});

router.route('/notifications').get(NotificationsEndPoints.getNotifications);



module.exports = router;
