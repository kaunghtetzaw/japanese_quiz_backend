const express = require("express");

const router = express.Router();

const eg_sentenceController = require("../controller/eg_sentence");

router.get("/", eg_sentenceController.eg_sentence);

module.exports = router;
