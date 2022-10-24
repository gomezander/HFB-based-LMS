'use strict'
/** @module query 
 * Queries a data point in InfluxDB using the Javascript client library with Node.js.
**/

import { InfluxDB, Point } from '@influxdata/influxdb-client'

/** Environment variables **/
const url = process.env.INFLUX_URL || 'http://localhost:8086' //change localhost to influxdb when using docker
const token = process.env.INFLUX_TOKEN || 'myadmintoken'
const org = process.env.INFLUX_ORG || 'myorganization'




//Redis Connection
import express from 'express';
import redis from 'redis';
import crypto from 'crypto';
const app = express()
const PORT = process.env.PORT || 9000
const REDIS_PORT = process.env.REDIS_PORT || 6379
const REDIS_URL = process.env.REDIS_URL || "localhost" //Change localhost to redis when using docker

//await client.connect();

import addasset from '../../blockchain/asset-transfer-basic/application-javascript/addasset.js';
import query from '../../blockchain/asset-transfer-basic/application-javascript/query.js';
import { waitForDebugger } from 'inspector'
//const method = 'CreateAsset';

const method = 'GetAllAssets';
const id = 'appUser';



var val = 'log_value';
var hash = crypto.createHash('md5').update(val).digest('hex');
var key;


async function main() {
	try {

        const queryApi = new InfluxDB({url, token}).getQueryApi(org)

        const client = redis.createClient({
            //legacyMode: true,
            socket: {
                host: REDIS_URL ,
                port: 6379 ,
        
            }
        });


        const fluxQuery = 'from(bucket: "mybucket") |> range(start: -10s) |> filter(fn: (r) => r["_measurement"] == "suricata") |> filter(fn: (r) => r["_field"] == "app_layer_flow_ssh") |> filter(fn: (r) => r["host"] == "host") |> filter(fn: (r) => r["thread"] == "total") |> last()'
        const fluxObserver = {
            async next(row, tableMeta) {
                const o = tableMeta.toObject(row)
                /*
                console.log(
                  `${o._time} ${o._measurement} in ${o.region} (${o.sensor_id}): ${o._field}=${o._value}`)
                  */

                val = `${o._time} ${o._measurement} : ${o._field}=${o._value}`;
                hash = crypto.createHash('md5').update(val).digest('hex');
                console.log("Key/Value pair added to Redis database: ", hash, " / ", val,)


                //await client.connect();
                //await client.set(hash,val);
                //await setRedis(hash,val);
                key = hash;




                //client.quit();



                /*
                client.get(key, function(err, result) {
                      console.log("Value from key " + key + " : ", result.toString());
                      process.exit();
                  });
                */


            },
            error(error) {
                console.error(error)
                //console.log('\nFinished ERROR')
            },
            complete() {
                //console.log('\nFinished SUCCESS')
                //process.exit();
            }
        }

        try {


    
            client.on('connect', () => console.log(`Redis is connected on port ${REDIS_PORT}`))
            client.on("error", (error) => console.error(error))
            app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
            //module.exports = app

               

            const data = await queryApi.collectRows(fluxQuery)
            //data.forEach((x) => console.log(JSON.stringify(x)))
            data.forEach((x) => val = (JSON.stringify(x)))
            hash = crypto.createHash('md5').update(val).digest('hex');
            await client.connect();
            await client.set(hash, val);
            console.log("Key/Value pair added to Redis database: ", hash, " / ", val,);
            console.log('\nCollect ROWS SUCCESS');



            //Generate random id for the asset
            var id = Math.floor(Math.random() * 100000) + 1;
            id = id.toString();
            console.log('id, hash, val: ', id, hash, val);

            //Query to the blockchain
            try{
                query(method,id);
            }catch(error){
                console.log(error);
            }
            process.exit();

            
            

            

          } catch (e) {
            console.error(e);
            console.log('\nCollect ROWS ERROR');
          }


            try {
                await client.connect();
                //client.set(hash, val);
                //var key = hash;
            } catch(error){
                console.log(error)
            }
            finally {
                client.quit();
                console.log('client disconnected')
                process.exit();
                
            }
	} catch (error) {
		console.error(`An error has occurred: ${error}`)
	}
}

main();



