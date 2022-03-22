const redis = require("redis");
const Redis = require("ioredis");

let redis_client;
(async () => {
  if (process.env.REDIS_URL) {
    redis_client = new Redis(process.env.REDIS_URL);
  } else {
    redis_client = redis.createClient();
    redis_client.on("error", (err) => console.log("Redis Client Error", err));
    await redis_client.connect();
    await redis_client.set("key", "Successfully Connected to Redis ✨");
    console.log(await redis_client.get("key"));
  }
})();

module.exports = redis_client;

// let
// (async () => {
//   if (process.env.REDIS_TLS_URL) {
//     redis_client = redis.createClient({
//       url: process.env.REDIS_TLS_URL,
//     });
//     await redis_client.connect();
//     await redis_client.set("key", "Successfully Connected to Redis ✨");
//     console.log(await redis_client.get("key"));
//   } else {
//     redis_client = redis.createClient();
//     redis_client.on("error", (err) => console.log("Redis Client Error", err));
//     await redis_client.connect();
//     await redis_client.set("key", "Successfully Connected to Redis ✨");
//     console.log(await redis_client.get("key"));
//   }
// })();

// module.exports = redis_client;
