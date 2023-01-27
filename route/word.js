const express = require("express");

const router = express.Router();

const wordController = require("../controller/word");

router.get("/", wordController.getWord);

module.exports = router;
