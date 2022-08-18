const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { sendError, sendData, sendOk } = require("../libs/APIResponse");

const getAllActivities = async (req, res) => {
  try {
    const allActivities = await prisma.activities.findMany({
      select: {
        time: true,
        card: {
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
        },
      },
      orderBy: [
        {
          time: "desc",
        },
      ],
    });

    allActivities.forEach((activity) => {
      activity.time = activity.time.toLocaleString();
    });

    sendData(res, allActivities);
  } catch (err) {
    sendError(res, err.message ?? undefined);
  }
};

const updateDataCache = async (req, res) => {
  const { code } = req.query;

  if (!code) return res.send("OFF");

  try {
    const card = await prisma.cards.findFirst({
      where: {
        id: code,
      },
    });
    global.findData = card;

    res.send("OK");
  } catch (err) {
    res.send("OFF");
  }
};

const addNewAcivity = async (req, res) => {
  const { code } = req.query;

  if (!code) return res.send("OFF");

  try {
    const card = global.findData;

    if (!card) return res.send("OFF");
    if (!card?.nim) return res.send("OFF");

    res.send("OK");

    await prisma.activities.create({
      data: {
        code,
      },
    });
  } catch (err) {
    return res.send("OFF");
  }
};

module.exports = { getAllActivities, updateDataCache, addNewAcivity };
