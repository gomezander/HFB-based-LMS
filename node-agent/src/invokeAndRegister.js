const invokeBchain = require('../../blockchain/asset-transfer-basic/application-javascript/invokeAndRegister.js')

async function main(){

    await invokeBchain();
    
    process.exit();
}

main();