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

const getAllStudentsAndCards = async (req, res) => {
  try {
    const students = await prisma.students.findMany({
      select: {
        nim: true,
        name: true,
      },
      orderBy: [
        {
          nim: "asc",
        },
      ],
    });

    const cards = await prisma.cards.findMany({
      select: {
        id: true,
        nim: true,
      },
    });

    const cardsObj = {};
    cards.forEach((card) => {
      cardsObj[card.nim] = card.id;
    });

    students.forEach((st) => {
      st["code"] = cardsObj[st.nim];
    });

    sendData(res, students);
  } catch (err) {
    sendError(res, err.message ?? undefined);
  }
};

module.exports = { getAllAvailableStudents, getAllStudentsAndCards };
