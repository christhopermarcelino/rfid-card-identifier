const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { sendError, sendOk, sendData } = require("../libs/APIResponse");

const updateTemporaryCard = async (req, res) => {
  const { code } = req.body;

  if (!code) return sendError(res, "Card code can not be empty!", 400);

  try {
    await prisma.cardTemp.update({
      where: { id: 1 },
      data: { code },
    });
  } catch (err) {
    return sendError(res, err.message ?? undefined);
  }

  sendOk(res);
};

const getTemporaryCard = async (req, res) => {
  try {
    const card = await prisma.cardTemp.findFirst({
      where: { id: 1 },
    });

    delete card.id;

    sendData(res, card);
  } catch (err) {
    sendError(res, err.message ?? undefined);
  }
};

const insertNewCard = async (req, res) => {
  const card = await prisma.cardTemp.findFirst({ where: { id: 1 } });

  if (!card.code) return sendError(res, "No card to insert!");

  try {
    await prisma.cards.create({
      data: {
        id: card.code,
        activated_at: new Date().toISOString(),
        last_activity: new Date().toISOString(),
      },
    });
  } catch (err) {
    return sendError(res, err.message ?? undefined);
  }

  sendOk(res);
};

const pairCardWithUser = async (req, res) => {
  const { cardId, nim } = req.body;

  if (!cardId || !nim)
    return sendError(res, "Card id and NIM can not be empty!", 400);

  try {
    const card = await prisma.cards.findFirst({
      where: { id: cardId },
    });
    if (!card) return sendError(res, "Card does not exists!");

    if (card.studentId)
      return sendError(res, "Card has already been paired!", 409);

    const student = await prisma.students.findFirst({
      where: { nim },
    });
    if (!student) return sendError(res, "Student does not exists!");

    await prisma.cards.update({
      where: { id: cardId },
      data: { studentId: nim },
    });
  } catch (err) {
    return sendError(res, err.message ?? undefined);
  }

  sendOk(res);
};

module.exports = {
  updateTemporaryCard,
  getTemporaryCard,
  insertNewCard,
  pairCardWithUser,
};
