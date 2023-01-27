const express = require("express");

const router = express.Router();

const unitController = require("../controller/unit");

router.get("/", unitController.getUnit);

module.exports = router;
