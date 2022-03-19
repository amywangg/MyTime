const redis = require("redis");
// 1 configure our redis
let redis_client = null;
(async () => {
  if (process.env.REDISTOGO_URL) {
    var rtg = require("url").parse(process.env.REDISTOGO_URL);
    var redis_client = redis.createClient(rtg.port, rtg.hostname);
    redis_client.on("error", (err) => console.log("Redis Client Error", err));
    await redis_client.connect();
    redis_client.auth(rtg.auth.split(":")[1]);
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
