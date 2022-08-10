const jwt = require("jsonwebtoken");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { sendError } = require("../libs/APIResponse");
const { getAndValidateBearerToken } = require("../services/TokenService");

const authenticate = async (req, res, next) => {
  const bearerToken = req.headers["authorization"];

  if (!bearerToken) {
    const devToken = req.headers["devtoken"];
    if (devToken === process.env.DEV_KEY) return next();
  }

  const token = getAndValidateBearerToken(res, bearerToken);

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);

    const admin = await prisma.admins.findFirst({
      where: { id: decoded.id },
    });
    if (!admin) throw new Error("Token invalid!");

    req.user = admin;

    next();
  } catch (err) {
    return sendError(res, err.message ?? undefined);
  }
};

const devAuthenticate = (req, res, next) => {
  const devToken = req.headers["devtoken"];

  if (!devToken) return sendError(res, "Dev token can not be empty!");

  if (devToken === process.env.DEV_KEY) return next();
  sendError(res, "Dev token invalid!");
};

module.exports = { authenticate, devAuthenticate };
