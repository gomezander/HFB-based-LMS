'use strict'
/** @module query 
 * Queries a data point in InfluxDB using the Javascript client library with Node.js.
**/

const { InfluxDB, Point } = require('@influxdata/influxdb-client');

/** Environment variables **/
const url = process.env.INFLUX_URL || 'http://localhost:8086' //change localhost to influxdb when using docker
const token = process.env.INFLUX_TOKEN || 'myadmintoken'
const org = process.env.INFLUX_ORG || 'myorganization'

/**
 * Instantiate the InfluxDB client
 * with a configuration object.
 *
 * Get a query client configured for your org.
 **/
const queryApi = new InfluxDB({url, token}).getQueryApi(org)

/** To avoid SQL injection, use a string literal for the query. */
const fluxQuery = 'from(bucket: "mybucket") |> range(start: -10s) |> filter(fn: (r) => r["_measurement"] == "suricata") |> filter(fn: (r) => r["_field"] == "app_layer_flow_ssh") |> filter(fn: (r) => r["host"] == "host") |> filter(fn: (r) => r["thread"] == "total") |> last()';

var val;


module.exports =  async function queryInflux(query){

    try{
        
        const fluxObserver = {
            next(row, tableMeta) {
              const o = tableMeta.toObject(row)
              val = `${o._time} ${o._measurement} : ${o._field}=${o._value}`;
              console.log(
                val
              );
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
        queryApi.queryRows(query, fluxObserver);
        const data =  await queryApi.collectRows(query)
        //data.forEach((x) => console.log(JSON.stringify(x)))
        data.forEach((x) => val = (JSON.stringify(x)));
        console.log(val);

        return val;
    }catch(error){
        console.log(error);
    }

}





