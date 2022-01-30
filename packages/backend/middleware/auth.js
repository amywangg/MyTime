require("dotenv").config;
const jwt = require("jsonwebtoken");
const redis_client = require("./redis");

module.exports = {
  generateAccessToken(email) {
    return jwt.sign({ email: email }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: process.env.JWT_ACCESS_TIME,
    });
  },
  async generateRefreshToken(email) {
    console.log("trial2", redis_client);
    console.log(await redis_client.get("key"));

    const refresh_token = jwt.sign(
      { email: email },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: process.env.JWT_REFRESH_TIME,
      }
    );
    await redis_client.get(email.toString(), async (err, data) => {
      console.log(email.toString());
      console.log("hi" + data);
      if (err) throw err;
    });
    await redis_client.set(
      email.toString(),
      JSON.stringify({ token: refresh_token })
    );
    return refresh_token;
  },

  async verifyToken(req, res, next) {
    try {
      // Bearer tokenstring
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      req.email = decoded.email;
      req.token = token;
      // verify blacklisted access token.
      const blacklistedToken = await redis_client.get(
        "BL_" + decoded.email.toString()
      );
      if (blacklistedToken === token)
        return res
          .status(401)
          .json({ status: false, message: "blacklisted token." });
      next();
    } catch (error) {
      return res.status(401).json({
        status: false,
        message: "Your session is not valid.",
        data: error,
      });
    }
  },
  async verifyRefreshToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      const data = JSON.parse(await redis_client.get(decoded.email));
      if (data == null || !data["token"]) return false;
      if (data["token"] === token) return decoded.email;
    } catch (error) {
      return null;
    }
  },
};
