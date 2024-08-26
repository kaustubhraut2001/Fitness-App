const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    targetValue: { type: Number, required: true },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date },
});

module.exports = mongoose.model('Goal', GoalSchema);