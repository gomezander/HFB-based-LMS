'use strict'
/** @module query 
 * Queries a data point in InfluxDB using the Javascript client library with Node.js.
**/

import { InfluxDB, Point } from '@influxdata/influxdb-client'

/** Environment variables **/
const url = process.env.INFLUX_URL || 'http://localhost:8086'
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
const fluxQuery = 'from(bucket: "mybucket") |> range(start:-1h) |> filter(fn: (r) => r["_measurement"] == "suricata") |> filter(fn: (r) => r["host"] == "d52817bd8c43") |> filter(fn: (r) => r["_field"] == "app_layer_flow_ssh") |> filter(fn: (r) => r["thread"] == "total") |> aggregateWindow(every: 10s, fn: mean, createEmpty: false) |> yield(name: "mean")'
const fluxObserver = {
  next(row, tableMeta) {
    const o = tableMeta.toObject(row)
    console.log(
      `${o._time} ${o._measurement} in ${o.region} (${o.sensor_id}): ${o._field}=${o._value}`
    )
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