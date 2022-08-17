const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { sendError, sendData } = require("../libs/APIResponse");

const getAllActivities = async (req, res) => {
  try {
    const allActivities = await prisma.activities.findMany({
      include: {
        card: {
          include: {
            student: true,
          },
        },
      },
      orderBy: [
        {
          time: "desc",
        },
      ],
    });

    const datas = allActivities.map((item) => {
      return {
        time: item.time.toLocaleString(),
        name: item.card.student.name,
        nim: item.card.nim,
        code: item.card.id,
      };
    });

    sendData(res, datas);
  } catch (err) {
    sendError(res, err.message ?? undefined);
  }
};

const addNewAcivity = async (req, res) => {
  const { code } = req.query;

  if (!code) return sendError(res, "Card id can not be empty!", 400);

  try {
    const card = await prisma.cards.findFirst({
      where: {
        id: code,
      },
    });

    if (!card || !card?.nim) return res.send("OFF");

    await prisma.activities.create({
      data: {
        code,
      },
    });

    return res.send("OK");
  } catch (err) {
    return res.send("OFF");
  }
};

module.exports = { getAllActivities, addNewAcivity };
