const queryBchain = require('../../blockchain/asset-transfer-basic/application-javascript/query.js');

const invokeBchain = require('../../blockchain/asset-transfer-basic/application-javascript/invokeAndRegister.js')

const method2 = 'GetAllAssets';
const id = 'appUser';

async function main(){

    await invokeBchain();

    await queryBchain(method2, id);
    
    process.exit();
}

main();