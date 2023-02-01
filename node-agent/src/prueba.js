import redis from 'redis';
var client = redis.createClient(8081, redis);
client.on('connect', function() {
    console.log('connected');
});