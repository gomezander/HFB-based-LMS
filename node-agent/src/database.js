import express from 'express';
import redis from 'redis';
import crypto from 'crypto';
const app = express()
const PORT = process.env.PORT || 9000
const REDIS_PORT = process.env.REDIS_PORT || 6379
const REDIS_URL = process.env.REDIS_URL || "redis"
const client = redis.createClient({
    //legacyMode: true,
    socket: {
        host: "redis" ,
        port: 6379 ,

    }
});


client.on('connect', () => console.log(`Redis is connected on port ${REDIS_PORT}`))
client.on("error", (error) => console.error(error))
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
//module.exports = app

var val = 'log value';
var hash = crypto.createHash('md5').update(val).digest('hex');
console.log("hash of", val, " : ", hash)

await client.connect();
client.set(hash,val);
var key = hash;
/*
client.get(key, function(err, result) {
      console.log("Value from key " + key + " : ", result.toString());
  });
*/



