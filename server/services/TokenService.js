const jwt = require("jsonwebtoken");

const { sendError } = require("../libs/APIResponse");

const generateJWTToken = (data) => {
  const token = jwt.sign(data, process.env.TOKEN_KEY, { expiresIn: "30m" });
  return token;
};

const getAndValidateBearerToken = (res, bearerToken) => {
  if (!bearerToken || !bearerToken.startsWith("Bearer ")) return null;

  const token = bearerToken.split(" ")[1];
  if (!token) return null;

  return token;
};

module.exports = { generateJWTToken, getAndValidateBearerToken };
