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

module.exports = { getAllActivities };
