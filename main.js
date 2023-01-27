const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const unitRoute = require("./route/unit");
const wordRoute = require("./route/word");
const hiraganaRoute = require("./route/hiragana");
const meaningRoute = require("./route/meaning");
const eg_sentenceRoute = require("./route/eg_sentence");
const quizRoute = require("./route/quiz");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.static(path.join(__dirname, "../")));
console.log(path.join(__dirname, "../"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/unit", unitRoute);
app.use("/word", wordRoute);
app.use("/hiragana", hiraganaRoute);
app.use("/meaning", meaningRoute);
app.use("/sentence", eg_sentenceRoute);
app.use("/quiz", quizRoute);

app.listen(3000, () => console.log("server started at prot 3000"));
