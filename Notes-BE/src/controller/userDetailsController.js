import { NotesModel } from "../schema/notesSchema.js";
import { TodoModel } from "../schema/todoSchema.js";
import { UserModel } from "../schema/userSchema.js";
import { userDetailsValidation } from "../validation/userDetailsValidation.js";

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
    const { error, value } = userDetailsValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const user = await UserModel.findByIdAndUpdate(req.user.id, value, {
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
