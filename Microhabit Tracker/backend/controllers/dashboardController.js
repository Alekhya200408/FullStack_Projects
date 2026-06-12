import User from "../models/User.js";
import Habit from "../models/Habit.js";

export const getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

      const habits = await Habit.find({
          userId: req.user._id,
      });

      const totalHabits = habits.length;

      const currentStreak = habits.reduce(
          (max, habit) => Math.max(max, habit.streak),
          0
      );

    res.status(200).json({
      success: true,
      name: user.name,
      xp: user.xp,
      level: user.level,
      totalHabits,
      currentStreak
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};