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

NotificationsEndPoints.createNotification = (req, res) => {
    Notifications.create(req.body.title, req.body.body, req.body.user)
        .then((notification) => {
            res.status(201);

            res.json({notification});
        });
};

module.exports.NotificationsEndPoints = NotificationsEndPoints;