const express = require("express");

const router = express.Router();

const hiraganaController = require("../controller/hiragana");

router.get("/", hiraganaController.getHiragana);

module.exports = router;
