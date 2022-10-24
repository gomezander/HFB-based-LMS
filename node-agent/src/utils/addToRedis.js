//Redis Connection
import express from 'express';
import redis from 'redis';
import crypto from 'crypto';
const app = express()
const PORT = process.env.PORT || 9000
const REDIS_PORT = process.env.REDIS_PORT || 6379
const REDIS_URL = process.env.REDIS_URL || "localhost" //Change localhost to redis when using docker


export default async function addToRedis(log) {

    try {

        const client = redis.createClient({
            //legacyMode: true,
            socket: {
                host: REDIS_URL,
                port: 6379,

            }
        });

        client.on('connect', () => console.log(`\nRedis is connected on port ${REDIS_PORT}`));
        client.on("error", (error) => console.error(error));
        app.listen(PORT, () => console.log(`\nServer running on port ${PORT}`));

        var hash = crypto.createHash('md5').update(log).digest('hex');
        await client.connect();
        await client.set(hash, log);
        console.log("\nKey/Value pair added to Redis database: ", hash, " / ", log,);



        client.quit();
        console.log('\nclient disconnected')

        return hash;

    } catch (error) {
        console.log(error);
    }

}