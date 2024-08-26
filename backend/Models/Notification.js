const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    message: { type: String, required: true },
    scheduledTime: { type: Date, required: true },
});

module.exports = mongoose.model('Notification', NotificationSchema);