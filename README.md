# Service with Suricata, Telegraf, InfluxDB and Grafana

## Versions

### Warning: UPGRADE FROM OLDER VERSIONS TO VERSION 3.0.0 IS NOT POSSIBLE, SEE CHANGELOG.MD

* Main version:      3.0.0
* InfluxDB:          2.1.1
* Telegraf (StatsD): 1.21
* Postgres:          14.2.0
* Grafana:           8.4.3


## Pre-requisites
- Download and install the latest available version of [Docker](https://docs.docker.com/engine/install/ubuntu/)
- Download and install the latest available version of [Docker Compose](https://docs.docker.com/compose/install/)
- Configure [Docker as non root](https://docs.docker.com/engine/install/linux-postinstall/)

## Getting Started

### Configure suricata

*The following settings have already been made, so they should be followed in case new rules are added or updated.*

1. Download rules from the community:

    ```bash
    wget http://rules.emergingthreats.net/open/suricata/emerging.rules.tar.gz
    ```

2. Unzip the rules

    ```bash
    tar zxvf emerging.rules.tar.gz
    ```

3. Move `~/rules` folder to `~/composer-suri-tele-infl-graf/suricata/`

    ```bash
    sudo mv rules /var/lib/suricata/
    ```

4. Configure `docker-compose.yaml` file

### Mapped Ports

    ```bash
    Host		Container		Service

    3000		3000			grafana
    8086		8086		  	influxdb
    8125		8125			statsd
    ```

### Grafana

Open <http://localhost:3000>

    ```bash
    Username: admin
    Password: admin
    ```

#### Data source on Grafana

InfluxDB data source is automatically provisioned with new Flux language support flag.

### InfluxDB

#### Web Interface

    Open <http://localhost:8086>

    ```bash
    Username: admin
    Password: admin123456
    Port: 8086
    ```

### Customizations

You can customize all settings in the attached config files, then you can stop and start the service in order to reload the new configurations.

## How to Start

In order to start the service the first time launch:

    ```sh
    COMPOSE_PROFILES=grafana,telegraf docker compose up -d
    ```

You can replace `COMPOSE_PROFILES=grafana,telegraf` with the desired profiles to launch, you can launch only InfluxDB (default with no profiles).

To stop the service launch:

    ```sh
    COMPOSE_PROFILES=grafana,telegraf docker compose down
    ```
