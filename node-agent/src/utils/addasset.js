import addasset from '../../../blockchain/asset-transfer-basic/application-javascript/addasset.js';
import randomWords from 'random-words';
const method = 'CreateAsset';



async function main(){
    try{

        var id = Math.floor(Math.random() * 100000) + 1;
        id=id.toString();
        console.log("Random generated id(1-100000): ",id);

        var key = randomWords(1);
        key=key.toString();
        console.log("Random key: ",key);
        var value = randomWords(1); 
        value=value.toString();
        console.log("Random value: ",value);

        addasset(method,id,key,value);

    }catch(error){
        console.log(error);
    }
}
    
main();