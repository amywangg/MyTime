const redis = require("redis");
// 1 configure our redis
let redis_client = null;
(async () => {
  redis_client = redis.createClient();

  redis_client.on("error", (err) => console.log("Redis Client Error", err));

  await redis_client.connect();

  await redis_client.set("key", "Successfully Connected to Redis ✨");
  console.log(await redis_client.get("key"));
  console.log("trial1", redis_client);
})();

module.exports = redis_client;
