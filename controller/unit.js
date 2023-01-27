const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getUnit = async (req, res, next) => {
  try {
    const units = await prisma.unit.findMany();
    res.json({
      value: units,
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};
