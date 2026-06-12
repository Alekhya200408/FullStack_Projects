import Habit from "../models/Habit.js";
import User from "../models/User.js";

// Create Habit
export const createHabit = async (req, res) => {
  try {
    const { title } = req.body;

    const habit = await Habit.create({
      userId: req.user._id,
      title,
    });

    res.status(201).json({
      success: true,
      habit,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Habits
export const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({
      userId: req.user._id,
    });

    res.status(200).json({
      success: true,
      habits,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Habit
export const deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({
        message: "Habit not found",
      });
    }

    await Habit.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Habit deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const completeHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({
        message: "Habit not found",
      });
    }
    // checking for not extra complition of the daily habit
      const today = new Date().toDateString();

      const alreadyCompleted = habit.completedDates.some(
          (date) => new Date(date).toDateString() === today
      );

      if (alreadyCompleted) {
          return res.status(400).json({
              message: "Habit already completed today",
          });
      }

    // Add today's date when it completed
    habit.completedDates.push(new Date());

    // Increase the streak
    habit.streak += 1;
    //  //

    await habit.save();

    // Update the User XP
    const user = await User.findById(req.user._id);

    user.xp += 10;

    // Update the Level
    user.level = Math.floor(user.xp / 100) + 1;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Habit Completed",
      streak: habit.streak,
      xp: user.xp,
      level: user.level,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};