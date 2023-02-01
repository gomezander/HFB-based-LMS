var invoke = require('./invokeAndRegister');
var addasset = require('./addasset');
var queryall = require('./queryall');


function invoke(){
    return new Promise(function(resolve, reject){
        console.log("First");
        resolve();
    });
}

function addasset(){
    return new Promise(function(resolve, reject){
        console.log("Second");
        resolve();
    });
}

function queryall(){
    return new Promise(function(resolve, reject){
        console.log("Third");
        resolve();
    });
}


async function main(){

    invoke()
    .then(addasset())
    .then(queryall());


}
    
main();