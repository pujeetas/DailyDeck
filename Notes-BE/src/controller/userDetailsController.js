const UserModel = require("../schema/userSchema");

const userDetailsController = async (req, res) => {
  try {
    const loggedinUser = req.user;

    const getLoggedUserFromDb = await UserModel.findById({
      _id: loggedinUser.id,
    }).select("firstName lastname email ");

    if (!getLoggedUserFromDb) {
      return res.status(400).send("User not found");
    }

    res.send(getLoggedUserFromDb);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = userDetailsController;
