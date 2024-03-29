const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bcrypt = require("bcryptjs");

const { sendError, sendData } = require("../libs/APIResponse");
const { generateJWTToken } = require("../services/TokenService");

const signin = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password)
      return sendError(res, "Username and password cannot be empty", 400);

    const user = await prisma.admins.findFirst({
      where: { username },
    });
    if (!user) return sendError(res, "User does not exists!", 404);

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid)
      return sendError(res, "Username or password invalid!");

    const token = generateJWTToken({ id: user.id });

    sendData(res, { username: user.username, token }, "Successfully login");
  } catch (err) {
    sendError(res, err.message ?? undefined);
  }
};

const getUserInfo = (req, res) => {
  sendData(res, { username: req.user.username });
};

module.exports = { signin, getUserInfo };
