const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { sendData, sendError } = require("../libs/APIResponse");

const getAllAvailableStudents = async (req, res) => {
  try {
    const notAvailableStudents = await prisma.cards.findMany({
      select: {
        nim: true,
      },
    });

    const filterNull = notAvailableStudents.filter((item) => item.nim != null);

    const notAvailableStudentsNim = filterNull.map((item) => item.nim);

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

const getAllStudentsAndCards = async (req, res) => {
  try {
    const cards = await prisma.cards.findMany({
      select: {
        id: true,
        nim: true,
        name: true,
        student: {
          select: {
            name: true,
          },
        },
      },
    });

    const filteredCards = cards.filter((card) => card.nim != null);

    sendData(res, filteredCards);
  } catch (err) {
    sendError(res, err.message ?? undefined);
  }
};

module.exports = { getAllAvailableStudents, getAllStudentsAndCards };
