const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Index page",
  });
});

module.exports = router;
