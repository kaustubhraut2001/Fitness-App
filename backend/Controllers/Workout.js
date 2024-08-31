const Workout = require("../Models/Workout");
const User = require("../Models/User");

const createWorkout = async(req, res) => {
    try {

        const { user, type, duration, date, caloriesBurned, notes } = req.body;


        // Find user to verify they exist
        const userExists = await User.findById(user);
        if (!userExists) {
            return res.status(404).json({ message: "User not found" });

        }
        // Create new workout
        const newWorkout = new Workout({ user, type, duration, date, caloriesBurned, notes });
        const savedWorkout = await newWorkout.save();
        res.status(201).json({ message: savedWorkout });

    } catch (error) {
        res.status(500).json({ message: error.message });

    }
};

const updateworkout = async(req, res) => {
    try {

        const { user, type, duration, date, caloriesBurned, notes } = req.body;
        const { id } = req.params;
        const updatedWorkout = await Workout.findByIdAndUpdate(id, { user, type, duration, date, caloriesBurned, notes }, { new: true });

        if (!updatedWorkout) {
            return res.status(404).json({ message: "Workout not found" });
        }
        res.status(200).json({ message: "Workout updated successfully", workout: updatedWorkout });

    } catch (error) {
        res.status(500).json({ message: error.message });

    }
};

const getworkout = async(req, res) => {
    try {
        const { id } = req.params;
        const workout = await Workout.findById(id);
        if (!workout) {
            return res.status(404).json({ message: "Workout not found" });
        }
        res.status(200).json({ message: workout });


    } catch (error) {
        res.status(500).json({ message: error.message });

    }

};

const deleteWorkout = async(req, res) => {
    try {
        const { id } = req.params;
        const deletedWorkout = await Workout.findByIdAndDelete(id);
        if (!deletedWorkout) {
            return res.status(404).json({ message: "Workout not found" });
        }
        res.status(200).json({ message: "Workout deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
};


module.exports = {
    createWorkout,
    updateworkout,
    getworkout,
    deleteWorkout,
};