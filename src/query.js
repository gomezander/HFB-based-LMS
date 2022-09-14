'use strict'
/** @module query 
 * Queries a data point in InfluxDB using the Javascript client library with Node.js.
**/

import { InfluxDB, Point } from '@influxdata/influxdb-client'

/** Environment variables **/
const url = process.env.INFLUX_URL || 'http://localhost:8086'
const token = process.env.INFLUX_TOKEN || 'myadmintoken'
const org = process.env.INFLUX_ORG || 'myorganization'






//Redis Connection
import express from 'express';
import redis from 'redis';
import crypto from 'crypto';
const app = express()
const PORT = process.env.PORT || 9000
const REDIS_PORT = process.env.REDIS_PORT || 6379
const REDIS_URL = process.env.REDIS_URL || "redis"
const client = redis.createClient({
    legacyMode: true,
    docket: {
        port: REDIS_PORT,
        host: REDIS_URL
    }
});

var val = 'log_value';
var hash = crypto.createHash('md5').update(val).digest('hex');


client.on('connect', () => console.log(`Redis is connected on port ${REDIS_PORT}`))
client.on("error", (error) => console.error(error))
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
//module.exports = app










/**
 * Instantiate the InfluxDB client
 * with a configuration object.
 *
 * Get a query client configured for your org.
 **/
const queryApi = new InfluxDB({url, token}).getQueryApi(org)

/** To avoid SQL injection, use a string literal for the query. */
const fluxQuery = 'from(bucket: "mybucket") |> range(start: -1h) |> filter(fn: (r) => r["_measurement"] == "suricata") |> filter(fn: (r) => r["_field"] == "app_layer_flow_ssh") |> filter(fn: (r) => r["host"] == "host") |> filter(fn: (r) => r["thread"] == "total") |> aggregateWindow(every: 10s, fn: mean, createEmpty: false) |> yield(name: "mean")'
const fluxObserver = {
  next(row, tableMeta) {
    const o = tableMeta.toObject(row)
    console.log(
      `${o._time} ${o._measurement} in ${o.region} (${o.sensor_id}): ${o._field}=${o._value}`)
      val = `${o._time} ${o._measurement} in ${o.region} (${o.sensor_id}): ${o._field}=${o._value}`;
      hash = crypto.createHash('md5').update(val).digest('hex');
      console.log("hash of", val, " : ", hash)

      client.set(hash,val);
      var key = hash;
      client.get(key, function(err, result) {
            console.log("Value from key " + key + " : ", result.toString());
        });
    
  },
  error(error) {
    console.error(error)
    console.log('\nFinished ERROR')
  },
  complete() {
    console.log('\nFinished SUCCESS')
  }
}


/** Execute a query and receive line table metadata and rows. */
queryApi.queryRows(fluxQuery, fluxObserver)





