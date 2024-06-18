const mongoose = require("mongoose");
const { Account } = require("../model/User");

const getBalance = async (req, res) => {
  const userId = req.body.userId;
  if (!userId) {
    return res.status(411).json({
      message: "Unauthorized",
    });
  }
  console.log(userId);
  const account = await Account.findOne({ userId });
  return res.status(200).json({
    balance: account.balance,
  });
};

const transferAmount = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const userId = req.body.userId;
  const { to, amount } = req.body;

  const senderAcc = await Account.findOne({ userId }).session(session);

  if (!userId) {
    return res.status(400).json({
      message: "Unauthorized",
    });
  }

  if (!amount || senderAcc.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }

  const receiverAcc = await Account.findOne({ userId: to }).session(session);

  if (!receiverAcc) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }

  await Account.findByIdAndUpdate(
    { userId },
    { $inc: { balance: amount } }
  ).session(session);
  await Account.findByIdAndUpdate(
    { userId: to },
    { $inc: { balance: -amount } }
  ).session(session);

  session.commitTransaction();

  res.status(200).json({
    message: "Transfer successful",
  });
};

module.exports = { getBalance, transferAmount };
