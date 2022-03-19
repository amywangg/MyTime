const redis = require("redis");
var url = require("url");

let redis_client = null;

(async () => {
  if (process.env.NODE_ENV === "production") {
    var rtg = url.parse(process.env.REDISTOGO_URL);
    redis_client = redis.createClient(rtg.port, rtg.hostname);
    redis_client.auth(rtg.auth.split(":")[1]);
  } else {
    redis_client = redis.createClient();
  }
  redis_client.on("error", (err) => console.log("Redis Client Error", err));
  await redis_client.connect();
  await redis_client.set("key", "Successfully Connected to Redis ✨");
  console.log(await redis_client.get("key"));
})();

module.exports = redis_client;
