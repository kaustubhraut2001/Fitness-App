const Goals = require("../Models/Goal");
const User = require("../Models/User");

const createGoal = async(req, res) => {
    try {

        const { user, type, targetValue, startDate, endDate } = req.body;

        const newGoal = new Goals({
            user,
            type,
            targetValue,
            startDate,
            endDate
        });
        const savedGoal = await newGoal.save();
        res.status(201).json(savedGoal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getallgoals = async(req, res) => {
    try {
        const { userId } = req.query;
        const filter = userId ? { user: userId } : {};
        const goals = await Goal.find(filter).populate('user', 'name email');

        res.status(200).json({ message: goals });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error: Could not retrieve goals' });
    }
};

const updategoal = async(req, res) => {
    try {
        const { id } = req.params;
        const { type, targetValue, startDate, endDate } = req.body;
        const updatedGoal = await Goals.findByIdAndUpdate(id, { type, targetValue, startDate, endDate }, { new: true });
        if (!updatedGoal) {
            return res.status(404).json({ message: 'Goal not found' });
        }
        res.status(200).json({ message: updatedGoal });
    } catch (error) {
        res.status().json({
            message: error.message

        });
    };
};

const deletegoals = async(req, res) => {
    try {
        const { id } = req.params;

        const goal = await Goals.findByIdAndDelete(id);
        if (!goal) {
            return res.status(404).json({ message: 'Goal not found' });
        }
        res.status(200).json({ message: 'Goal deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getgoalbyid = async(req, res) => {
    try {
        const { id } = req.params;
        const goal = await Goals.findById(id);
        if (!goal) {
            return res.status(404).json({ message: 'Goal not found' });
        }
        res.status(200).json({ message: goal });
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
};

module.exports = {
    createGoal,
    getallgoals,
    updategoal,
    deletegoals,
    getgoalbyid
};