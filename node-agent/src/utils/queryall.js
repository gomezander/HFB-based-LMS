import query from '../../../blockchain/asset-transfer-basic/application-javascript/query.js';

const method = 'GetAllAssets';
const id = 'appUser';

async function main(){
    try{
        query(method,id);
    }catch(error){
        console.log(error);
    }
}
    
main();