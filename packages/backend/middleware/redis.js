const redis = require("redis");
// 1 configure our redis
let redis_client = null;
(async () => {
  redis_client = redis.createClient(
    process.env === "production" && process.env.REDISTOGO_URL
  );

  redis_client.on("error", (err) => console.log("Redis Client Error", err));

  await redis_client.connect();

  await redis_client.set("key", "Successfully Connected to Redis ✨");
  console.log(await redis_client.get("key"));
})();

module.exports = redis_client;
