const jwt = require("jsonwebtoken");

const { sendError } = require("../libs/APIResponse");

const generateJWTToken = (data) => {
  const token = jwt.sign(data, process.env.TOKEN_KEY, { expiresIn: "30m" });
  return token;
};

const getAndValidateBearerToken = (res, bearerToken) => {
  if (!bearerToken || !bearerToken.startsWith("Bearer "))
    return sendError(res, "Bearer token format invalid!");

  const token = bearerToken.split(" ")[1];
  if (!token) return sendError(res, "Bearer token format invalid!");

  return token;
};

module.exports = { generateJWTToken, getAndValidateBearerToken };
