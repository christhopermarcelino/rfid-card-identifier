const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { sendData } = require("../libs/APIResponse");

const getAllAvailableStudents = async (req, res) => {
  try {
    const notAvailableStudents = await prisma.cards.findMany({
      select: {
        nim: true,
      },
    });

    const notAvailableStudentsNim = notAvailableStudents.map(
      (item) => item.nim
    );

    const allAvailableStudents = await prisma.students.findMany({
      where: {
        nim: { notIn: notAvailableStudentsNim },
      },
      select: {
        nim: true,
        name: true,
      },
    });

    sendData(res, allAvailableStudents);
  } catch (err) {
    sendError(res, err.message ?? undefined);
  }
};

module.exports = { getAllAvailableStudents };
