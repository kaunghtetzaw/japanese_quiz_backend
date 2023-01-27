const { PrismaClient } = require("@prisma/client");
const { json } = require("body-parser");

const prisma = new PrismaClient();

exports.getQuiz = async (req, res, next) => {
  const unit_id = +req.query.unit_id;

  try {
    const quizWordList = await prisma.$queryRaw`
      SELECT w1.word_id, w1.word, h.hiragana_id, h.hiragana_reading, wm.word_meaning_id, wm.word_meaning  
      FROM word AS w1 JOIN (SELECT word_id FROM word where unit_id = ${unit_id} ORDER BY RAND()  LIMIT 10 ) as w2 ON w1.word_id = w2.word_id 
      LEFT JOIN hiragana as h ON h.word_id = w1.word_id 
      LEFT JOIN word_meaning as wm ON wm.word_id = w1.word_id
    `;

    let quizList = await Promise.all(
      quizWordList.map(async (el) => {
        const quiz_hiragana_choices = await prisma.$queryRaw`
        SELECT * FROM hiragana AS t1 JOIN (SELECT hiragana_id FROM hiragana ORDER BY RAND() LIMIT 3) as t2 ON t1.hiragana_id=t2.hiragana_id`;

        const quiz_meaning_choices = await prisma.$queryRaw`
        SELECT * FROM word_meaning AS t1 JOIN (SELECT word_meaning_id FROM word_meaning ORDER BY RAND() LIMIT 3) as t2 ON t1.word_meaning_id=t2.word_meaning_id;`;

        return {
          word: { word_id: el.word_id, word: el.word },
          hiragana_choices: [
            ...quiz_hiragana_choices,
            { hiragana_reading: el.hiragana_reading, word_id: el.word_id },
          ],
          meaning_choices: [
            ...quiz_meaning_choices,
            { word_meaning: el.word_meaning, word_id: el.word_id },
          ],
          answer: {
            hiragana_answer: {
              hiragana_reading: el.hiragana_reading,
              word_id: el.word_id,
            },
            meaning_answer: {
              word_meaning: el.word_meaning,
              word_id: el.word_id,
            },
          },
        };
      })
    );
    console.log(quizList);
    res.json(quizList);
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};
