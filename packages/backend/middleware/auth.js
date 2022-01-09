const jwt = require("jsonwebtoken");
const privateKey = process.env.jwt_secret;

module.exports = {
  getToken(email) {
    const payload = { email: email };
    return jwt.sign(payload, privateKey, {
      algorithm: "HS256",
      noTimestamp: true,
    });
  },

  decodeToken(token) {
    return jwt.verify(token, privateKey);
  },
};
