const queryInflux = require('./utils/queryInflux.js');
const addToRedis = require('./utils/addToRedis.js');

const queryBchain = require('../../blockchain/asset-transfer-basic/application-javascript/query.js');
const addassetBchain = require('../../blockchain/asset-transfer-basic/application-javascript/addasset.js');
const invokeBchain = require('../../blockchain/asset-transfer-basic/application-javascript/invokeAndRegister.js')

const queryFlux = 'from(bucket: "mybucket") |> range(start: -10s) |> filter(fn: (r) => r["_measurement"] == "suricata") |> filter(fn: (r) => r["_field"] == "app_layer_flow_ssh") |> filter(fn: (r) => r["host"] == "host") |> filter(fn: (r) => r["thread"] == "total") |> last()';

const method1 = 'CreateAsset';

const method2 = 'GetAllAssets';
const id = 'appUser';

var cron = require('node-cron');





async function main(){
    let res = await queryInflux(queryFlux);
    console.log('\nResultado: ', res);

    let key = await addToRedis(res);

    //Create random ID between 1 and 100000
    let assetId = Math.floor(Math.random() * 100000) + 1;
    assetId=assetId.toString();

    await invokeBchain();

    await addassetBchain(method1, assetId, key, res);

    //await queryBchain(method2, id);
    
    //process.exit();
}

main();

cron.schedule("*/15 * * * * *", function () {
    console.log("---------------------");
    console.log("running a task every 15 seconds");
    main();
  });