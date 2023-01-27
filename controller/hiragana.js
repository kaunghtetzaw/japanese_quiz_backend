const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getHiragana = async (req, res, next) => {
  const word_id = +req.query.word_id || null;
  try {
    const hiragana = await prisma.hiragana.findMany({
      where: {
        word_id: word_id,
      },
    });
    res.json({
      value: hiragana,
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};
