const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getMeaning = async (req, res, next) => {
  const word_id = +req.query.word_id || null;
  try {
    const meaning = await prisma.word_meaning.findMany({
      where: {
        word_id: word_id,
      },
    });
    res.json({
      value: meaning,
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};
