import addasset from '../../blockchain/asset-transfer-basic/application-javascript/addasset.js';
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
        //value = '{"result":"_result","table":0,"_start":"2022-10-24T08:06:55.062861884Z","_stop":"2022-10-24T08:07:05.062861884Z","_time":"2022-10-24T08:07:03.97922922Z","_value":2,"_field":"app_layer_flow_ssh","_measurement":"suricata","host":"host","thread":"total"}'

        addasset(method,id,key,value);

    }catch(error){
        console.log(error);
    }
}
    
main();