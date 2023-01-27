const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getWord = async (req, res, next) => {
  const unit_id = +req.query.unit_id;
  try {
    const word = await prisma.word.findMany({
      where: {
        unit_id: unit_id,
      },
    });
    console.log(word);
    res.json({
      value: word,
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};
