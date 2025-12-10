const TodoModel = require("../schema/todoSchema");
const {
  createTodoValidations,
  updateTodoValidations,
} = require("../validation/todoValidations");

const createTodo = async (req, res) => {
  try {
    const todoDetailsFromUser = req.body;

    const { error, value } =
      createTodoValidations.validate(todoDetailsFromUser);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    await TodoModel.create(value);
    res.send(value);
  } catch (error) {
    res.status(400).send("Cannot create todo. " + error);
  }
};

const updateTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    const exists = await TodoModel.findById(todoId);
    if (!exists) {
      return res.status(400).send("Todo does not exist");
    }
    const todoDetailsToUpdate = req.body;
    const { error, value } =
      updateTodoValidations.validate(todoDetailsToUpdate);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    ["_id", "createdAt", "updatedAt", "__v"].forEach(
      (key) => delete value[key]
    );

    const updated = await TodoModel.findByIdAndUpdate(
      todoId,
      { $set: value },
      { new: true }
    );

    res.send(updated);
  } catch (error) {
    res.status(400).send("Cannot update todo. " + error);
  }
};

const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    await TodoModel.findByIdAndDelete(todoId);
    res.send("Todo deleted");
  } catch (error) {
    res.status(400).send("Cannot delete todo. " + error);
  }
};

const getAllTodo = async (req, res) => {
  try {
    const allTodo = await TodoModel.find();
    res.send(allTodo);
  } catch (error) {
    res.status(400).send("Cannot get all todo. " + error);
  }
};

const bulkUnfocus = async (req, res) => {
  try {
    const { ids, focused } = req.body;
    await TodoModel.updateMany({ _id: { $in: ids } }, { $set: { focused } });
    res.send("unfocused all todo. ");
  } catch (error) {
    res
      .status(400)
      .json({ message: "Cannot unfocus all todo: " + error.message });
  }
};

const getGitDetails = async (req, res) => {
  try {
    const userURL = req.body.url;

    const match = userURL.match(/github\.com\/([^/]+)\/([^/]+)\/issues\/(\d+)/);

    if (!match) {
      return res.status(400).send("Invalid GitHub issue URL.");
    }

    const gitIssueExists = await TodoModel.findOne({ gitURL: userURL });

    if (gitIssueExists) {
      return res.status(400).json({ message: "Git Issue Already Exists" });
    }

    const [_, owner, repo, issueNumber] = match;

    const apiURL = `https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}`;

    const response = await fetch(apiURL, {
      headers: {
        Accept: "application/vnd.github+json",
      },
    });

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ message: "Issue not found on GitHub" });
    }

    const data = await response.json();

    return res.json(data);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Cannot get git details: " + error.message });
  }
};

module.exports = {
  createTodo,
  updateTodo,
  deleteTodo,
  getAllTodo,
  bulkUnfocus,
  getGitDetails,
};
