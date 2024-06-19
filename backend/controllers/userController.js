const { User } = require("../model/User");

const getUser = async (req, res) => {
  const queryUser = req.query.filter || "";
  const userList = await User.find({
    $or: [
      {
        lastName: {
          $regex: queryUser,
          $options: "i",
        },
      },
      {
        firstName: {
          $regex: queryUser,
          $options: "i",
        },
      },
    ],
  });

  if (!userList || userList.length == 0) {
    return res.status(411).json({
      message: "Cannot find any user",
    });
  }
  res.json({
    usersList: userList,
  });
};

module.exports = { getUser };
