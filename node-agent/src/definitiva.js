import queryInflux from './utils/queryInflux.js';
import addToRedis from './utils/addToRedis.js';

import queryBchain from '../../blockchain/asset-transfer-basic/application-javascript/query.js';
import addasset from '../../blockchain/asset-transfer-basic/application-javascript/addasset.js';

const queryFlux = 'from(bucket: "mybucket") |> range(start: -10s) |> filter(fn: (r) => r["_measurement"] == "suricata") |> filter(fn: (r) => r["_field"] == "app_layer_flow_ssh") |> filter(fn: (r) => r["host"] == "host") |> filter(fn: (r) => r["thread"] == "total") |> last()';

const method1 = 'CreateAsset';

const method2 = 'GetAllAssets';
const id = 'appUser';



async function main(){
    let res = await queryInflux(queryFlux);
    console.log('\nResultado: ', res);

    let key = await addToRedis(res);

    //Create random ID between 1 and 100000
    let assetId = Math.floor(Math.random() * 100000) + 1;
    assetId=assetId.toString();

    await addasset(method1, assetId, key, res);

    //await queryBchain(method2, id);
    
    process.exit();
}

main();