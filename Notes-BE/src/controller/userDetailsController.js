import { NotesModel } from "../schema/notesSchema.js";
import { TodoModel } from "../schema/todoSchema.js";
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

    const totalNotes = await NotesModel.countDocuments({
      userId: loggedinUser.id,
    });

    const totalTodo = await TodoModel.countDocuments({
      userId: loggedinUser.id,
      status: "done",
    });

    const userWithStats = {
      ...getLoggedUserFromDb.toObject(),
      totalNotes,
      totalTodo,
    };

    res.send(userWithStats);
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
    const totalNotes = await NotesModel.countDocuments({ userId: req.user.id });
    const totalTodo = await TodoModel.countDocuments({
      userId: req.user.id,
      status: "done",
    });
    const userWithStats = {
      ...user.toObject(),
      totalNotes,
      totalTodo,
    };
    res.json({ success: true, user: userWithStats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
