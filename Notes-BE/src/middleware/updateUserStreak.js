import { UserModel } from "../schema/userSchema.js";

export const updateUserStreak = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await UserModel.findById(userId);

    if (!user) {
      return next();
    }

    const today = new Date().setHours(0, 0, 0, 0);
    const lastActive = user.lastActiveDate
      ? new Date(user.lastActiveDate).setHours(0, 0, 0, 0)
      : 0;

    const daysDiff = Math.floor((today - lastActive) / (1000 * 60 * 60 * 24));

    if (daysDiff === 0) {
      // Already active today, do nothing
      return next();
    } else if (daysDiff === 1) {
      // Consecutive day - increment streak
      user.currentStreak += 1;
    } else {
      // Streak broken - reset to 1
      user.currentStreak = 1;
    }

    // Update longest streak if current is higher
    user.longestStreak = Math.max(user.longestStreak || 0, user.currentStreak);
    user.lastActiveDate = new Date();

    await user.save();

    next();
  } catch (error) {
    console.error("Error updating user streak:", error);
    next();
  }
};
