const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { sendError, sendOk, sendData } = require("../libs/APIResponse");

const updateTemporaryCard = async (req, res) => {
  const { code } = req.query;

  if (!code) return sendError(res, "Card code can not be empty!", 400);

  try {
    const updated = await prisma.cardTemp.update({
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
      select: {
        code: true,
      },
    });

    const existedCard = await prisma.cards.findFirst({
      where: {
        id: card.code,
      },
    });

    const data = {
      code: card.code,
      isRegistered: existedCard?.nim ? true : false,
      name: existedCard?.name,
    };

    sendData(res, data);
  } catch (err) {
    sendError(res, err.message ?? undefined);
  }
};

const removeCardConnection = async (req, res) => {
  const { code } = req.query;

  try {
    await prisma.activities.deleteMany({
      where: {
        code,
      },
    });

    await prisma.cards.update({
      where: {
        id: code,
      },
      data: {
        nim: null,
        name: null,
      },
    });

    sendOk(res);
  } catch (err) {
    sendError(res, err.message ?? undefined);
  }
};

const pairCardWithUser = async (req, res) => {
  const { cardId, nim } = req.body;

  if (!cardId || !nim)
    return sendError(res, "Card id and NIM can not be empty!", 400);

  try {
    const existedCard = await prisma.cards.findFirst({
      where: { id: cardId },
    });
    if (existedCard?.nim)
      return sendError(res, "Card has already been paired!", 409);

    const student = await prisma.students.findFirst({
      where: { nim },
    });
    if (!student) return sendError(res, "Student does not exists!");

    const splittedNim = nim.split(".");
    const name = splittedNim[2] + splittedNim[3] + splittedNim[4];

    if (!existedCard) {
      await prisma.cards.create({
        data: {
          id: cardId,
          nim,
          name,
          activated_at: new Date(),
        },
      });
    } else {
      const now = new Date();

      await prisma.cards.update({
        where: { id: cardId },
        data: { nim, name, activated_at: now, updated_at: now },
      });
    }

    sendOk(res);
  } catch (err) {
    return sendError(res, err.message ?? undefined);
  }
};

module.exports = {
  updateTemporaryCard,
  getTemporaryCard,
  removeCardConnection,
  pairCardWithUser,
};
