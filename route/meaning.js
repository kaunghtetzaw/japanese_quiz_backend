const express = require("express");

const router = express.Router();

const meaningController = require("../controller/meaning");

router.get("/", meaningController.getMeaning);

module.exports = router;
