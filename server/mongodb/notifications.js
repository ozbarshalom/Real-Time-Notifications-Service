/**
 * Created by ozbar on 5/30/2017.
 */

const MongoDB = require('./mongoDB');
const NotificationSchema = require('./notificationSchema');

const Notifications = () => {};

Notifications.model = MongoDB.connection.model('Notification', NotificationSchema);

Notifications.getAll = () => {
    return Notifications.model.find({})
        .then((results) => {
            return results;
        });
};

module.exports.Notifications = Notifications;