# Riassunto Integrato d'Esame: Esperienze di Laboratorio e Pratica di Rete (Lezioni 11, 21-24)

> **Materia**: Reti Wireless · **Docente**: Prof. Mauro Femminella  
> **Lezioni di Riferimento**: Lezione 11 (29 marzo - SDR/srsRAN), Lezione 21 (5 maggio - REST), Lezione 22 (12 maggio - MQTT), Lezione 23 (17 maggio - Wi-Fi/hostapd/iptables), Lezione 24 (19 maggio - tc/Node-RED)  
> **Scopo della Nota**: Sintesi analitica di tutte le architetture, comandi, configurazioni e sperimentazioni pratiche di laboratorio con focus esplicito sulle **domande tipiche e informazioni chiave per l'esame orale**.

---

## 🧭 Quadro Sinottico delle Esperienze Pratiche di Laboratorio

```text
========================================================================================================================
                          PANORAMICA DEI LABORATORI PRATICI (PROF. MAURO FEMMINELLA)
========================================================================================================================

 [LAB 1: SOFTWARE-DEFINED RADIO ED LTE APERTO (LEZ. 11)]
  ├── Hardware Front-End: USRP (Universal Software Radio Peripheral) collegato via USB 3.0 / Gigabit Ethernet
  ├── Piattaforma srsRAN: Suite open-source completa (srsEPC su Core Network, srsENB su Radio, srsUE su client)
  ├── Procedura di Initial Attach: Terminale commerciale reale con USIM programmabile (IMSI, Ki, OP/OPc su user_db.csv)
  ├── Stack LTE Reale: Interfaccia virtuale tun_srsenb, mutua autenticazione EPS-AKA, tunnel GTP-U e NAT con iptables
  └── Ispezione Wireshark & Throughput: Analisi tracce S1AP, messaggi NAS e test di saturazione CPU per decodifica radio
         │
         ▼
 [LAB 2: WEB SERVICES IoT E TEST API REST CON POSTMAN (LEZ. 21)]
  ├── Mock Server Linux: Avvio di json-server su file db.json (simulazione istantanea di risorse sensori/attuatori)
  ├── Operazioni CRUD Postman: GET (interrogazione), POST (creazione risorsa), PUT/PATCH (aggiornamento), DELETE
  └── Query Avanzate: Filtraggio con operatori logici (_gte, _lte), ordinamento (_sort, _order) e paginazione (_page, _limit)
         │
         ▼
 [LAB 3: TELEMETRIA IoT CON BROKER MQTT ED EXPLORER (LEZ. 22)]
  ├── Broker Pubblico & Locale: Connessione a HiveMQ / Mosquitto client su porta 1883
  ├── Routing dei Topic: Test empirico delle Wildcard singola ('+') e multilivello ('#')
  ├── Verifica dei Livelli di QoS: Tracciamento pacchetti PUBACK (QoS 1) e handshake a 4 vie PUBREC/PUBREL/PUBCOMP (QoS 2)
  └── Gestione dello Stato: Verifica di Retained Messages (lettura immediata) e crash del client con Last Will (LWT)
         │
         ▼
 [LAB 4: MONITORING WI-FI E ACCESS ROUTER LINUX (LEZ. 23)]
  ├── Gestione Radio Wi-Fi: Comandi iw (dev scan) per scansione spettrale canali 2.4/5 GHz e decodifica Beacon Frame
  ├── Modalità Monitor (Promiscua): iw dev wlan0 set type monitor -> Cattura Wireshark con header Radiotap (RSSI, MCS)
  ├── Costruzione Access Point: Demone hostapd (configurazione canale, SSID, sicurezza WPA2-PSK con crittografia CCMP)
  └── Configurazione Router: IP statico su wlan0, server isc-dhcp-server per rilascio lease IP ed abilitazione IP Forwarding
         │
         ▼
 [LAB 5: FIREWALL IPTABLES, TRAFFIC SHAPING E NODE-RED (LEZ. 24)]
  ├── Firewall Linux Netfilter: Tabelle filter e nat, catene PREROUTING/POSTROUTING, regola di NAT Masquerading su eth0
  ├── Politiche di Filtraggio: Differenza critica tra DROP (silenzio e timeout TCP) e REJECT (invio TCP RST/ICMP unreachable)
  ├── Traffic Shaping nel Kernel: Algoritmo Token Bucket Filter (TBF) con comando tc (rate, burst, limit) e test iperf3
  └── Bridging IoT con Node-RED: Flusso event-driven MQTT-In -> Function (parsing JSON) -> HTTP Request verso json-server
========================================================================================================================
```

---

## 1. Laboratorio SDR con srsRAN e Front-End USRP (Lezione 11, 29 Marzo)

### A. Architettura del Banco di Prova
* **Front-End Hardware (USRP)**: apparato RF Software-Defined Radio (es. Ettus B210) che converte il segnale radio a radiofrequenza ($2.6\text{ GHz}$ LTE Band 7) in campioni in banda base complessi **I/Q** campionati a $30.72\text{ MS/s}$, trasferiti al PC host tramite interfaccia USB 3.0 ad alta velocità.
* **Piattaforma srsRAN**: suite software modulare C++ che gira interamente sulla CPU del calcolatore:
  1. **`srsEPC`**: emula tutti i nodi della Core Network LTE (MME per segnalazione NAS, S-GW e P-GW per trasporto dati, HSS locale basato su file di testo `user_db.csv`).
  2. **`srsENB`**: emula la stazione radio base eNodeB implementando tutti i livelli dell'interfaccia radio (PHY OFDMA/SC-FDMA, MAC scheduler, RLC, PDCP cifrato e RRC).
  3. **`srsUE`**: emulatore software di terminale utente su PC secondario.

### B. Procedura di Initial Attach e SIM Programmabile
* Per collegare uno smartphone commerciale reale (es. Android/iPhone) all'eNodeB srsRAN, si utilizza una **USIM card programmabile**:
  * Sul file `user_db.csv` di srsEPC vengono configurate le credenziali segrete dell'utente:
    ```csv
    # Name, IMSI, Key (K), Auth (OP/OPc), IP statically allocated
    user01, 001010123456789, 465B5CE8B199B49FAA5F0A2EE238A6BC, OPc, E8877F956EE8023E51F8081772B3E90F, 172.16.0.2
    ```
* **Fasi osservate su terminale e Wireshark**:
  1. *Rilevamento Cella*: lo smartphone aggancia la frequenza impostata (EARFCN) e riceve i blocchi informativi MIB e SIB2 trasmessi da `srsENB`.
  2. *Attivazione Canale Radio*: invio del preambolo PRACH (Procedura RACH a 4 vie) e configurazione dell'RRC Connection.
  3. *Messaggi NAS*: scambio del messaggio di *Attach Request* contenente l'IMSI.
  4. *Autenticazione EPS-AKA*: srsEPC invia la sfida casuale `RAND` e il token di autenticazione di rete `AUTN`; la SIM calcola la risposta `RES` e verifica la rete; all'esito positivo deriva la chiave $K_{\text{ASME}}$.
  5. *Security Mode Command*: cifratura e protezione d'integrità attivate su interfaccia radio via AES/SNOW-3G.
  6. *Default EPS Bearer*: creazione dell'interfaccia virtuale `tun_srsenb` sul sistema operativo host con assegnazione IP privato (172.16.0.2) al terminale.

### C. Instradamento IP, NAT e Throughput
* Per permettere allo smartphone connesso in 4G di navigare su Internet attraverso la connessione cablata del laboratorio (eth0), il docente configura nel kernel Linux la regola di **NAT Masquerading**:
  ```bash
  iptables -t nat -A POSTROUTING -s 172.16.0.0/24 -o eth0 -j MASQUERADE
  sysctl -w net.ipv4.ip_forward=1
  ```
* **Misure con iPerf e Carico Computazionale**:
  * La decodifica in tempo reale dei codici Turbo a livello fisico su CPU richiede un'elaborazione intensiva: con una larghezza di banda LTE di $10\text{ MHz}$ (50 Resource Block), la CPU lavora a oltre l'80% di carico.

---

## 2. Laboratorio Web Services IoT con json-server e Postman (Lezione 21, 5 Maggio)

### A. Avvio del Server RESTful Mock
* Per simulare un backend IoT senza dover sviluppare un intero server applicativo, viene impiegato **`json-server`** (ambiente Node.js) operante su un file locale `db.json`:
  ```bash
  json-server --watch db.json --port 3000 --host 0.0.0.0
  ```
* Struttura del database documentale `db.json`:
  ```json
  {
    "sensori": [
      { "id": 1, "tipo": "temperatura", "stanza": "lab1", "valore": 22.4, "unita": "C" },
      { "id": 2, "tipo": "umidita", "stanza": "lab1", "valore": 55.0, "unita": "%" }
    ],
    "attuatori": [
      { "id": 1, "nome": "valvola_termica", "stato": "APERTA", "livello": 70 }
    ]
  }
  ```

### B. Esecuzione delle Operazioni CRUD con Postman
Il docente illustra come manipolare i dati dei sensori attraverso l'interfaccia grafica di Postman:
1. **GET `/sensori`**: restituisce l'array JSON di tutti i sensori (Codice di stato: `200 OK`).
2. **GET `/sensori/1`**: restituisce il singolo oggetto con id 1.
3. **POST `/sensori`**: crea un nuovo sensore sul server:
   * Header: `Content-Type: application/json`
   * Body: `{"tipo": "pressione", "stanza": "lab2", "valore": 1013.25, "unita": "hPa"}`
   * Risposta: `201 Created` con assegnazione automatica del campo `id: 3` e header `Location: /sensori/3`.
4. **PUT `/sensori/1`**: sovrascrittura totale dello stato della risorsa. Se si omettono campi (es. si invia solo il valore), i vecchi campi non specificati vengono eliminati.
5. **PATCH `/sensori/1`**: aggiornamento parziale. Modifica solo il valore lasciando intatti tipo, stanza e unità.
6. **DELETE `/sensori/2`**: rimozione del sensore di umidità (Codice: `200 OK` o `204 No Content`).

### C. Query Avanzate di Filtraggio e Paginazione
`json-server` implementa le query string REST standard:
* **Filtro esatto**: `GET /sensori?stanza=lab1`
* **Operatori di confronto**: `GET /sensori?valore_gte=20&valore_lte=25` (valori compresi tra 20 e 25).
* **Ordinamento**: `GET /sensori?_sort=valore&_order=desc`
* **Paginazione**: `GET /sensori?_page=1&_limit=5` (indispensabile per MCU IoT con poca memoria che non possono allocare liste con migliaia di elementi).

---

## 3. Laboratorio Telemetria IoT con Broker MQTT (Lezione 22, 12 Maggio)

### A. Configurazione del Client e Routing dei Topic
* Viene utilizzato il broker pubblico **HiveMQ** (`broker.hivemq.com` porta 1883) oppure un broker locale **Mosquitto** (`mosquitto -v`).
* Attraverso client CLI (`mosquitto_sub`, `mosquitto_pub`) e tool grafici (**MQTT Explorer**), si dimostra l'alberatura dei topic:
  * Publisher 1: `pub -t "unipg/ingegneria/edificioB/lab1/temp" -m "21.8"`
  * Publisher 2: `pub -t "unipg/ingegneria/edificioB/lab2/temp" -m "23.1"`
* **Verifica delle Wildcard**:
  * Sottoscrizione con `+`: `sub -t "unipg/ingegneria/edificioB/+/temp"` $\rightarrow$ riceve le misure da entrambi i laboratori (`lab1` e `lab2`).
  * Sottoscrizione con `#`: `sub -t "unipg/ingegneria/#"` $\rightarrow$ cattura qualsiasi telemetria dell'intera facoltà.

### B. Verifica Sperimentale dei Livelli di QoS
* **QoS 0**: invio del pacchetto `PUBLISH` senza alcun riscontro. Se il broker viene spento durante l'invio, il messaggio va perso senza alcuna notifica.
* **QoS 1**: il publisher invia `PUBLISH` con ID; il broker risponde con **`PUBACK`**. Su Wireshark si osserva il ri-invio del messaggio con il flag DUP se si intercetta o ritarda il riscontro.
* **QoS 2**: ispezione dell'handshake a 4 messaggi:
  `PUBLISH -> PUBREC -> PUBREL -> PUBCOMP`. Nessun messaggio duplicato viene consegnato all'applicazione subscriber.

### C. Verifica Sperimentale di Retain e Last Will (LWT)
1. **Messaggi Retained (`-r`)**:
   * Si pubblica un messaggio con flag retain attivo: `pub -t "unipg/lab/luci" -m "ACCESE" -r`.
   * Si apre un nuovo client subscriber in un secondo momento: riceve **immediatamente** `"ACCESE"` all'istante dell'iscrizione.
2. **Last Will and Testament (LWT)**:
   * Si collega un client specificando il testamento:
     `mosquitto_sub -t "canale/dati" --will-topic "unipg/lab/nodo1/status" --will-payload "DEAD" --will-qos 1 --will-retain`
   * Si termina bruscamente il processo client con `kill -9`:
   * Non appena il broker rileva la caduta della connessione TCP (o scade il Keep-Alive), **pubblica istantaneamente su `unipg/lab/nodo1/status` il payload `"DEAD"`**, informando tutta la rete del guasto.

---

## 4. Laboratorio Wi-Fi Linux: Monitoring, hostapd e Router (Lezione 23, 17 Maggio)

### A. Gestione della Scheda Wi-Fi con lo Strumento Moderno `iw`
Il docente evidenzia che i comandi `iwconfig` e `wireless-tools` sono obsoleti; lo standard de facto moderno in Linux è **`iw`** (basato su interfaccia `nl80211` del kernel):
```bash
# Mostra le interfacce fisiche e le capacità radio supportate (frequenze, potenze, MCS)
iw list

# Informazioni sull'interfaccia corrente
iw dev wlan0 info

# Scansione spettrale delle reti nell'etere
iw dev wlan0 scan
```

### B. Decodifica dei Beacon Frame
L'output di `iw dev scan` mostra l'ispezione analitica dei campi del **Beacon Frame**:
* **BSSID**: indirizzo MAC dell'antenna AP.
* **SSID**: nome della rete (es. 'eduroam', 'WiFi-Dipartimento').
* **DS Parameter Set**: canale radio operativo (es. canale 6 a $2437\text{ MHz}$).
* **Supported Rates**: bit rate negoziabili per la modulazione (es. 1, 2, 5.5, 11, 6, 9, 12 ... 54 Mbps).
* **RSN IE (Information Element)**: parametri di sicurezza (WPA2 con CCMP e autenticazione 802.1X o PSK).

### C. Modalità Monitor e Analisi Wireshark con Radiotap
* Per intercettare il traffico radio "over-the-air" senza essere associati ad alcuna rete:
  ```bash
  # Spegne temporaneamente l'interfaccia
  ip link set wlan0 down
  # Commuta la scheda in modalità Monitor
  iw dev wlan0 set type monitor
  # Riattiva l'interfaccia
  ip link set wlan0 up
  ```
* **Cosa si osserva su Wireshark**:
  * In modalità monitor la scheda cattura **tutte le trame 802.11 pure**: Management (Beacon, Probe, Association), Control (RTS, CTS, ACK) e Data.
  * In cima a ogni frame Wireshark visualizza l'**Header Radiotap**: un'intestazione sintetica aggiunta dal driver Linux che riporta parametri fisici della scheda radio:
    * Frequenza del canale ($2412\text{ MHz}$)
    * Potenza del segnale ricevuto (**RSSI**, es. $-65\text{ dBm}$)
    * Rumore di fondo (*Noise*, es. $-95\text{ dBm}$)
    * Rapporto segnale-rumore (**SNR**, $30\text{ dB}$)
    * Modulazione e schema di codifica (**MCS index**).

### D. Configurazione dell'Access Point Software con `hostapd`
Per trasformare il PC Linux in una stazione base Access Point Wi-Fi per i terminali del laboratorio:
* File di configurazione `/etc/hostapd/hostapd.conf`:
  ```ini
  interface=wlan0
  driver=nl80211
  ssid=Lab_Wireless_Femminella
  hw_mode=g
  channel=6
  macaddr_acl=0
  auth_algs=1
  ignore_broadcast_ssid=0
  
  # Configurazione di Sicurezza WPA2-Personal
  wpa=2
  wpa_passphrase=PasswordSicura2022!
  wpa_key_mgmt=WPA-PSK
  rsn_pairwise=CCMP
  ```
* Avvio dell'AP con debug: `hostapd -dd /etc/hostapd/hostapd.conf`

### E. Configurazione di Rete: IP Statico, DHCP ed IP Forwarding
1. **Assegnazione IP all'interfaccia AP**:
   ```bash
   ip addr add 192.168.10.1/24 dev wlan0
   ```
2. **Server DHCP (`isc-dhcp-server`)**:
   Configurazione del file `/etc/dhcp/dhcpd.conf` per assegnare gli indirizzi IP ai client Wi-Fi:
   ```ini
   subnet 192.168.10.0 netmask 255.255.255.0 {
       range 192.168.10.10 192.168.10.100;
       option routers 192.168.10.1;
       option domain-name-servers 8.8.8.8, 1.1.1.1;
       default-lease-time 600;
       max-lease-time 7200;
   }
   ```
3. **Abilitazione Routing nel Kernel**:
   ```bash
   sysctl -w net.ipv4.ip_forward=1
   ```

---

## 5. Laboratorio Firewall iptables, Traffic Shaper e Node-RED (Lezione 24, 19 Maggio)

### A. Netfilter e Regole iptables per l'Access Router
Il kernel Linux smista i pacchetti attraverso il modulo **Netfilter**:

```text
                       [ INGRESSO: wlan0 ]
                               │
                               ▼
                       ┌───────────────┐
                       │  PREROUTING   │ (Tabella nat / conntrack)
                       └───────┬───────┘
                               │
                 Decisione di Routing del Kernel
                               ├────────────────────────┐ (Destinato al PC locale)
                               │                        ▼
                               │                ┌───────────────┐
                               │                │     INPUT     │
                               │                └───────┬───────┘
                               │                        ▼
                               │                [ Processo Locale ]
                               │                        │
                               │                        ▼
                               │                ┌───────────────┐
                               │                │    OUTPUT     │
                               │                └───────┬───────┘
                               │                        │
                               ▼                        │
                       ┌───────────────┐                │
                       │    FORWARD    │◄───────────────┘
                       └───────┬───────┘
                               │
                               ▼
                       ┌───────────────┐
                       │  POSTROUTING  │ (Tabella nat: MASQUERADE)
                       └───────┬───────┘
                               │
                               ▼
                       [ USCITA: eth0 ]
```

1. **Regola di NAT Masquerading**:
   ```bash
   iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
   ```
   Questa singola riga di comando permette a tutti gli smartphone e PC connessi alla rete wireless (subnet `192.168.10.0/24`) di condividere l'unico indirizzo IP pubblico presente sull'interfaccia cablata `eth0`.
2. **Filtraggio Pacchetti: DROP vs REJECT (Domanda Classica d'Esame)**:
   * **`DROP`**: il firewall distrugge il pacchetto silenziosamente senza generare alcuna risposta.
     * *Comportamento del client*: il client crede che il pacchetto sia andato smarrito per congestione; ritrasmette più volte ed entra in attesa fino allo scadere del timeout TCP (RTO, decine di secondi), bloccando l'interfaccia utente.
   * **`REJECT`**: il firewall scarta il pacchetto ma invia contestualmente un messaggio di notifica al mittente:
     * Per connessioni TCP: invia un pacchetto **`TCP RST` (Reset)**.
     * Per traffico UDP: invia un messaggio **`ICMP Port Unreachable`** (Tipo 3, Codice 3).
     * *Comportamento del client*: il socket del client viene chiuso **all'istante**, l'applicazione riceve immediatamente l'errore (*Connection Refused*) senza attendere alcun timeout.
3. **Ordinamento delle Regole (First-Match Rule)**:
   Le regole di iptables vengono valutate in ordine strettamente sequenziale dall'alto verso il basso:
   * Se si deve bloccare la navigazione web a un client lasciando attiva la risoluzione dei nomi e l'assegnazione IP:
     ```bash
     # 1. Permetti il traffico DNS (porta 53)
     iptables -A FORWARD -p udp --dport 53 -j ACCEPT
     iptables -A FORWARD -p tcp --dport 53 -j ACCEPT
     # 2. Poi blocca tutto il resto verso la subnet
     iptables -A FORWARD -s 192.168.10.50 -j DROP
     ```
   * Se si invertisse l'ordine mettendo prima il `DROP`, anche le richieste DNS verrebbero scartate e la rete risulterebbe del tutto non funzionante.

### B. Traffic Shaping nel Kernel con Linux Traffic Control (`tc`)
Il docente illustra come controllare la banda e la latenza dei pacchetti nel kernel Linux:
* **Differenza concettuale tra algoritmi**:
  * **Leaky Bucket (Secchio con Buco)**: accumula pacchetti a monte e li rilascia a valle a una velocità rigidamente costante, azzerando le raffiche ma introducendo ritardi elevati.
  * **Token Bucket Filter (TBF)**: i token vengono generati a una velocità fissa $r$ e accumulati in un secchio di capienza $B$. Un pacchetto di dimensione $L$ può transitare immediatamente solo se nel secchio sono presenti almeno $L$ token. Consente di **assorbire le raffiche (*burst*) senza ritardo**, limitando la velocità media a lungo termine a $r$.
* **Comando `tc` per strozzare la banda**:
  ```bash
  # Applica un Traffic Shaper TBF sull'interfaccia wireless wlan0
  tc qdisc add dev wlan0 root tbf rate 1mbit burst 32kbit latency 400ms
  ```
  * `rate 1mbit`: velocità media massima imposta.
  * `burst 32kbit`: ampiezza del bucket per tollerare brevi raffiche.
  * `latency 400ms` (o `limit`): dimensione massima del buffer di coda; se la coda si riempie oltre questo tempo, i pacchetti in eccesso vengono scartati (*tail drop*).
* **Verifica con iPerf3**: avviando `iperf3 -c 192.168.10.1` dal terminale client prima e dopo il comando, si osserva graficamente il throughput che crolla esattamente a $1.00\text{ Mbps}$ con un aumento del jitter e della latenza di ping dovuti al buffering (*Bufferbloat*).

### C. Bridging IoT Flow-Based con Node-RED
* **Node-RED**: piattaforma open-source sviluppata da IBM su Node.js, basata su un modello di programmazione a flusso (*flow-based programming*), orientata a eventi:
* **Costruzione del Flusso di Laboratorio**:
  1. *Nodo MQTT-In*: si connette al broker HiveMQ e sottoscrive il topic `unipg/sensori/+/temperatura`.
  2. *Nodo Function (JavaScript)*: riceve l'oggetto messaggio, estrae la temperatura e la rimappa nel formato atteso dal database REST:
     ```javascript
     var tempVal = parseFloat(msg.payload);
     msg.payload = {
         "tipo": "temperatura",
         "valore": tempVal,
         "timestamp": Date.now()
     };
     msg.headers = { "Content-Type": "application/json" };
     return msg;
     ```
  3. *Nodo HTTP-Request*: esegue una chiamata `POST` verso `http://localhost:3000/sensori` salvando il dato su `json-server`.
  4. *Nodo Debug*: visualizza nella console laterale l'esito della chiamata.

---

## 🎯 INFORMAZIONI CHIAVE E DOMANDE TIPICHE D'ESAME SUL LABORATORIO

Durante il colloquio orale, il Prof. Femminella interroga molto spesso sulle esperienze di laboratorio per verificare se lo studente possiede consapevolezza ingegneristica pratica e non solo formule a memoria. Ecco le domande classiche:

### 1. "A cosa serve la regola `MASQUERADE` su iptables e in quale catena va inserita?"
* **Risposta Attesa**: Va inserita tassativamente nella catena **`POSTROUTING`** della tabella **`nat`** (`iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE`). Serve ad attuare il Network Address Translation (NAT) dinamico: quando i pacchetti provenienti dalla rete privata wireless (con indirizzi sorgente `192.168.10.X`) escono verso Internet attraverso l'interfaccia Ethernet (`eth0`), il kernel sostituisce l'indirizzo IP privato sorgente con l'indirizzo IP pubblico/laboratorio di `eth0` e rimappa i numeri di porta TCP/UDP. Senza questa regola, i pacchetti uscirebbero su Internet con IP privato e i router esterni li scarterebbero all'istante (RFC 1918), rendendo impossibile la ricezione delle risposte.

### 2. "Qual è la differenza tra l'azione DROP e l'azione REJECT in un firewall?"
* **Risposta Attesa**: 
  * `DROP` distrugge il pacchetto in modo completamente silente, senza avvisare il mittente. Il mittente rimane in attesa credendo che il pacchetto sia andato perso per congestione, continuando a ritrasmettere fino alla scadenza del timeout dell'applicazione o del protocollo TCP (che può richiedere decine di secondi o minuti).
  * `REJECT` scarta il pacchetto ma genera una risposta immediata verso il mittente: invia un pacchetto `TCP RST` per connessioni TCP o un messaggio `ICMP Port Unreachable` per UDP. In questo modo il client sa all'istante che la porta è chiusa o l'accesso è vietato e abortisce subito la connessione senza subire ritardi di timeout.

### 3. "Cosa vede Wireshark quando la scheda di rete wireless viene impostata in modalità Monitor?"
* **Risposta Attesa**: In modalità normale (Managed o AP), la scheda di rete esegue il filtraggio hardware degli indirizzi MAC, scarta i pacchetti con errori FCS e decapsula la trama 802.11 presentandola al sistema operativo come un comune pacchetto Ethernet di Livello 2.
  In **Modalità Monitor** (`type monitor`), il chip radio disattiva qualunque filtraggio e inoltra allo stack del kernel **tutte le trame trasmesse via etere su quel canale**, incluse le trame di controllo (RTS, CTS, ACK), le trame di gestione (Beacon, Probe, Deauthentication) e i frame con CRC errato. Inoltre, Wireshark visualizza l'**Header Radiotap**, che fornisce le grandezze fisiche rilevate dall'antenna (potenza ricevuta RSSI in dBm, SNR, frequenza e schema di modulazione/MCS).

### 4. "Come funziona il Token Bucket Filter (TBF) del comando `tc` e cosa rappresentano `rate`, `burst` e `latency`?"
* **Risposta Attesa**: Il TBF è un algoritmo di traffic shaping che accumula gettoni (*tokens*) in un secchio virtuale a una frequenza prefissata pari a `rate`. Ciascun byte trasmesso consuma un gettone. Se il secchio è pieno (capienza definita da `burst`), un flusso dati può scaricare un picco di traffico alla massima velocità dell'interfaccia senza alcun ritardo (*burst tolerance*). Quando i token si esauriscono, i pacchetti in arrivo vengono accodati in un buffer di memoria la cui ampiezza massima è regolata da `latency` o `limit`. Se il buffer si satura, i pacchetti successivi vengono scartati. Rispetto al Leaky Bucket (che appiattisce rigidamente il flusso a velocità costante), il TBF permette la trasmissione immediata di brevi raffiche tipiche del traffico Web e interattivo.

### 5. "Cosa contiene il file `user_db.csv` in srsRAN e perché è fondamentale per l'Attach LTE?"
* **Risposta Attesa**: Contiene il database delle utenze dell'Home Subscriber Server (HSS). Per ciascun terminale memorizza l'identificativo internazionale permanente **IMSI**, la chiave segreta simmetrica **$K$ (a 128 bit)** e il parametro dell'operatore **OP o OPc**. È fondamentale perché durante l'Initial Attach, l'EPC e la SIM dello smartphone devono eseguire la mutua autenticazione EPS-AKA: il server genera la sfida `RAND` e il token `AUTN` usando la chiave segreta $K$ memorizzata nel database; la SIM, possedendo la medesima chiave segreta incisa fisicamente nel chip, calcola la risposta `RES`. Se la chiave $K$ sul file CSV non corrispondesse a quella della SIM, l'autenticazione fallirebbe e il terminale non potrebbe mai registrarsi sulla rete cellulare.

### 6. "Qual è il ruolo del file `hostapd.conf` e quale differenza c'è tra WPA-PSK e 802.1X?"
* **Risposta Attesa**: `hostapd.conf` è il file di configurazione del demone `hostapd` che definisce i parametri radio (interfaccia, SSID, canale a 2.4 o 5 GHz, standard b/g/n/ac) e le modalità di sicurezza dell'Access Point.
  * In modalità **WPA-PSK (WPA2-Personal)**, tutte le stazioni condividono una singola passphrase comune (`wpa_passphrase`), da cui deriva la chiave PMK tramite la funzione PBKDF2; è semplice ma vulnerabile ad attacchi a dizionario offline se la password è debole.
  * In modalità **802.1X (WPA2-Enterprise)**, non vi è una password condivisa: l'AP dialoga con un server centrale **RADIUS** (`auth_server_addr`), ciascun utente usa credenziali individuali e la chiave PMK viene generata dinamicamente e univocamente per ciascuna sessione dalla Master Session Key (MSK), garantendo isolamento totale tra client.
