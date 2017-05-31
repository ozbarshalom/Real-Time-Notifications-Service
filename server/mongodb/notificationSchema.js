/**
 * Created by ozbar on 5/30/2017.
 */
const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
    title: String,
    body: String,
    date: { type: Date, default: Date.now },
    seen: {type: Boolean, default: false},
    params: {type: Object, default: {}},
    user: {type: String}
    },
    { collection: 'notification' }
);

module.exports = notificationSchema;