---
tipo: riassunto_esame
lezioni: ["5 aprile", "7 aprile", "12 aprile", "14 aprile", "21 aprile", "26 aprile", "28 aprile"]
argomento: "IEEE 802.11 WiFi Completo (Lezioni 13-19)"
docente: "Prof. Mauro Femminella"
corso: "Reti Wireless"
tags:
  - reti-wireless
  - wifi
  - ieee-802-11
  - csma-ca
  - dcf-edca
  - aggregazione-a-mpdu
  - block-ack
  - sicurezza-802-11i
  - four-way-handshake
  - performance-anomaly
---

# Riassunto Integrato d'Esame: Il Sistema WiFi IEEE 802.11 (Lezioni 13-19)
## Architettura, Strato Fisico, Meccanismi MAC CSMA/CA, Risparmio Energetico, QoS 802.11e, Alta Velocità 802.11n e Sicurezza 802.11i

> **Finalità della Nota**: Questa guida costituisce la sintesi pedagogica e organica dell'intero ciclo di lezioni dedicate al Wi-Fi (dal 5 al 28 aprile) tenute dal Prof. Mauro Femminella. Il documento connette i **54 argomenti monografici del vault** in una narrazione coerente e ad altissima densità concettuale, pensata specificamente per preparare l'esame orale e risolvere gli esercizi numerico-progettuali d'esame.

---

## 🧭 Mappa Concettuale Generale del WiFi (Lezioni 13-19)

```
=================================================================================================================
                                          ARCHITETTURA E FONDAMENTI (Lez. 13 - 14)
=================================================================================================================
  • Bande ISM (2.4 GHz & 5 GHz), Canali ortogonali (1, 6, 11) & Evoluzione Standard (b, a, g, n, ac, ax)
  • Topologie: IBSS (Ad-Hoc), BSS Infrastruttura con Access Point (AP), Extended Service Set (ESS) su DS
  • Trama MAC 802.11, Incapsulamento LLC/SNAP e Indirizzamento a 4 Indirizzi (Flag To DS / From DS)
                                                   │
                                                   ▼
=================================================================================================================
                                   ACCESSO AL MEZZO & GESTIONE CANALE (Lez. 14 - 15)
=================================================================================================================
  • CSMA/CA di base (DCF): Inter-Frame Spaces (SIFS, DIFS), ACK obbligatorio a L2
  • Physical Carrier Sensing (CCA) vs Virtual Carrier Sensing (Duration/ID e timer NAV)
  • Problema del Terminale Nascosto e Handshake a 4 vie (RTS / CTS)
  • Intervallo EIFS (decodifica errata/FCS fail) & Algoritmo di Backoff Esponenziale con Contention Window [CW]
  • Collo di bottiglia: Performance Anomaly di 802.11 (Heusse) per packet-fairness a bitrate eterogenei
                                                   │
                                                   ▼
=================================================================================================================
                                SINCRONIZZAZIONE, POWER SAVING & GESTIONE (Lez. 16)
=================================================================================================================
  • Sincronizzazione Temporale TSF (Clock 64 bit a 1 MHz via Beacon Timestamp)
  • Power Saving Mode (PSM): Asimmetria UL/DL, stati Awake/Doze, trame Null, mappe TIM e DTIM
  • Mobilità L2 all'interno dell'ESS: Scansione Passiva vs Scansione Attiva (Probe Request/Response)
  • Meccanismi di Protezione ERP (CTS-to-self) & Architetture Campus (Fat AP vs Thin AP con WLC / CAPWAP)
                                                   │
                                                   ▼
=================================================================================================================
                               QoS (802.11e) & ALTA VELOCITÀ (802.11n) (Lez. 17 - 18)
=================================================================================================================
  • 802.11e HCF / EDCA: 4 Access Categories (AC_VO, AC_VI, AC_BE, AC_BK) differenziate via AIFS, CWmin, CWmax
  • Transmission Opportunity (TXOP): Frame Bursting, risoluzione della Performance Anomaly via Airtime Fairness
  • 802.11n Strato Fisico: MIMO (Spatial Multiplexing), Channel Bonding (40 MHz), Short Guard Interval (400 ns)
  • Crollo efficienza MAC ad alto PHY rate -> Aggregazione: A-MSDU (mono CRC) vs A-MPDU (multi CRC robusto)
  • Block Ack (BA): bitmap a 64 bit per riscontro cumulativo selettivo con handshake ADDBA
                                                   │
                                                   ▼
=================================================================================================================
                                  SICUREZZA: DAL FALLIMENTO WEP A 802.11i (Lez. 18 - 19)
=================================================================================================================
  • Fallimento WEP: chiave fissa + IV debole a 24 bit in chiaro, cifrario a flusso RC4, attacco FMS e ARP Injection
  • Transizione WPA / TKIP: IV a 48 bit, Key Mixing Phase 1/2 e MIC Michael
  • Standard Robusto 802.11i (WPA2/WPA3): Cifratura a blocchi AES-CCMP (128 bit)
  • Controllo Accessi IEEE 802.1X / EAP (Supplicant - Authenticator - RADIUS Server, es. Eduroam)
  • Gerarchia Chiavi: MSK -> PMK (256 bit) -> PTK (512 bit: KCK, KEK, TK) + Group Key GTK
  • Four-Way Handshake (4 messaggi) per mutua autenticazione e derivazione cifraria senza trasmettere chiavi
=================================================================================================================
```

---

## Lezione 13 (5 Aprile): Fondamenti, Bande ISM, Modulazioni e Trama MAC

### 1. Storia, Standard e Spettro Radio ISM
Lo standard IEEE 802.11 nasce per estendere le reti locali cablate Ethernet (IEEE 802.3) in mobilità wireless, operando nelle bande industriali, scientifiche e mediche (**ISM - Industrial, Scientific and Medical**) che non richiedono licenza d'uso individuale ma impongono severi limiti di densità spettrale di potenza (EIRP):
- **Banda 2.4 GHz (2.400 - 2.4835 GHz)**:
  - Canali spaziati di soli 5 MHz con larghezza nominale di 20 o 22 MHz.
  - Per evitare interferenze distruttive tra canali adiacenti, è necessario selezionare canali ortogonali (non sovrapposti). In Europa e Nord America la terna classica priva di sovrapposizione è costituita dai **canali 1, 6 e 11** (in Europa è teoricamente possibile anche 1, 5, 9, 13).
  - Vantaggi: ottima penetrazione degli ostacoli e portata estesa; Svantaggi: banda fortemente congestionata (interferenze da forni a microonde, Bluetooth, telefoni cordless).
- **Banda 5 GHz (UNII-1, UNII-2, UNII-3)**:
  - Dispone di oltre 23 canali non sovrapposti a 20 MHz.
  - Vantaggi: spettro molto più ampio, assenza di interferenze domestiche legacy, supporto per canali aggregati a 40, 80 e 160 MHz.
  - Svantaggi: attenuazione di spazio libero e assorbimento delle pareti notevolmente superiori rispetto a 2.4 GHz ($L \propto f^2$). Obbligo di meccanismi DFS (Dynamic Frequency Selection) e TPC per non interferire con i radar meteorologici e militari.
- Per approfondire nel vault: [[Lezione 13 5 aprile - 01 - Storia e standard 802.11 WiFi|Storia e standard 802.11 WiFi]] e [[Lezione 13 5 aprile - 02 - Versioni 802.11 modulazioni canali ISM e distanze|Versioni 802.11 e canali ISM]].

### 2. Evoluzione degli Standard e Modulazioni Fisiche
1. **802.11 Legacy (1997)**: 1 e 2 Mbps con DSSS (Direct Sequence Spread Spectrum) o FHSS a 2.4 GHz.
2. **802.11b (1999)**: fino a 11 Mbps a 2.4 GHz tramite codifica CCK (Complementary Code Keying).
3. **802.11a (1999)**: fino a 54 Mbps a 5 GHz tramite modulazione a multi-portante ortogonale **OFDM** (52 sottoportanti, spaziatura 312.5 kHz, modulazioni BPSK, QPSK, 16-QAM e 64-QAM).
4. **802.11g (2003)**: porta la modulazione OFDM a 54 Mbps nella banda dei 2.4 GHz, garantendo la retrocompatibilità con 802.11b tramite schemi di protezione.
5. **802.11n (2009 - Wi-Fi 4)**: fino a 600 Mbps con MIMO $4 	imes 4$ e canali a 40 MHz su entrambe le bande (2.4 e 5 GHz).
6. **802.11ac (2013 - Wi-Fi 5)**: fino a 6.93 Gbps a 5 GHz (canali fino a 160 MHz, 256-QAM, MU-MIMO downlink).
7. **802.11ax (2021 - Wi-Fi 6/6E)**: fino a 9.6 Gbps con OFDMA (suddivisione in Resource Units, come nel cellulare), 1024-QAM e nuova banda 6 GHz (Wi-Fi 6E).

### 3. Stack Protocollare e Incapsulamento
Il modello architetturale 802.11 suddivide il livello fisico e il livello data link:
- **PHY (Physical Layer)**:
  - **PMD (Physical Medium Dependent)**: interfaccia radio ricetrasmittente e modulatore/demodulatore.
  - **PLCP (Physical Layer Convergence Protocol)**: adatta le MPDU del MAC al mezzo fisico, aggiungendo il **Preambolo** (per la sincronizzazione di simbolo e frequenza) e il **PLCP Header** (che specifica il data rate e la lunghezza del frame, sempre trasmesso al rate base più robusto per consentire a chiunque di decodificarlo).
- **MAC (Medium Access Control)**: gestisce l'accesso al canale radio condiviso (CSMA/CA), l'indirizzamento, la frammentazione e i riscontri L2.
- **LLC (Logical Link Control - IEEE 802.2)**: fornisce un'interfaccia unificata al livello rete (IP). Per trasportare pacchetti IP su 802.11, il datagramma IP viene incapsulato con un'intestazione **LLC/SNAP** (8 byte: DSAP=`0xAA`, SSAP=`0xAA`, Control=`0x03`, OUI=`0x000000`, EtherType=`0x0800`).
- Dettaglio note: [[Lezione 13 5 aprile - 04 - Stack protocollare WiFi trama PLCP e preambolo|Stack protocollare e trama PLCP]] e [[Lezione 13 5 aprile - 05 - Trama MAC 802.11 tipi LLC e incapsulamento Ethernet|Trama MAC e incapsulamento LLC/Ethernet]].

### 4. La Struttura della Trama MAC 802.11 Generale
A differenza della trama Ethernet (che ha soli due indirizzi MAC e un payload massimo di 1500 byte), la trama MAC 802.11 ha una dimensione massima fino a **2346 byte** (2312 byte di payload) ed è composta dai seguenti campi fondamentali:
```
┌──────────────┬─────────────┬──────────┬──────────┬──────────┬──────────────┬──────────┬───────────┬─────────┐
│ Frame Control│ Duration/ID │ Address 1│ Address 2│ Address 3│ Seq Control  │ Address 4│  Payload  │   FCS   │
│   (2 byte)   │  (2 byte)   │ (6 byte) │ (6 byte) │ (6 byte) │   (2 byte)   │ (6 byte) │(0-2312 B) │ (4 byte)│
└──────────────┴─────────────┴──────────┴──────────┴──────────┴──────────────┴──────────┴───────────┴─────────┘
```
- **Frame Control (16 bit)**:
  - *Protocol Version* (2 bit): sempre `00`.
  - *Type* (2 bit): `00` Management, `01` Control, `10` Data.
  - *Subtype* (4 bit): specifica il ruolo esatto (es. Beacon, Probe Request, RTS, CTS, ACK, QoS Data).
  - *Flags di Instradamento*: **`To DS`** e **`From DS`** (1 bit ciascuno), fondamentali per determinare il significato dei 4 indirizzi MAC.
  - *Altri Flag*: More Fragments, Retry (indica ritrasmissione), Power Management (1 = stazione entra in sleep), More Data (buffer pieno all'AP), Protected Frame (1 = cifratura WEP/TKIP/CCMP attiva), Order.
- **Duration / ID (16 bit)**: esprime il tempo in microsecondi ($\mu$s) per cui il canale radio rimarrà occupato dalla trasmissione corrente e dal successivo scambio di trame (imposta il NAV di tutte le stazioni terze).
- **Address 1, 2, 3, 4 (6 byte ciascuno)**: indirizzi MAC a 48 bit con ruoli variabili in base a `To DS` e `From DS`.
- **Sequence Control (16 bit)**: 4 bit per il *Fragment Number* (da 0 a 15) e 12 bit per il *Sequence Number* (da 0 a 4095 per rilevare duplicati).
- **FCS (Frame Check Sequence, 4 byte)**: CRC a 32 bit calcolato su tutti i campi dell'header MAC e del payload.
- Note vault: [[Lezione 13 5 aprile - 06 - Topologie WiFi IBSS BSS ESS e indirizzi MAC|Topologie WiFi e indirizzi MAC]].

---

## Lezione 14 (7 Aprile): Topologie, Indirizzamento a 4 Indirizzi e Accesso Base DCF

### 1. Architettura delle Reti WiFi: IBSS, BSS ed ESS
1. **IBSS (Independent BSS - Rete Ad-Hoc)**: stazioni comunicano direttamente tra loro (peer-to-peer) senza alcun Access Point centrale. Non esiste connessione a reti cablate esterne.
2. **BSS (Basic Service Set - Modalità Infrastruttura)**: tutte le stazioni (STA) comunicano unicamente tramite un Access Point centrale (AP). L'AP funge da coordinatore radio e da bridge verso la rete locale cablata. La cella è identificata univocamente dal **BSSID** (che coincide con l'indirizzo MAC della scheda radio dell'AP).
3. **ESS (Extended Service Set)**: aggregazione logica di più BSS interconnessi tramite un mezzo cablato chiamato **Distribution System (DS)**.
   - Tutti gli AP condividono lo stesso **SSID (Service Set Identifier)**, ossia il nome della rete visto dagli utenti (es. "UniPG" o "eduroam").
   - L'ESS consente il **Roaming a livello 2**: un terminale può muoversi fisicamente tra la copertura di un AP e quella di un altro AP appartenente allo stesso ESS senza cambiare indirizzo IP e senza disconnettere le sessioni TCP attive, poiché la rete appare come un'unica grande sottorete broadcast.
- Note vault: [[Lezione 14 7 aprile - 01 - ESS e Distribution System|ESS e Distribution System]] e [[Lezione 14 7 aprile - 02 - SSID BSSID Beacon e demo inSSIDer|SSID, BSSID e Beacon]].

### 2. La Regola d'Oro dei 4 Indirizzi MAC (To DS / From DS)
Nei compiti d'esame del Prof. Femminella, la compilazione dei 4 campi d'indirizzo della trama MAC è una delle domande più frequenti. La semantica dei campi dipende esclusivamente dai due bit **`To DS`** e **`From DS`**:

| `To DS` | `From DS` | Contesto Operativo | Address 1 (**RA** - Receiver) | Address 2 (**TA** - Transmitter) | Address 3 | Address 4 |
|:---:|:---:|:---|:---|:---|:---|:---|
| **0** | **0** | **IBSS** (Ad-hoc) o controllo tra STA e AP | **DA** (Destinazione Finale) | **SA** (Sorgente Iniziale) | **BSSID** | Non Usato (assente) |
| **1** | **0** | **Uplink** (da STA client verso AP) | **RA = BSSID** (MAC dell'AP) | **TA = SA** (MAC della STA) | **DA** (MAC Destinazione Finale) | Non Usato (assente) |
| **0** | **1** | **Downlink** (da AP verso STA client) | **RA = DA** (MAC della STA) | **TA = BSSID** (MAC dell'AP) | **SA** (MAC Sorgente Iniziale) | Non Usato (assente) |
| **1** | **1** | **WDS / Mesh** (Bridge radio tra due AP) | **RA** (AP ricevente del ponte) | **TA** (AP trasmittente del ponte) | **DA** (Destinazione Finale) | **SA** (Sorgente Iniziale) |

> [!IMPORTANT]
> **Regola Mnemonica Infallibile d'Esame**:
> - **Address 1** è SEMPRE il destinatario radio immediato del salto (**RA - Receiver Address**). In uplink è l'AP (BSSID), in downlink è la stazione di destinazione (DA).
> - **Address 2** è SEMPRE il trasmettitore radio immediato del salto (**TA - Transmitter Address**). In uplink è la stazione sorgente (SA), in downlink è l'AP (BSSID).
> - **Address 3** ospita l'indirizzo mancante: in Uplink manca la destinazione finale (**DA**), in Downlink manca la sorgente iniziale (**SA**)!
> - **Address 4** serve SOLO nel caso `1 1` (ponte radio AP-to-AP), dove il salto radio è una tratta intermedia tra due AP e servono sia la sorgente originaria (SA) che la destinazione finale (DA).
- Dettaglio note: [[Lezione 14 7 aprile - 03 - Indirizzamento 802.11 uplink downlink DS|Indirizzamento 802.11]] e [[Lezione 14 7 aprile - 04 - Wireless Distribution System WDS e Mesh 802.11s|WDS e Mesh 802.11s]].

### 3. Meccanismo di Accesso al Mezzo di Base: DCF (CSMA/CA)
A differenza delle reti cablate Ethernet dove si impiega **CSMA/CD** (Collision Detection), nel wireless la ricezione del proprio segnale durante la trasmissione è impossibile (a causa della vastissima dinamica di potenza: il segnale trasmesso locale è milioni di volte più forte del debole segnale ricevuto dall'etere). Per questo il Wi-Fi adotta **CSMA/CA (Collision Avoidance)**:
1. **Carrier Sensing**: prima di trasmettere, la stazione ascolta il canale radio.
2. **Spazi Inter-Trama (IFS - Inter-Frame Spaces)**: definiscono la priorità di accesso:
   - **SIFS (Short IFS)**: il più breve in assoluto (10 $\mu$s in 2.4 GHz, 16 $\mu$s in 5 GHz). Riservato per le trasmissioni con priorità assoluta: invio dell'**ACK L2**, invio del frame **CTS** in risposta a un RTS, e frammenti successivi. Poiché il canale rimane libero solo per un tempo SIFS, nessuna stazione in contesa può inserirsi e distruggere l'ACK!
   - **DIFS (Distributed IFS)**: tempo di attesa ordinario per trasmissioni asincrone di dati in DCF:
     $$DIFS = SIFS + 2 \cdot SlotTime$$
3. **ACK Obbligatorio a Livello 2**: poiché chi trasmette non può rilevare collisioni, ogni frame unicast trasmesso con successo deve essere confermato dal ricevitore tramite un pacchetto di **ACK** immediato inviato esattamente dopo un intervallo **SIFS**. Se il trasmettitore non riceve l'ACK entro un timeout prestabilito, assume che si sia verificata una collisione o un errore e programma la ritrasmissione con backoff!
- Nota vault: [[Lezione 14 7 aprile - 06 - MAC 802.11 CSMA-CA DCF Basic Access|CSMA/CA DCF Basic Access]].

---

## Lezione 15 (12 Aprile): CSMA/CA Avanzato, Terminale Nascosto, Backoff e Performance Anomaly

### 1. Physical vs Virtual Carrier Sensing e il NAV
Per stabilire se il canale è occupato (*Busy*) o libero (*Idle*), 802.11 combina due meccanismi indipendenti:
1. **Physical Carrier Sensing (a cura del PHY)**: eseguito tramite il meccanismo **CCA (Clear Channel Assessment)** che valuta:
   - *Energy Detection (ED)*: potenza RF grezza superiore a una soglia prestabilita (es. $-62	ext{ dBm}$ o $-82	ext{ dBm}$).
   - *Carrier Sense / Preamble Detection*: rilevamento di un preambolo 802.11 valido.
2. **Virtual Carrier Sensing (a cura del MAC)**:
   - Ogni trama MAC (dati, RTS, CTS, ACK) include nel proprio header il campo **Duration/ID**.
   - Tutte le stazioni terze che ascoltano la trama estraggono questo valore e aggiornano il proprio contatore interno chiamato **NAV (Network Allocation Vector)**.
   - Il NAV agisce come un conto alla rovescia decrementato nel tempo: finché il NAV è maggiore di zero, la stazione considera il canale logicamente **occupato**, astenendosi da qualsiasi trasmissione anche se fisicamente non misura alcuna potenza nell'etere!
- Dettaglio nel vault: [[Lezione 15 12 aprile - 01 - ACK nascosto Virtual Carrier Sensing e NAV|ACK nascosto, Virtual Carrier Sensing e NAV]].

### 2. Il Problema del Terminale Nascosto e l'Handshake RTS/CTS
- **Scenario del Terminale Nascosto (Hidden Terminal)**: due stazioni $A$ e $C$ si trovano agli antipodi della copertura radio di un AP $B$. $A$ sente $B$, $C$ sente $B$, ma $A$ e $C$ non si sentono reciprocamente (ostacoli o distanza eccessiva).
- Se sia $A$ che $C$ vogliono trasmettere a $B$, entrambe ascoltano il canale, lo sentono libero e iniziano a trasmettere contemporaneamente frame di grandi dimensioni: i due segnali collidono inevitabilmente sul ricevitore di $B$, distruggendo i pacchetti e azzerando il throughput.
- **Risoluzione tramite Handshake RTS/CTS a 4 vie**:
  1. $A$ invia un frame cortissimo di controllo: **RTS (Request to Send)**, con durata impostata per coprire l'intera transazione ($CTS + DATA + ACK + 3\cdot SIFS$).
  2. $B$ riceve l'RTS e dopo un tempo $SIFS$ risponde con un **CTS (Clear to Send)** in broadcast, replicando la durata residua.
  3. **Tutte le stazioni nel raggio di $B$ (compresa la stazione nascosta $C$)** ascoltano il CTS e impostano il proprio NAV per la durata rimanente, zittendosi!
  4. $A$ trasmette il frame di **DATA**.
  5. $B$ risponde con l'**ACK** dopo un tempo $SIFS$.
- **Soglia RTS (RTS Threshold)**: poiché l'handshake RTS/CTS introduce un overhead fisso non trascurabile, non conviene usarlo per tutti i pacchetti. Viene impostata una soglia: i pacchetti più corti della soglia vengono inviati con il Basic Access (DATA-ACK), mentre quelli più lunghi attivano l'RTS/CTS.
- Nota vault: [[Lezione 15 12 aprile - 02 - Terminale nascosto e handshake RTS-CTS|Terminale nascosto e handshake RTS-CTS]].

### 3. L'Intervallo EIFS (Extended Inter-Frame Space)
- Cosa accade se una stazione riceve un frame con **FCS errato** (o rileva energia senza riuscire a decodificare i campi dell'header MAC a causa di interferenze)?
- La stazione **non è in grado di leggere il campo Duration** e quindi non può aggiornare correttamente il proprio NAV!
- Se la stazione attendesse semplicemente un tempo DIFS per trasmettere, rischierebbe di trasmettere proprio mentre un'altra stazione sta per inviare il legittimo **ACK** di ritorno, distruggendolo!
- Per proteggere l'ACK altrui, la stazione che ha fallito la decodifica applica un tempo di guardia esteso chiamato **EIFS**:
  $$EIFS = SIFS + DIFS + T_{ACK}$$
  dove $T_{ACK}$ è il tempo di trasmissione di un frame ACK alla velocità di base più bassa. Se durante l'EIFS la stazione decodifica correttamente un nuovo frame, il timer EIFS viene abortito e si ripristina la normale gestione DIFS.
- Nota vault: [[Lezione 15 12 aprile - 03 - Decodifica errata e intervallo EIFS|Decodifica errata e intervallo EIFS]].

### 4. Algoritmo di Backoff Binario Esponenziale
Quando il canale diventa occupato durante l'attesa o in seguito a una collisione, per evitare che più stazioni trasmettano simultaneamente non appena il canale torna libero, si attiva il meccanismo di **Backoff**:
1. La stazione estrae un numero intero casuale $k$ compreso uniformemente nell'intervallo della finestra di contesa (**Contention Window**):
   $$k \in [0, CW]$$
2. Il contatore di backoff rappresenta il numero di slot temporali (*SlotTime*, es. 9 $\mu$s in 802.11a/g/n) che la stazione deve attendere a canale libero prima di trasmettere.
3. **Regole di Decremento e Freeze**:
   - La stazione attende che il canale rimanga ininterrottamente libero per un tempo **DIFS**.
   - Solo a questo punto, per ogni intero *SlotTime* in cui il canale rimane libero, il contatore viene decrementato di 1: $k \leftarrow k - 1$.
   - Se durante il conteggio un'altra stazione occupa il canale, il contatore di backoff si **congela (Freeze)** all'ultimo valore raggiunto.
   - Non appena il canale torna libero e rimane inattivo per un nuovo DIFS, il contatore riprende il decremento partendo esattamente dal valore congelato!
   - Quando il contatore raggiunge quota **0**, la stazione inizia istantaneamente a trasmettere.
4. **Raddoppio Esponenziale ad ogni Collisione**:
   - Al primo tentativo: $CW = CW_{min}$ (es. 15 o 31).
   - In caso di mancata ricezione dell'ACK (collisione): la finestra di contesa raddoppia:
     $$CW_{new} = 2 \cdot (CW_{old} + 1) - 1$$
     fino a raggiungere un tetto massimo $CW_{max}$ (tipicamente 1023).
   - In seguito a una trasmissione completata con successo, $CW$ viene resettata immediatamente al valore minimo $CW_{min}$.
5. **Limiti di Ritrasmissione**: Short Retry Limit (7 per trame corte/RTS) e Long Retry Limit (4 per trame lunghe/DATA). Raggiunto il limite senza successo, il pacchetto viene scartato a livello MAC.
- Nota vault: [[Lezione 15 12 aprile - 04 - Algoritmo di Backoff Contention Window e Retry Limits|Algoritmo di Backoff e Contention Window]].

### 5. La "Performance Anomaly" di 802.11 (Heusse et al.)
Questa è una delle tematiche teoriche d'esame più rilevanti dell'intero corso:
- In un BSS operano tipicamente terminali a distanze differenti dall'AP, che negoziano data rate fisici disomogenei tramite algoritmi di Rate Adaptation (es. stazione $V$ vicina a 54 Mbps e stazione $L$ lontana a 6 Mbps o 1 Mbps).
- Il protocollo DCF classico garantisce a tutte le stazioni che competono con successo la stessa probabilità di accesso al canale: ciascuna stazione trasmette in media **lo stesso numero di pacchetti** nel tempo (**Packet Fairness**).
- Tuttavia, trasmettere un pacchetto di 1500 byte a 1 Mbps richiede un tempo radio (**Airtime**) 54 volte superiore rispetto a trasmetterlo a 54 Mbps ($12	ext{ ms}$ contro $0.22	ext{ ms}$)!
- Di conseguenza, la stazione lenta monopolizza il mezzo trasmissivo per oltre il 95% del tempo. Le stazioni veloci rimangono continuamente bloccate in ascolto (NAV e backoff freeze).
- **Risultato catastrofico**: il throughput di tutte le stazioni veloci crolla drammaticamente, allineandosi verso il basso al livello della stazione più lenta!
- **Soluzione d'eccellenza**: introdotta in 802.11e con il concetto di **Transmission Opportunity (TXOP) / Airtime Fairness**: allocare a ciascuna stazione una quota equa di **tempo di trasmissione** anziché un numero equo di pacchetti.
- Note vault: [[Lezione 15 12 aprile - 05 - Throughput e Performance Anomaly di 802.11|Performance Anomaly]] e [[Lezione 15 12 aprile - 06 - Frammentazione MAC e Rate Adaptation|Frammentazione MAC e Rate Adaptation]].

---

## Lezione 16 (14 Aprile): Sincronizzazione TSF, Power Saving e Mobilità L2

### 1. Sincronizzazione Temporale: TSF (Timing Synchronization Function)
Nelle reti wireless la sincronizzazione temporale ad alta precisione è indispensabile per la scansione dei canali, il salto di frequenza (FHSS) e soprattutto per il coordinamento del risparmio energetico:
- In modalità infrastruttura, l'Access Point è il riferimento master del tempo.
- L'AP mantiene un contatore a 64 bit con risoluzione a **1 microsecondo (1 MHz)** chiamato **TSF Timer**.
- Periodicamente (tipicamente ogni 100 ms, intervallo configurabile noto come *Beacon Interval*), l'AP invia un frame di **Beacon** contenente nel payload il campo **Timestamp** a 64 bit.
- Tutte le stazioni associate estraggono il Timestamp e aggiornano il proprio orologio locale, azzerando le derive temporali (drift).
- Nota vault: [[Lezione 16 14 aprile - 01 - Sincronizzazione temporale e Timing Synchronization Function TSF|Sincronizzazione temporale TSF]].

### 2. Gestione del Risparmio Energetico (Power Saving Mode - PSM)
Un dispositivo portatile (smartphone, tablet) ha un budget energetico limitatissimo: una scheda radio Wi-Fi in ascolto costante consuma circa $1	ext{ W}$, mentre in stato di sonno profondo (**Doze / Sleep**) consuma meno di $10	ext{ mW}$ (risparmio superiore al 98%).
- **Asimmetria tra Uplink e Downlink**:
  - *In Uplink (STA $	o$ AP)*: è semplicissimo. La stazione decide autonomamente quando svegliarsi, trasmette il proprio pacchetto accendendo il bit **Power Management = 1** nell'header del Frame Control per notificare all'AP che tornerà immediatamente in sleep dopo aver ricevuto l'ACK.
  - *In Downlink (AP $	o$ STA)*: è critico. Se un server Internet invia dati a una stazione addormentata, i pacchetti andrebbero irrimediabilmente persi!
- **Soluzione con Bufferizzazione e Bitmap TIM/DTIM**:
  1. L'AP tiene traccia dello stato energetico di ogni terminale associato.
  2. Quando arrivano pacchetti per una stazione in sleep, l'AP **li immagazzina in un buffer locale**.
  3. L'AP inserisce nel Beacon periodico una struttura dati a mappa di bit chiamata **TIM (Traffic Indication Map)**. A ogni stazione associata è stato assegnato un codice identificativo univoco a 16 bit: l'**AID (Association Identifier)**. Se nel buffer dell'AP ci sono pacchetti per la stazione con $AID=k$, il $k$-esimo bit della TIM viene impostato a 1.
  4. La stazione si sveglia per pochi millisecondi in sincronia con il Beacon, legge la TIM:
     - Se il proprio bit è **0**: la stazione torna immediatamente a dormire fino al Beacon successivo!
     - Se il proprio bit è **1**: la stazione invia all'AP un frame di controllo brevissimo chiamato **PS-Poll (Power Save Poll)**.
     - L'AP risponde trasmettendo il pacchetto dati bufferizzato. Se l'AP ha altri pacchetti in coda per quella stazione, imposta il flag **More Data = 1** nel frame di risposta, inducendo la stazione a rimanere sveglia per prelevare i rimanenti.
  5. **DTIM (Delivery TIM) per Broadcast e Multicast**: per trasmettere pacchetti broadcast a tutte le stazioni (es. richieste ARP), l'AP definisce un periodo speciale $DTIM\_Period$ (es. ogni 3 Beacon). Al Beacon DTIM, tutte le stazioni dell'intero BSS sono obbligate a svegliarsi contemporaneamente per ricevere il traffico di gruppo.
- Dettaglio note: [[Lezione 16 14 aprile - 02 - Gestione del Power Saving e Asimmetria Uplink Downlink|Gestione del Power Saving]] e [[Lezione 16 14 aprile - 03 - Traffic Indication Map TIM DTIM e Null Frames|TIM, DTIM e Null Frames]].

### 3. Mobilità a Livello 2: Scansione Attiva vs Passiva
Quando una stazione deve associarsi a una rete o cambiare AP all'interno di un ESS (Roaming L2), esegue la ricerca dei punti di accesso disponibili su tutti i canali operativi:
- **Scansione Passiva (Passive Scanning)**:
  - La stazione si sintonizza su ciascun canale RF e rimane in silenzioso ascolto per un tempo pari al *Beacon Interval* (tipicamente 100-120 ms).
  - Vantaggi: non consuma banda radio, non trasmette segnali (ideale per il risparmio energetico e la privacy).
  - Svantaggi: procedura estremamente lenta (scandire 13 canali a 2.4 GHz richiede oltre 1.3 secondi, incompatibile con applicazioni real-time come il VoIP).
- **Scansione Attiva (Active Scanning)**:
  - La stazione si sintonizza sul canale e invia attivamente una trama di management: la **Probe Request** (in broadcast o con SSID specifico).
  - Tutti gli AP che operano su quel canale e rispondono a quell'SSID replicano immediatamente con una **Probe Response** contenente tutte le informazioni del Beacon (BSSID, canali, tassi supportati, crittografia).
  - Vantaggi: velocissima (pochi millisecondi per canale), adatta a roaming rapido.
  - Svantaggi: sovraccarico di segnalazione nell'etere e maggiore consumo di batteria.
- Note vault: [[Lezione 16 14 aprile - 04 - Trame di Management e Analisi Pacchetti in Wireshark|Trame di Management]] e [[Lezione 16 14 aprile - 05 - Mobilita L2 e Procedure di Scansione Attiva e Passiva|Mobilità L2 e Scansione]].

### 4. Meccanismi di Protezione ERP e CTS-to-Self
- Quando una stazione legacy 802.11b (modulazione DSSS/CCK a 11 Mbps) entra in una cella 802.11g (OFDM a 54 Mbps), la stazione legacy non è in grado di decodificare i pacchetti OFDM. Non potendo decodificare l'header, non può impostare il NAV e rischierebbe di trasmettere sopra i frame veloci!
- L'AP rileva la presenza di nodi legacy e attiva la **Protezione ERP**:
  - Prima di trasmettere un payload dati veloce OFDM, la stazione invia un frame **CTS-to-self** (un CTS che ha come indirizzo di destinazione il proprio indirizzo MAC) modulato alla velocità base di 1 Mbps DSSS.
  - La stazione 802.11b riceve e decodifica il CTS-to-self, legge il campo Duration e **imposta il proprio NAV**, rimanendo zitta durante la successiva trasmissione OFDM a 54 Mbps!
- Nota vault: [[Lezione 16 14 aprile - 06 - Schemi di Protezione ERP e Meccanismo CTS-to-self|Protezione ERP e CTS-to-self]] e [[Lezione 16 14 aprile - 07 - Progettazione Fisica e Architettura Logica WiFi Campus vs SOHO|Architetture Campus vs SOHO]].

---

## Lezione 17 (21 Aprile): Qualità del Servizio (QoS 802.11e) e Alta Velocità 802.11n

### 1. Architettura QoS IEEE 802.11e: HCF ed EDCA
Lo standard IEEE 802.11e introduce il supporto nativo alla Qualità del Servizio tramite la funzione **HCF (Hybrid Coordination Function)**, che rimpiazza la vecchia architettura DCF/PCF. La componente decentralizzata basata su contesa prende il nome di **EDCA (Enhanced Distributed Channel Access)**.

#### Le 4 Access Categories (AC)
Il traffico utente proveniente dal livello IP (taggato tramite i campi DiffServ DSCP o Ethernet 802.1p) viene mappato all'interno di **4 code di trasmissione indipendenti (Access Categories)**:
1. **$AC\_VO$ (Voice)**: priorità massima, vincoli di latenza < 20 ms e jitter minimo (VoIP, chiamate vocali).
2. **$AC\_VI$ (Video)**: priorità elevata, streaming video e gaming interattivo.
3. **$AC\_BE$ (Best Effort)**: traffico convenzionale senza garanzie di ritardo (navigazione web, posta).
4. **$AC\_BK$ (Background)**: priorità minima (download in background, backup, peer-to-peer).

#### I Parametri di Differenziazione della Contesa
Ciascuna delle 4 code compete per l'accesso al mezzo radio come se fosse una stazione indipendente, ma con parametri di contesa fortemente differenziati configurati dall'Access Point nel Beacon:

| Access Category | $AIFSN$ | $AIFS$ | $CW_{min}$ | $CW_{max}$ | $TXOP\_Limit$ (2.4 GHz) |
|:---:|:---:|:---|:---:|:---:|:---:|
| **$AC\_VO$** | 2 | $SIFS + 2 \cdot SlotTime$ | 3 | 7 | $1.504	ext{ ms}$ (o $3.264	ext{ ms}$) |
| **$AC\_VI$** | 2 | $SIFS + 2 \cdot SlotTime$ | 7 | 15 | $3.008	ext{ ms}$ (o $6.016	ext{ ms}$) |
| **$AC\_BE$** | 3 | $SIFS + 3 \cdot SlotTime$ | 15 | 1023 | 0 (1 solo pacchetto) |
| **$AC\_BK$** | 7 | $SIFS + 7 \cdot SlotTime$ | 15 | 1023 | 0 (1 solo pacchetto) |

- **$AIFS[AC]$ (Arbitration Inter-Frame Space)**: sostituisce il vecchio DIFS. È calcolato come:
  $$AIFS[AC] = SIFS + AIFSN[AC] \cdot SlotTime$$
  Poiché la voce ($AIFSN=2$) attende molto meno tempo rispetto al background ($AIFSN=7$), il contatore di backoff della voce inizia a scalare con largo anticipo rispetto alle code a bassa priorità!
- **Contention Window $CW_{min}$ e $CW_{max}$ ridotti**: per la voce il backoff è estratto in $[0, 3]$, rendendo statisticamente quasi certo che vinca la contesa rispetto al Best Effort ($[0, 15]$)!
- **Collisione Interna (Internal Virtual Collision)**: se all'interno della stessa stazione due code virtuali terminano il backoff nello stesso istante, la collisione viene risolta internamente dal software: la coda a priorità più alta ottiene il canale e trasmette, mentre la coda a priorità inferiore subisce una collisione virtuale, raddoppia la propria $CW$ e avvia un nuovo ciclo di backoff!
- Note vault: [[Lezione 17 21 aprile - 01 - Qualita del Servizio QoS Architettura HCF EDCA e HCCA|QoS Architettura HCF ed EDCA]] e [[Lezione 17 21 aprile - 03 - Parametri di Contesa AIFS Contention Window e Access Categories|Parametri di Contesa e Access Categories]].

### 2. Transmission Opportunity (TXOP) e Airtime Fairness
- In DCF classico, una volta vinto il canale, la stazione trasmette un singolo pacchetto e deve rimettersi obbligatoriamente in contesa.
- In 802.11e, se la coda possiede un parametro **$TXOP\_Limit > 0$**, la stazione che vince la contesa acquisisce il diritto esclusivo di trasmettere sul canale per l'intera durata del TXOP.
- **Frame Bursting**: all'interno del tempo $TXOP$, la stazione può trasmettere **molteplici frame consecutivi**, separati tra loro unicamente da un brevissimo intervallo **SIFS** e dai rispettivi ACK!
- **Eliminazione della Performance Anomaly**: poiché il limite è fissato in **unità di tempo (microsecondi)** e non in numero di pacchetti, una stazione veloce a 54 o 300 Mbps trasmetterà 10 o 20 pacchetti nello stesso intervallo in cui una stazione lenta a 6 Mbps ne trasmette uno solo! Entrambe occupano lo stesso airtime, garantendo **Airtime Fairness** e preservando le massime prestazioni complessive della rete.
- Dettaglio nel vault: [[Lezione 17 21 aprile - 02 - Transmission Opportunity TXOP e Controllo di Accesso EDCA|Transmission Opportunity TXOP]] e [[Lezione 17 21 aprile - 04 - Regole Durata TXOP Airtime Fairness e Wireshark WMM|TXOP, Airtime Fairness e WMM]].

### 3. IEEE 802.11n: Strato Fisico ad Alta Velocità (High Throughput - HT)
Lo standard 802.11n rivoluziona le prestazioni del Wi-Fi combinando tre pilastri tecnologici a livello fisico:
1. **Tecnologia MIMO (Multiple Input Multiple Output)**:
   - Uso di antenne multiple (fino a $4 	imes 4$).
   - **Spatial Multiplexing**: il flusso dati viene suddiviso in più stream spaziali indipendenti trasmessi contemporaneamente sulla stessa frequenza. Il throughput si moltiplica linearmente per il numero di stream (fino a 4x).
   - **Beamforming e STBC**: incremento della robustezza e del raggio di copertura combinando costruttivamente i segnali.
2. **Channel Bonding (Canali a 40 MHz)**:
   - Aggregazione di due canali adiacenti standard da 20 MHz (*Primary Channel* e *Secondary Channel*) in un canale unico a 40 MHz.
   - Non solo raddoppia la banda, ma elimina la banda di guardia intermedia tra i due canali, portando le sottoportanti dati utili da $2 	imes 52 = 104$ a **108 sottoportanti dati** (+117% di throughput).
3. **Short Guard Interval (SGI)**:
   - Nelle modulazioni OFDM tradizionali (802.11a/g) l'intervallo di guardia (Cyclic Prefix) dura $800	ext{ ns}$ per evitare l'interferenza tra simboli (ISI) dovuta al ritardo di multipath.
   - In ambienti indoor tipici il ritardo di multipath raramente supera i 100-200 ns. 802.11n consente di dimezzare il Guard Interval a **$400	ext{ ns}$**, incrementando il data rate utile dell'**11.1%** (es. da 65 a 72.2 Mbps su singolo stream).
- Formati di trama PLCP in 802.11n: **Legacy** (incompatibile con HT), **HT Mixed Mode** (preambolo legacy a inizio trama leggibile dalle vecchie stazioni per impostare il NAV, seguito dal preambolo HT per i terminali veloci) e **HT Greenfield** (senza preambolo legacy, massima efficienza ma vietato in presenza di stazioni 802.11a/g/b).
- Note vault: [[Lezione 17 21 aprile - 05 - 802.11n High Throughput Strato Fisico SGI e MIMO|802.11n Strato Fisico e MIMO]] e [[Lezione 17 21 aprile - 06 - Channel Bonding a 2.4 GHz e 5 GHz in 802.11n|Channel Bonding]] e [[Lezione 17 21 aprile - 07 - Formati Trama 802.11n e Protezione Greenfield Mixed e Spoofed PLCP|Formati Trama 802.11n]].

---

## Lezione 18 (26 Aprile): Aggregazione di Trama, Block ACK e Vulnerabilità WEP

### 1. Il Collo di Bottiglia del MAC ad Altissima Velocità
All'aumentare della velocità fisica del canale radio (PHY Rate) da 54 Mbps a 600 Mbps, emerge un vincolo fondamentale delle reti wireless:
- Il tempo effettivo impiegato per trasmettere il payload dati si riduce drasticamente: un pacchetto da 1500 byte richiede $12	ext{ ms}$ a 1 Mbps, $222	ext{ }\mu	ext{s}$ a 54 Mbps e appena **$20	ext{ }\mu	ext{s}$ a 600 Mbps**!
- Tuttavia, gli overhead fissi del protocollo di accesso non scalano con la velocità dei dati:
  - Preambolo PLCP e Header PHY: trasmessi a velocità fissa robusta (es. 20-30 $\mu$s).
  - Tempo di DIFS (o AIFS) e tempo medio di Backoff: decine di microsecondi.
  - Tempo SIFS e trasmissione dell'ACK a velocità base: decine di microsecondi.
- **Paradosso del Throughput**: a 600 Mbps, il tempo dedicato a trasmettere il payload è solo una minuscola frazione (15-20%) del tempo totale di occupazione del canale; il rimanente 80-85% è sprecato in overhead di protocollo!
- **Soluzione architetturale**: per rendere l'alta velocità fisica effettivamente fruibile a livello applicativo, è indispensabile ammortizzare gli overhead su grandissime quantità di dati tramite l'**Aggregazione di Trama**.
- Nota vault: [[Lezione 18 26 aprile - 01 - Efficienza del MAC ad alta velocita e principio di aggregazione|Efficienza del MAC e principio di aggregazione]].

### 2. Le Due Tecniche di Aggregazione: A-MSDU vs A-MPDU

#### 1. A-MSDU (Aggregate MAC Service Data Unit) - Aggregazione ad Alto Livello
- Opera nella parte superiore del sottolivello MAC.
- Prende più pacchetti provenienti dal livello rete (es. IP) diretti allo stesso destinatario e con la stessa classe di priorità QoS, e li accorpa all'interno del payload di **un'unica trama MAC 802.11**.
- Ciascuna sotto-trama ha un piccolo sub-header di 14 byte (DA, SA, Length), ma l'intera A-MSDU possiede **un solo Header MAC principale (24/30 byte)** e **un solo FCS (CRC-32 di 4 byte)**!
- Dimensione massima: fino a **3839 o 7935 byte**.
- *Vantaggio*: efficienza teorica massima (elimina quasi tutti gli header).
- *Svantaggio critico d'esame*: **estrema fragilità agli errori di canale**. Se anche un solo singolo bit viene corrotto dal rumore o da un'interferenza lungo i 7935 byte, l'intero CRC-32 finale fallisce e **tutti i pacchetti aggregati nell'A-MSDU devono essere interamente ritrasmessi**! Per questo A-MSDU si usa solo su canali a bassissimo errore.
- Nota vault: [[Lezione 18 26 aprile - 02 - Aggregazione A-MSDU|Aggregazione A-MSDU]].

#### 2. A-MPDU (Aggregate MAC Protocol Data Unit) - Aggregazione a Basso Livello
- Opera nella parte inferiore del MAC, subito prima della consegna al livello fisico.
- Prende molteplici trame MAC complete (**MPDU**), ciascuna dotata della propria intestazione MAC, del proprio payload e del proprio **FCS individuale (CRC-32 indipendente)**.
- Le MPDU vengono concatenate separandole tramite un **MPDU Delimiter di 4 byte** (contenente un CRC-8 di delimitatore a 1 byte, 12 bit di lunghezza e signature `0x4E`).
- Dimensione massima: fino a **65535 byte (64 KB)** in 802.11n (e fino a oltre 1-4 MB in 802.11ac/ax).
- *Vantaggio straordinario*: **supporto alla ritrasmissione selettiva**. Se durante la ricezione il rumore corrompe una singola MPDU, il suo specifico CRC-32 fallisce, ma tutte le altre MPDU integre vengono validate e accettate! Grazie al Block Ack, la stazione ricevente richiederà la ritrasmissione del solo sotto-frame corrotto!
- Dettaglio note: [[Lezione 18 26 aprile - 03 - Aggregazione A-MPDU RIFS e confronto tra i due schemi|Aggregazione A-MPDU e RIFS]].

```
CONFRONTO ARCHITETTURALE D'ESAME:
────────────────────────────────────────────────────────────────────────────────────────
Parametro                  A-MSDU                             A-MPDU
────────────────────────────────────────────────────────────────────────────────────────
Livello di aggregazione    Top of MAC (da LLC/IP)             Bottom of MAC (a valle di cifratura)
Header MAC 802.11          UNICO per tutto il blocco          UNO PER OGNI sotto-frame MPDU
Controllo Errore (FCS)     UNICO CRC-32 per tutto il blocco   INDIVIDUALE per ogni MPDU
Dimensione Massima         7935 byte                          65535 byte (64 KB)
In caso di errore di bit   Ritrasmissione dell'INTERA A-MSDU  Ritrasmissione SELETTIVA del solo MPDU
Requisito di riscontro     ACK normale o Block ACK            Richiede obbligatoriamente BLOCK ACK
────────────────────────────────────────────────────────────────────────────────────────
```

### 3. Il Meccanismo del Block ACK (BA)
Trasmettere decine di MPDU in un'A-MPDU richiederebbe decine di ACK singoli, vanificando i vantaggi dell'aggregazione. Lo standard introduce perciò il **Block Ack**:
- **Setup della Sessione ADDBA**: prima di usare il meccanismo, le due stazioni eseguono un handshake a 3 vie: *ADDBA Request*, *ADDBA Response* e *ACK*, concordando la dimensione del buffer di riordinamento (Buffer Size fino a 64 frame).
- **Trasmissione e Riscontro Cumulativo**:
  1. Il trasmettitore invia una raffica di MPDU consecutive (A-MPDU).
  2. Al termine, invia un frame di controllo **BAR (Block Ack Request)** con il *Starting Sequence Number (SSN)*.
  3. Il ricevitore risponde dopo un tempo SIFS con una singola trama **Block Ack (BA)**.
  4. La trama Block Ack contiene una **Bitmap di 64 bit (8 byte)**: ogni bit corrisponde a uno dei 64 numeri di sequenza a partire dall'SSN:
     - `Bit = 1`: MPDU ricevuta con successo (ACK).
     - `Bit = 0`: MPDU persa o con CRC-32 errato (NACK).
  5. Il trasmettitore legge la bitmap e ritrasmette selettivamente solo le MPDU con bit a 0!
- Note vault: [[Lezione 18 26 aprile - 04 - Block Ack - struttura bitmap e modalita|Block Ack]] e [[Lezione 18 26 aprile - 05 - Block Ack e ADDBA nelle catture Wireshark|Block Ack in Wireshark]].

### 4. La Sicurezza nelle Reti Wireless e il Fallimento del WEP
Nelle reti cablate la sicurezza fisica è garantita dalle mura dell'edificio; nel wireless le onde elettromagnetiche oltrepassano i muri, rendendo l'etere accessibile a chiunque senza bisogno di intrusioni fisiche.

#### I Pilastri della Sicurezza Informatica (CIA+):
1. **Confidenzialità**: solo il destinatario autorizzato può leggere i dati (cifratura).
2. **Integrità**: garanzia che i dati non siano stati manomessi in transito.
3. **Autenticazione**: verifica certa dell'identità dell'utente e della rete (mutua).
4. **Controllo degli Accessi**: autorizzazione all'uso della risorsa.
5. **Non ripudio e Disponibilità**: resistenza ad attacchi DoS.

#### Perché il WEP (Wired Equivalent Privacy) è Totalmente Fallito
Il WEP, introdotto nel 1999 con l'intento di garantire al Wi-Fi la stessa sicurezza di un cavo di rete, è collassato sotto molteplici vulnerabilità crittografiche fatali:
1. **Cifrario a flusso RC4 e il riuso della chiave**: RC4 genera un flusso di byte pseudocasuali (*Keystream*) tramite XOR con il testo in chiaro: $C = P \oplus RC4(K)$. Se due messaggi $P_1$ e $P_2$ vengono cifrati con lo stesso keystream, uno spione calcola:
   $$C_1 \oplus C_2 = (P_1 \oplus KS) \oplus (P_2 \oplus KS) = P_1 \oplus P_2$$
   eliminando completamente la crittografia!
2. **Vettore di Inizializzazione (IV) debolissimo**: per evitare il riuso del keystream con la chiave master fissa $K$, il WEP antepone un IV di **soli 24 bit** inviato in chiaro: la chiave RC4 è $IV \parallel K$. Con soli 24 bit esistono solo $2^{24} pprox 16.7	ext{ milioni}$ di combinazioni: in una rete mediamente trafficata, il paradosso del compleanno garantisce **collisioni di IV ogni poche decine di minuti**!
3. **Attacco FMS (Fluhrer, Mantin, Shamir)**: nell'algoritmo di scheduling della chiave (KSA) di RC4, i primi byte della chiave ($IV$) trapelano direttamente nei primi byte del keystream generato. Esistono "chiavi deboli" che consentono a un attaccante passivo di ricostruire l'intera chiave segreta $K$ dopo aver catturato poche centinaia di migliaia di pacchetti!
4. **Integrità fasulla basata su CRC-32 (ICV)**: il WEP usava il CRC-32 (chiamato ICV) come checksum crittografico. Essendo il CRC-32 un operatore lineare rispetto all'operazione di XOR, un attaccante può alterare arbitrariamente i bit del testo cifrato e aggiornare il CRC-32 senza nemmeno conoscere la chiave (*bit-flipping attack*)!
5. **Attacco di ARP Request Injection**: l'attaccante inietta ripetutamente una richiesta ARP cifrata: l'AP la decifra, la re-inoltra nell'etere e genera un nuovo pacchetto con un nuovo IV, permettendo all'attaccante di raccogliere milioni di IV in meno di 2 minuti e violare la chiave istantaneamente!
- Note vault: [[Lezione 18 26 aprile - 06 - Concetti di sicurezza - confidenzialita autenticazione integrita controllo accesso disponibilita|Concetti di sicurezza]], [[Lezione 18 26 aprile - 07 - Sicurezza 802.11 di base - open system liste MAC e shared key|Sicurezza di base]] e [[Lezione 18 26 aprile - 08 - WEP - vettore di inizializzazione RC4 e attacco ARP injection|Vulnerabilità WEP ed RC4]].

### 5. La Soluzione Transitoria: WPA e TKIP
In attesa che l'hardware supportasse l'impegnativo cifrario AES, la Wi-Fi Alliance rilasciò nel 2003 lo standard tampone **WPA (Wi-Fi Protected Access)** con protocollo **TKIP (Temporal Key Integrity Protocol)**:
- IV esteso da 24 a **48 bit** (azzeramento del rischio di collisione per decenni).
- **Funzione di Key Mixing (Phase 1 e Phase 2)**: per ogni singolo pacchetto, la chiave master viene mescolata crittograficamente con l'IV a 48 bit e l'indirizzo MAC del trasmettitore, neutralizzando l'attacco FMS.
- **Algoritmo Michael (MIC a 64 bit)**: sostituisce il debole CRC-32 con un vero Message Integrity Check non lineare. Poiché Michael era debole contro il brute-force, TKIP introduce una contromisura: se si verificano 2 errori MIC entro 60 secondi, la rete si blocca per 60 secondi (*lockout*) e rigenera tutte le chiavi.
- Nota vault: [[Lezione 18 26 aprile - 09 - WPA e TKIP - IV a 48 bit numero di sequenza e MIC|WPA e TKIP]] e [[Lezione 18 26 aprile - 10 - 802.1X EAP e fasi della sicurezza 802.11i|802.1X e fasi della sicurezza]].

---

## Lezione 19 (28 Aprile): Sicurezza Robusta 802.11i, Four-Way Handshake ed Esercizi d'Esame

### 1. Architettura di Sicurezza Definitiva: IEEE 802.11i (WPA2 e WPA3)
Lo standard IEEE 802.11i (ratificato nel 2004 e commercializzato come **WPA2**) definisce la **RSN (Robust Security Network)**, rimpiazzando definitivamente RC4 con il cifrario standard federale **AES (Advanced Encryption Standard)** a blocchi di 128 bit.
- Il protocollo di incapsulamento cifrato prende il nome di **CCMP (Counter Mode with CBC-MAC Protocol)**:
  - **Counter Mode (CTR)**: fornisce la riservatezza trasformando il cifrario a blocchi in un cifrario a flusso parallelo e ad altissima velocità.
  - **CBC-MAC**: calcola un codice di autenticazione del messaggio (MIC) a 64 o 128 bit calcolato sia sul payload che sui campi critici dell'header MAC (AAD - Additional Authentication Data), rendendo impossibile qualsiasi manomissione o alterazione degli indirizzi MAC!
  - **Packet Number (PN a 48 bit)**: funge da contatore strettamente incrementale, rendendo totalmente immuni da attacchi di rigiocata (*Replay Attack*).

### 2. Controllo degli Accessi: Architettura IEEE 802.1X / EAP
In ambito aziendale e universitario (**WPA2-Enterprise**, es. la rete **Eduroam**), la sicurezza non si basa su una password condivisa (PSK), ma sull'architettura a tre entità definita da **IEEE 802.1X**:
```
┌──────────────┐                 ┌───────────────┐                 ┌───────────────────────┐
│  SUPPLICANT  │◄──── EAPOL ────►│ AUTHENTICATOR │◄──── RADIUS ───►│ AUTHENTICATION SERVER │
│  (Terminale) │                 │ (Access Point)│                 │   (Server RADIUS/AAA) │
└──────────────┘                 └───────────────┘                 └───────────────────────┘
```
1. **Supplicant**: il software client a bordo del dispositivo dell'utente che richiede l'accesso.
2. **Authenticator**: l'Access Point Wi-Fi. Inizialmente mantiene il porto logico in stato "non controllato" (bloccato): lascia passare unicamente i pacchetti di autenticazione, bloccando qualsiasi traffico IP dell'utente verso la rete locale o Internet!
3. **Authentication Server (AS)**: il server centrale RADIUS/AAA (es. server d'Ateneo UniPG) che custodisce il database delle credenziali (LDAP, Active Directory).
- **Incapsulamento EAP**:
  - Tra Supplicant e AP i messaggi viaggiano incapsulati in trame Layer 2 chiamate **EAPOL (EAP over LAN)**.
  - Tra AP e AS viaggiano incapsulati su protocollo di rete **RADIUS** su porta UDP 1812.
  - L'AP agisce come un puro intermediario trasparente (gateway di traduzione tra EAPOL e RADIUS): non conosce né verifica la password dell'utente!
- **Metodi EAP Sicuri**:
  - **PEAP (Protected EAP)** o **EAP-TTLS**: il server RADIUS presenta un certificato digitale X.509 firmato da un'autorità riconosciuta. Il Supplicant valida il certificato e stabilisce un **tunnel cifrato TLS** sicuro con il server. All'interno del tunnel protetto, l'utente trasmette le proprie credenziali tramite MS-CHAPv2.
  - **EAP-TLS**: autenticazione mutua a certificati sia per il server che per il client (massima sicurezza, ma richiede un certificato installato su ogni dispositivo).
- Dettaglio note: [[Lezione 19 28 aprile - 01 - Architettura 802.1X EAP EAPOL e RADIUS|Architettura 802.1X, EAP e RADIUS]] e [[Lezione 19 28 aprile - 05 - Confronto WEP WPA WPA2 WPA3 Eduroam e Captive Portal UAM|Confronto Sistemi e Eduroam]].

### 3. La Gerarchia delle Chiavi in IEEE 802.11i
Al termine dell'autenticazione 802.1X/EAP, il client e il server RADIUS ricavano concordemente un segreto comune condiviso: la **MSK (Master Session Key)** a 512 bit. Il server RADIUS consegna la prima metà di questa chiave all'AP all'interno del messaggio protetto *RADIUS Access-Accept*.
Da qui discende l'intera gerarchia crittografica:
```
                                 [ MSK (512 bit) ] (in Enterprise)
                                        │
                                        ▼
                         [ PMK (Pairwise Master Key, 256 bit) ]
                       (In Personal: ricavata da PBKDF2(Password, SSID))
                                        │
                       ┌────────────────┴────────────────┐
                       │   Derivazione PRF con Nonces    │
                       │   (ANonce, SNonce, MAC_A, MAC_S)│
                       └────────────────┬────────────────┘
                                        │
                                        ▼
                         [ PTK (Pairwise Transient Key) ]
                                (512 bit o 384 bit)
                                        │
               ┌────────────────────────┼────────────────────────┐
               ▼                        ▼                        ▼
       [ KCK (128 bit) ]        [ KEK (128 bit) ]        [ TK (128 bit) ]
      Key Confirmation Key     Key Encryption Key          Temporal Key
    (Calcolo MIC Handshake)    (Cifratura della GTK)    (Cifratura Dati CCMP)
```
1. **PMK (Pairwise Master Key, 256 bit)**:
   - In modalità *Enterprise*: è estratta direttamente dalla MSK ($	ext{PMK} = 	ext{MSK}[0..255]$).
   - In modalità *Personal (WPA-PSK)*: non c'è il server RADIUS; la PMK è calcolata tramite l'algoritmo di hashing ripetuto $PBKDF2$:
     $$PMK = PBKDF2	ext{-}SHA1(	ext{Passphrase}, 	ext{SSID}, 4096	ext{ iterazioni}, 256	ext{ bit})$$
2. **PTK (Pairwise Transient Key, 384/512 bit)**:
   - È la chiave di sessione dinamica unica per quella specifica associazione terminale-AP.
   - È calcolata applicando una funzione pseudo-casuale (PRF) che mescola:
     - La chiave master segreta **PMK**;
     - La stringa identificativa "Pairwise key expansion";
     - I due indirizzi fisici: $\min(MAC_A, MAC_S) \parallel \max(MAC_A, MAC_S)$;
     - I due numeri casuali univoci (Nonce) generati per quella sessione: $\min(ANonce, SNonce) \parallel \max(ANonce, SNonce)$.
3. **Le tre sotto-chiavi ricavate dalla PTK**:
   - **KCK (Key Confirmation Key, 128 bit)**: usata per calcolare il codice di integrità crittografico (MIC) apposto sui messaggi 2, 3 e 4 dell'handshake.
   - **KEK (Key Encryption Key, 128 bit)**: usata dall'AP per cifrare la chiave di gruppo broadcast (GTK) prima di consegnarla alla stazione nel messaggio 3.
   - **TK (Temporal Key, 128 bit)**: la chiave effettivamente caricata nel motore hardware crittografico AES-CCMP per cifrare e decifrare tutto il traffico dati unicast dell'utente!
- Dettaglio note: [[Lezione 19 28 aprile - 02 - Gerarchia delle chiavi 802.11i - PMK PTK e sottochiavi KCK KEK TK|Gerarchia delle chiavi 802.11i]].

### 4. Il Four-Way Handshake (4-Way Handshake) Passo per Passo
Una delle domande cardine dell'esame del Prof. Femminella riguarda la successione temporale e la logica crittografica dei 4 messaggi scambiati tra AP e STA per validare l'autenticazione senza mai trasmettere la password o la PMK sul canale radio:

```
    STAZIONE (Supplicant)                               ACCESS POINT (Authenticator)
      [ Possiede PMK ]                                       [ Possiede PMK ]
             │                                                      │
             │           Messaggio 1: EAPOL-Key (ANonce)            │
             │◄─────────────────────────────────────────────────────│ (AP genera ANonce casuale)
             │                                                      │
[ STA genera SNonce casuale ]                                       │
[ STA calcola la PTK!       ]                                       │
[ (con PMK, ANonce, SNonce) ]                                       │
             │                                                      │
             │     Messaggio 2: EAPOL-Key (SNonce, RSN-IE, MIC_KCK) │
             │─────────────────────────────────────────────────────►│ (AP riceve SNonce)
             │                                                      │ [ AP calcola la PTK!     ]
             │                                                      │ [ AP verifica il MIC!    ]
             │                                                      │ (Se OK: STA ha la PMK!)
             │                                                      │
             │   Messaggio 3: EAPOL-Key (ANonce, Cifrato(GTK)_KEK, MIC)
             │◄─────────────────────────────────────────────────────│ (AP conferma RSN e Sequence)
[ STA verifica MIC con KCK  ]                                       │
[ STA decifra GTK con KEK   ]                                       │
[ STA installa PTK e GTK    ]                                       │
             │                                                      │
             │             Messaggio 4: EAPOL-Key (ACK, MIC_KCK)    │
             │─────────────────────────────────────────────────────►│ (AP riceve conferma)
             │                                                      │ [ AP installa PTK e GTK  ]
             │                                                      │ [ Sblocco Porta Dati L2  ]
═════════════╪══════════════════════════════════════════════════════╪════════════════════════
             ◄────────── TRAFFICO DATI IP CIFRATO CCMP (TK) ───────►
```

#### Analisi Dettagliata dei 4 Passaggi:
1. **Messaggio 1 ($AP 	o STA$)**:
   - L'AP genera un numero casuale a 256 bit: **$ANonce$**.
   - L'AP invia un frame EAPOL-Key contenente $ANonce$.
   - La stazione riceve $ANonce$. In questo istante la stazione dispone di tutti gli elementi: $PMK$, proprio $MAC$, $MAC$ dell'AP, $ANonce$ ricevuto e genera un proprio numero casuale **$SNonce$**.
   - **La stazione calcola istantaneamente la PTK (e quindi KCK, KEK, TK)!**
2. **Messaggio 2 ($STA 	o AP$)**:
   - La stazione risponde inviando $SNonce$ e le proprie preferenze di cifratura (RSN Information Element).
   - **La stazione calcola un codice MIC sul messaggio usando la sotto-chiave KCK appena derivata**.
   - L'AP riceve $SNonce$. Avendo ora sia $ANonce$ che $SNonce$, **l'AP deriva la medesima PTK e ricava la KCK**.
   - L'AP verifica il MIC allegato al messaggio 2:
     - Se il MIC è matematicamente valido, l'AP ha la **certezza assoluta che la stazione possiede la PMK corretta** (altrimenti non avrebbe potuto generare la KCK giusta)! L'identità dell'utente è autenticata!
3. **Messaggio 3 ($AP 	o STA$)**:
   - L'AP invia un messaggio protetto da MIC contenente la conferma dell'RSN-IE dell'AP (per scongiurare attacchi di downgrade) e il numero di sequenza per le chiavi di gruppo.
   - All'interno del messaggio, l'AP include la **GTK (Group Temporal Key)**, debitamente **cifrata tramite la sotto-chiave KEK**!
   - La stazione verifica il MIC: se valido, ha la certezza che l'AP possiede la PMK (autenticazione della rete). La stazione usa la KEK per decifrare la GTK e installa le chiavi per l'uso immediato.
4. **Messaggio 4 ($STA 	o AP$)**:
   - La stazione invia un semplice messaggio di conferma (ACK protetto da MIC con la KCK) per notificare che le chiavi temporanee PTK e GTK sono state installate.
   - L'AP riceve l'ACK, sblocca il porto controllato 802.1X: da questo secondo in poi, tutti i pacchetti dati IP scambiati tra stazione e AP vengono incapsulati e cifrati in hardware dal protocollo AES-CCMP usando la chiave temporanea **TK**!
- Note vault: [[Lezione 19 28 aprile - 03 - Four-Way Handshake di 802.11i e scambio delle chiavi|Four-Way Handshake]] e [[Lezione 19 28 aprile - 04 - Traffico broadcast multicast e Group Key Handshake GTK|Group Key Handshake GTK]].

### 5. Sistemi a Confronto: WPA2-Enterprise (Eduroam) vs Captive Portal (UAM)
All'esame orale il professore chiede spesso di confrontare la sicurezza di una rete come **Eduroam** rispetto a una rete pubblica con **Captive Portal**:

| Caratteristica | 802.1X / WPA2-Enterprise (es. Eduroam) | Captive Portal / UAM (es. Wi-Fi Hotel o Aeroporto) |
|:---|:---|:---|
| **Stato Radio L2** | Totalmente **CIFRATO (AES-CCMP)** per ogni utente | Totalmente **APERTO (Open System)**: nessuna cifratura L2 |
| **Chiavi Dinamiche** | Ogni stazione possiede una **TK univoca e dedicata** | Nessuna chiave; l'etere è completamente in chiaro |
| **Protezione da Sniffing** | **Totale**: un vicino non può decifrare i pacchetti altrui | **Nulla**: chiunque con Wireshark legge tutti i frame altrui! |
| **Autenticazione** | A livello 2 tramite 802.1X/EAP-PEAP verso server RADIUS | A livello applicativo L7: reindirizzamento HTTP/DNS su pagina web |
| **Passaggio Credenziali** | Dentro un tunnel TLS cifrato dal client al server RADIUS | Inviate a un server web locale (vulnerabile a DNS Spoofing) |
| **Efficienza Roaming** | Roaming L2 rapido trasparente nell'ESS (Fast Roaming) | Ad ogni cambio cella o scadenza lease l'utente deve re-autenticarsi |
| **Vulnerabilità Rogue AP** | Riconosciuto e bloccato grazie al certificato TLS del server | Estremamente vulnerabile ad attacchi Evil Twin (AP civetta) |

- Dettaglio note: [[Lezione 19 28 aprile - 05 - Confronto WEP WPA WPA2 WPA3 Eduroam e Captive Portal UAM|Confronto Sistemi e Captive Portal]] e [[Lezione 19 28 aprile - 06 - Wireshark - analisi Beacon tag RSN e profili Unipg eduroam|Analisi Wireshark tag RSN]].

---

## 🎯 Tipologie di Esercizi d'Esame Svolti sul WiFi

Nelle prove scritte e orali, il Prof. Femminella propone regolarmente tre precise tipologie di esercizi d'esame sul Wi-Fi:

### Esercizio 1: Risoluzione Indirizzi MAC e Instradamento Bridge AP
- **Traccia tipica**: "Una stazione wireless $STA_1$ associata all'Access Point $AP_A$ vuole inviare un pacchetto IP a un server $S$ attestato su una rete Ethernet cablata tramite uno switch. Indicare i valori dei flag `To DS`, `From DS` e i 4 campi d'indirizzo della trama 802.11 nel tratto radio, e confrontarli con l'header della trama Ethernet inoltrata dall'AP sullo switch."
- **Risoluzione d'Esame**:
  - Tratto Radio ($STA_1 	o AP_A$):
    - `To DS = 1, From DS = 0` (Uplink).
    - Address 1 (**RA**): $MAC_{AP\_A}$ (l'Access Point che riceve il frame via radio).
    - Address 2 (**TA**): $MAC_{STA\_1}$ (la stazione trasmittente).
    - Address 3 (**DA**): $MAC_{Server}$ (la destinazione finale del pacchetto).
    - Address 4: Assente.
  - Tratto Cablato Ethernet ($AP_A 	o Switch 	o Server$):
    - L'Access Point è un bridge a livello 2 (802.1D): converte l'header 802.11 in un header Ethernet standard a due indirizzi:
    - Destinazione Ethernet: $MAC_{Server}$ (estratto da Address 3).
    - Sorgente Ethernet: $MAC_{STA\_1}$ (estratto da Address 2).
    - L'indirizzo MAC dell'Access Point **scompare completamente** dall'header Ethernet cablato!
- Nota vault: [[Lezione 19 28 aprile - 08 - Esercizio d esame - indirizzamento MAC 802.11 To DS From DS e posizioni AP|Esercizio d'esame - Indirizzamento MAC]] e [[Lezione 19 28 aprile - 09 - Esercizio d esame - instradamento L2 vs L3 e risoluzione ARP con AP e router|Esercizio d'esame - Instradamento L2 vs L3]].

### Esercizio 2: Calcolo Efficienza Block Ack e Limite A-MPDU in 802.11n
- **Traccia tipica**: "Calcolare il throughput netto a livello MAC di una trasmissione A-MPDU a 802.11n operante con canale a 40 MHz, Short Guard Interval e MIMO $2 	imes 2$ (MCS 15, PHY Rate = 300 Mbps), ipotizzando l'aggregazione di 32 frame da 1500 byte e confrontarlo con la trasmissione singola senza aggregazione."
- **Formula dell'Efficienza MAC**:
  $$\eta = rac{T_{Payload}}{T_{Transazione}} = rac{N \cdot rac{8 \cdot L_{Data}}{R_{PHY}}}{T_{DIFS} + T_{Backoff} + T_{Preambolo} + N \cdot T_{MPDU} + T_{SIFS} + T_{BA}}$$
  Senza aggregazione ($N=1$): per ogni pacchetto da 1500 byte ($40	ext{ }\mu	ext{s}$) si pagano oltre $150	ext{ }\mu	ext{s}$ di overhead, portando l'efficienza reale a meno del **25%** ($75	ext{ Mbps}$ su 300 Mbps fisici).
  Con aggregazione A-MPDU ($N=32$): il tempo utile di trasmissione sale a $32 	imes 40 = 1280	ext{ }\mu	ext{s}$, ammortizzando gli overhead fissi e portando l'efficienza oltre l'**85%** ($255	ext{ Mbps}$ effettivi)!
- Nota vault: [[Lezione 19 28 aprile - 10 - Esercizio d esame - 802.11n calcolo finestra Block Ack e limite aggregato|Esercizio d'esame - Calcolo finestra Block Ack]].

---

## 📋 Tavola Sinottica di Ripasso Veloce per l'Orale

| Concetto Chiave | Definizione Sintetica da Rispondere all'Esame | Riferimento Principale |
|:---|:---|:---|
| **Canali 2.4 GHz** | 1, 6, 11: terna di canali a 20 MHz non sovrapposti (ortogonali) per evitare interferenze adiacenti. | [[Lezione 13 5 aprile - 02 - Versioni 802.11 modulazioni canali ISM e distanze\|Lezione 13]] |
| **To DS / From DS** | `1 0` = Uplink (Addr3=DA); `0 1` = Downlink (Addr3=SA); `1 1` = WDS bridge AP-to-AP (Addr3=DA, Addr4=SA). | [[Lezione 14 7 aprile - 03 - Indirizzamento 802.11 uplink downlink DS\|Lezione 14]] |
| **SIFS vs DIFS** | SIFS è il minimo tempo di guardia (riservato per ACK/CTS immediati); DIFS = $SIFS + 2\cdot SlotTime$ per accesso dati. | [[Lezione 14 7 aprile - 06 - MAC 802.11 CSMA-CA DCF Basic Access\|Lezione 14]] |
| **Virtual Carrier Sensing** | Timer NAV impostato dal campo Duration dell'header MAC: canale occupato anche senza segnale fisico RF. | [[Lezione 15 12 aprile - 01 - ACK nascosto Virtual Carrier Sensing e NAV\|Lezione 15]] |
| **Terminale Nascosto** | Risolto con handshake RTS/CTS: il CTS emesso dall'AP zittisce tutti i nodi nascosti per l'intera durata. | [[Lezione 15 12 aprile - 02 - Terminale nascosto e handshake RTS-CTS\|Lezione 15]] |
| **EIFS** | Scatta se la decodifica fallisce ($SIFS + DIFS + T_{ACK}$): serve a proteggere l'ACK di una trasmissione altrui. | [[Lezione 15 12 aprile - 03 - Decodifica errata e intervallo EIFS\|Lezione 15]] |
| **Performance Anomaly** | In DCF le stazioni lente monopolizzano l'airtime degradando il throughput di tutte le stazioni veloci. | [[Lezione 15 12 aprile - 05 - Throughput e Performance Anomaly di 802.11\|Lezione 15]] |
| **TIM vs DTIM** | TIM: bitmap per traffico unicast bufferizzato delle stazioni in sleep; DTIM: risveglio collettivo per broadcast. | [[Lezione 16 14 aprile - 03 - Traffic Indication Map TIM DTIM e Null Frames\|Lezione 16]] |
| **CTS-to-self** | Meccanismo ERP: CTS a 1 Mbps legacy emesso dal trasmettitore per settare il NAV dei nodi 802.11b prima di un frame OFDM. | [[Lezione 16 14 aprile - 06 - Schemi di Protezione ERP e Meccanismo CTS-to-self\|Lezione 16]] |
| **Access Categories (EDCA)**| 4 code (VO, VI, BE, BK) differenziate da parametri AIFS, CWmin, CWmax e limite TXOP. | [[Lezione 17 21 aprile - 03 - Parametri di Contesa AIFS Contention Window e Access Categories\|Lezione 17]] |
| **TXOP** | Intervallo temporale garantito per frame bursting consecutivo a separazione SIFS: realizza l'Airtime Fairness. | [[Lezione 17 21 aprile - 02 - Transmission Opportunity TXOP e Controllo di Accesso EDCA\|Lezione 17]] |
| **A-MSDU vs A-MPDU** | A-MSDU: unico MAC header e unico CRC-32 (fragile); A-MPDU: concatenazione di MPDU con CRC-32 selettivo e Block Ack. | [[Lezione 18 26 aprile - 03 - Aggregazione A-MPDU RIFS e confronto tra i due schemi\|Lezione 18]] |
| **Block Ack (BA)** | Riscontro cumulativo con bitmap a 64 bit che conferma fino a 64 MPDU con ritrasmissione selettiva. | [[Lezione 18 26 aprile - 04 - Block Ack - struttura bitmap e modalita\|Lezione 18]] |
| **Fallimento WEP** | IV corto a 24 bit inviato in chiaro, cifrario a flusso RC4 con chiavi deboli (attacco FMS) e CRC-32 lineare (bit-flipping). | [[Lezione 18 26 aprile - 08 - WEP - vettore di inizializzazione RC4 e attacco ARP injection\|Lezione 18]] |
| **802.1X / EAP** | Architettura a 3 entità: Supplicant, Authenticator (AP) e Authentication Server (RADIUS), standard di Eduroam. | [[Lezione 19 28 aprile - 01 - Architettura 802.1X EAP EAPOL e RADIUS\|Lezione 19]] |
| **Four-Way Handshake** | 4 messaggi EAPOL-Key che derivano e confermano la PTK (KCK, KEK, TK) tramite ANonce e SNonce senza trasmettere la PMK. | [[Lezione 19 28 aprile - 03 - Four-Way Handshake di 802.11i e scambio delle chiavi\|Lezione 19]] |
| **Eduroam vs Captive Portal** | Eduroam: cifrato L2 AES-CCMP end-to-end con 802.1X; Captive Portal: radio totalmente aperta in chiaro (vulnerabile a sniffing). | [[Lezione 19 28 aprile - 05 - Confronto WEP WPA WPA2 WPA3 Eduroam e Captive Portal UAM\|Lezione 19]] |
