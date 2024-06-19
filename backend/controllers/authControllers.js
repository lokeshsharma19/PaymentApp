const zod = require("zod");
const { User, Account } = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// zod bodies

const signUpBody = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string().min(8),
});

const signInBody = zod.object({
  username: zod.string().email(),
  password: zod.string().min(8),
});

const updatedBody = zod.object({
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
  password: zod.string().optional(),
});

//controllers

const signup = async (req, res) => {
  const success = signUpBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  const { username, firstName, lastName, password } = req.body;
  const foundUser = await User.findOne({ username });
  if (foundUser) {
    return res.status(411).json({
      message: "Email already taken/Incorrect inputs",
    });
  }

  const hashedPwd = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    username,
    firstName,
    lastName,
    password: hashedPwd,
  });

  if (!newUser) {
    return res.status(411).json({
      message: "Cannot create a new user",
    });
  }

  const userId = newUser?._id;

  const newAccount = await Account.create({
    userId,
    balance: 1 + Math.random() * 10000,
  });
  if (!newAccount) {
    return res.status(411).json({
      message: "Cannot create a new user",
    });
  }

  const token = jwt.sign(
    {
      userId,
    },
    process.env.JWT_TOKEN_SECRET
  );
  return res.status(200).json({
    message: "User created successfully!",
    token,
  });
};

// ###### signin #####//
const signin = async (req, res) => {
  const success = signInBody.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "Incorrect Credentials",
    });
  }

  const { username, password } = req.body;
  const foundUserPwd = await User.findOne({ username }).select("password");

  if (!foundUserPwd) {
    return res.json({
      message: "User doesn't exists...",
    });
  }
  console.log(foundUserPwd);

  const match = await bcrypt.compare(password, foundUserPwd.password);
  if (!match) return res.status(401).json({ message: "Unauthorized" });

  const token = jwt.sign(
    {
      userId: foundUserPwd._id,
    },
    process.env.JWT_TOKEN_SECRET
  );
  res.status(200).json({
    token,
  });
};

const updateUser = async (req, res) => {
  const { success } = updatedBody.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }
  const { password, firstName, lastName } = req.body;
  const userId = req.body.userId;
  if (!password && !firstName && !lastName) {
    return res.status(411).json({
      message: "Error while updating information",
    });
  }
  const user = await User.findOne({ _id: userId });

  if (!user) {
    return res.status(411).json({
      message: "Error while updating information",
    });
  }
  let hashedPwd;
  if (password && password.length > 0) {
    hashedPwd = await bcrypt.hash(password, 10);
  } else hashedPwd = user.password;

  const newUser = {
    firstName: !firstName ? user.firstName : firstName,
    lastName: !lastName ? user.lastName : lastName,
    password: hashedPwd,
  };
  const updatedUser = await User.updateOne({ _id: userId }, newUser);

  return res.status(200).json({
    message: "Updated successfully",
  });
};

module.exports = { signin, signup, updateUser };
