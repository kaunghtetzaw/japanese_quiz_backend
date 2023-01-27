const express = require("express");

const quizController = require("../controller/quiz");

const router = express.Router();

router.get("/", quizController.getQuiz);

module.exports = router;
