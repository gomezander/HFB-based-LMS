# Service with Suricata, Telegraf, InfluxDB and Grafana

- [Service with Suricata, Telegraf, InfluxDB and Grafana](#service-with-suricata-telegraf-influxdb-and-grafana)
  - [Versions](#versions)
  - [Pre-requisites](#pre-requisites)
  - [Getting Started](#getting-started)
    - [Configure suricata](#configure-suricata)
      - [Configure suricata.yaml](#configure-suricatayaml)
        - [Global stats configuration](#global-stats-configuration)
        - [Eve-log configuration](#eve-log-configuration)
    - [Shared Socket volume](#shared-socket-volume)
    - [Mapped Ports](#mapped-ports)
    - [Grafana](#grafana)
      - [Data source on Grafana](#data-source-on-grafana)
    - [InfluxDB](#influxdb)
      - [Web Interface](#web-interface)
    - [Customizations](#customizations)
  - [How to Start](#how-to-start)

## Versions

* Suricata:          6.0.6
* InfluxDB:          2.3.0
* Telegraf (StatsD): 1.23.2
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

4. Configure `docker-compose.yaml` file, adding next line as volume:

    ```bash
      - ./suricata/rules:/var/lib/suricata/rules
    ```

5. Create `my-rules` file:

    ```bash
      - vim ~/composer-suri-tele-infl-graf/suricata/rules/my-rules
    ```

6. Add next rules:

    1. Ping detection
    
        ```bash
          alert icmp any any -> $HOME_NET any (msg:"ICMP connection attempt"; sid:1000002; rev:1;)
        ```

    2. SSH connections detection
    
        ```bash
          alert tcp any any -> $HOME_NET 22 (msg:"SSH connection attempt"; sid:1000003; rev:1;)
        ```

    3. Detects excessive packet forwarding to port 80 
    
        ```bash
          alert tcp any any -> $HOME_NET 80 (msg:"DDoS Unusually fast port 80 SYN packets outbound, Potential DDoS"; flags: S,12; threshold: type both, track by_dst, count 500, seconds 5; classtype:misc-activity; sid:6;)
        ```

7. Edit suricata configuration file:

    ```bash
    sudo vim ~/composer-suri-tele-infl-graf/suricata/suricata.yaml
    ```

8. Modify `default-rule-path` adding `path`, `community rules` and `personal rules`:

    ```bash
    default-rule-path: /var/lib/suricata/rules

    rule-files:
  
        - emerging-exploit.rules
  
        - my-rules
    ```

#### Configure suricata.yaml

##### Global stats configuration

```
# Global stats configuration
stats:
  enabled: yes
  # The interval field (in seconds) controls the interval at
  # which stats are updated in the log.
  interval: 8
  # Add decode events to stats.
  decoder-events: true
  # Decoder event prefix in stats. Has been 'decoder' before, but that leads
  # to missing events in the eve.stats records. See issue #2225.
  decoder-events-prefix: "decoder.event"
  # Add stream events as stats.
  stream-events: false
```

##### Eve-log configuration

```
- eve-log:
    enabled: yes
    filetype: unix_stream
    filename: /var/run/suricata/suricata-command.socket
    types:
      - stats:
          totals: yes       # stats for all threads merged together
          threads: yes       # per thread stats
          deltas: yes        # include delta values
      - alert:
         enabled: yes
         payload: yes
         metadata: yes
```

### Shared Socket volume

1. Give permissions to the shared volume for sockets

    ```bash
    sudo chmod 600 -R /var/run/shared/*
    ```

### Mapped Ports

```
Host		Container		Service

3000		3000			grafana
8086		8086		  	influxdb
8125		8125			statsd
```

### Grafana

Open <http://localhost:3000>

```
Username: admin
Password: admin
```

#### Data source on Grafana

InfluxDB data source is automatically provisioned with new Flux language support flag.

### InfluxDB

#### Web Interface

Open <http://localhost:8086>

```
Username: admin
Password: admin123456
Port: 8086
```

### Customizations

You can customize all settings in the attached config files, then you can stop and start the service in order to reload the new configurations.

## How to Start

In order to start the service the first time launch:

```
COMPOSE_PROFILES=grafana,telegraf docker compose up -d
```

You can replace `COMPOSE_PROFILES=grafana,telegraf` with the desired profiles to launch, you can launch only InfluxDB (default with no profiles).

To stop the service launch:

```
COMPOSE_PROFILES=grafana,telegraf docker compose down
```
