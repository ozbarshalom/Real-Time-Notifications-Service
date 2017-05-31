/**
 * Created by ozbar on 5/30/2017.
 */

const Notifications = require('../../mongodb/notifications').Notifications;
const WebsocketServer = require('../../../server/websocket/websocketServer');

const NotificationsEndPoints = () => {};

NotificationsEndPoints.getNotifications = (req, res) => {
    Notifications.getAll()
        .then((notifications) => {
            res.json({notifications});
        });
};

NotificationsEndPoints.createNotification = (req, res) => {
    Notifications.create(req.body.title, req.body.body, req.body.user, req.body.params)
        .then((notification) => {
            WebsocketServer.broadcastNotification(notification, notification.user);
            res.status(201);
            res.json({notification});
        });
};

module.exports.NotificationsEndPoints = NotificationsEndPoints;