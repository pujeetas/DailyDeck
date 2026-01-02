import { UserModel } from "../schema/userSchema.js";

export const getUserDetailsController = async (req, res) => {
  try {
    const loggedinUser = req.user;
    const getLoggedUserFromDb = await UserModel.findById({
      _id: loggedinUser.id,
    }).select("-password");

    if (!getLoggedUserFromDb) {
      return res.status(400).send("User not found");
    }

    res.send(getLoggedUserFromDb);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const updateUserDetailsController = async (req, res) => {
  try {
    const {
      firstName,
      userName,
      jobTitle,
      bio,
      emailNotification,
      browserNotification,
      avatarId,
      gitHub,
    } = req.body;

    const updateData = {
      firstName,
      userName,
      jobTitle,
      bio,
      emailNotification,
      browserNotification,
      avatarId,
    };

    if (gitHub) {
      updateData.gitHub = gitHub;
    }

    const user = await UserModel.findByIdAndUpdate(req.user.id, updateData, {
      new: true,
    }).select("-password");
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
