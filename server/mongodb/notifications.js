/**
 * Created by ozbar on 5/30/2017.
 */

const MongoDB = require('./mongoDB');
const NotificationSchema = require('./notificationSchema');

const Notifications = () => {};

Notifications.model = MongoDB.connection.model('Notification', NotificationSchema);

Notifications.getAll = () => {
    return Notifications.model.find()
        .then((results) => {
            return results;
        });
};

Notifications.get = (notificationID) => {
    return Notifications.model.findById(notificationID)
        .then((document) => {
            return document;
        });
};

Notifications.create = (title, body, user) => {
    return new Notifications.model(
        {title: title,
        body: body,
        user: user}
    ).save();
};

module.exports.Notifications = Notifications;