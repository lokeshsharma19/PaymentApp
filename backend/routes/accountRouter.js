const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const balanceController = require("../controllers/balanceController");

router.get("/balance", authMiddleware, balanceController.getBalance);

router.get("/transfer", authMiddleware, balanceController.transferAmount);

module.exports = router;
