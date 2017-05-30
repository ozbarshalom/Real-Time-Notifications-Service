/**
 * Created by ozbar on 5/30/2017.
 */

const Notifications = require('../../mongodb/notifications').Notifications;


const NotificationsEndPoints = () => {};

NotificationsEndPoints.getNotifications = (req, res) => {
    Notifications.getAll()
        .then((notifications) => {
            res.json({notifications});
        });
};

module.exports.NotificationsEndPoints = NotificationsEndPoints;