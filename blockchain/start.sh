#!/bin/bash

# Get the options
while [ $# -gt 0 ] ; do
  case $1 in
    -u | --up)  
                cd ./test-network
                ./network.sh up createChannel -c mychannel -ca
                ./network.sh deployCC -ccn basic -ccp ../asset-transfer-basic/chaincode-javascript/ -ccl javascript
                cd ../../node-agent/src
                ls
                npm install
                node invokeAndRegister.js
                ;;
    -d | --down) 
                cd ./test-network
                ./network.sh down
                ;;
    #-a | --aarg) A="$2" ;;
    #-b | --barg) B="$2" ;;

  esac
  shift
done