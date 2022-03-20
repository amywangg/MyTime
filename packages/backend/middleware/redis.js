const redis = require("redis");

let redis_client;
(async () => {
  if (process.env.REDIS_URL) {
    redis_client = redis.createClient({
      url: process.env.REDIS_URL,
    });
    await redis_client.connect();
    redis_client.on("connect", function () {
      client.stream.setKeepAlive(true, 1000000000000000000000);
    });
    await redis_client.set("key", "Successfully Connected to Redis ✨");
    console.log(await redis_client.get("key"));
  } else {
    redis_client = redis.createClient();
    redis_client.on("error", (err) => console.log("Redis Client Error", err));
    await redis_client.connect();
    await redis_client.set("key", "Successfully Connected to Redis ✨");
    console.log(await redis_client.get("key"));
  }
})();

module.exports = redis_client;
