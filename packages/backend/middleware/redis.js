const redis = require("redis");
var url = require("url");
// 1 configure our redis
let redis_client;
(async () => {
  if (process.env.REDISTOGO_URL) {
    console.log("iamhere");
    console.log(process.env.REDISTOGO_URL.split("@")[1].split(":")[0]);

    var redisURL = url.parse(process.env.REDISTOGO_URL);
    console.log(redisURL);
    redis_client = redis.createClient({
      url: process.env.REDISTOGO_URL,
    });

    await redis_client.connect();
    redis_client.auth("", redisURL.auth.split(":")[1]);
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
