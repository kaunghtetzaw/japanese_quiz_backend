const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.eg_sentence = async (req, res, next) => {
  const word_id = +req.query.word_id || null;
  try {
    const eg_sentence = await prisma.eg_sentence.findMany({
      where: {
        word_id: word_id,
      },
    });
    res.json({
      value: eg_sentence,
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};
