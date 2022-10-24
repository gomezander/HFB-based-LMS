#!/usr/bin/bash

# Get the options
while [ $# -gt 0 ] ; do
  case $1 in
    -u | --up)  
                sudo rm -r -f /var/run/shared
                sudo mkdir -p /var/run/shared
                sudo chmod -R 777 /var/run/shared/
                #docker build -t nodeagent -f node-agent/Dockerfile .
                docker compose build
                COMPOSE_PROFILES=influx,telegraf docker compose up -d
                COMPOSE_PROFILES=suricata,grafana,redis docker compose up -d
                #COMPOSE_PROFILES=node-agent docker compose up
                ;;
    -d | --down) 
                COMPOSE_PROFILES=influx,telegraf,suricata,grafana,redis docker compose down
                #COMPOSE_PROFILES=node-agent docker compose down
                ;;
    #-a | --aarg) A="$2" ;;
    #-b | --barg) B="$2" ;;

  esac
  shift
done


















while getopts ":ud" option; do
   case $option in
      u) # deploy all containers
        echo " Deploying all containers... "
            sudo rm -r -f /var/run/shared
            sudo mkdir -p /var/run/shared
            sudo chmod -R 777 /var/run/shared/
            COMPOSE_PROFILES=influx,telegraf docker compose up -d
            COMPOSE_PROFILES=suricata,grafana docker compose up -d
         exit;;
      d) # bring down all containers
         echo " Deploying all containers... "
            sudo rm -r -f /var/run/shared
            sudo mkdir -p /var/run/shared
            sudo chmod -R 777 /var/run/shared/
            COMPOSE_PROFILES=influx,telegraf docker compose up -d
            COMPOSE_PROFILES=suricata,grafana docker compose up -d
         exit;;

   esac
   
done





echo $0 # Script name
echo $1 # 1st parameter
echo $2 # 2nd parameter
echo $3 # 3rd parameter

