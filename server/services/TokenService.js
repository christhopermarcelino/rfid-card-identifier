const jwt = require("jsonwebtoken");

const generateJWTToken = (data) => {
  const token = jwt.sign(data, process.env.TOKEN_KEY, { expiresIn: "30m" });
  return token;
};

module.exports = { generateJWTToken };
