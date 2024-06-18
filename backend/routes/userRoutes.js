const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/authControllers");
const authMiddleware = require("../middlewares/authMiddleware");
const userController = require("../controllers/userController");

// signup
router.route("/signup").post(authControllers.signup);

//signin
router.route("/signin").post(authControllers.signin);

//update
router.route("/").put(authMiddleware, authControllers.updateUser);

//loggedin
router.route("/bulk").get(authMiddleware, userController.getUser);

module.exports = router;
