# Riassunto Integrato d'Esame: Internet of Things (IoT) e Web of Things (Lezioni 20-22)

> **Materia**: Reti Wireless · **Docente**: Prof. Mauro Femminella  
> **Lezioni di Riferimento**: Lezione 20 (3 maggio), Lezione 21 (5 maggio), Lezione 22 (12 maggio)  
> **Nucleo Tematico**: Architettura IoT, Web of Things (WoT), HTTP/REST vs MQTT (Pub/Sub), Gestione dello Stato e Analisi Comparativa dell'Overhead  
> **Mappa Concettuale Collegata**: [[IoT.excalidraw|Mappa Concettuale Vettoriale IoT]]

---

## 🧭 Mappa Concettuale Generale dell'IoT e Web of Things

```text
========================================================================================================================
                       MAPPA CONCETTUALE INTERNET OF THINGS & WEB OF THINGS (LEZIONI 20-22)
========================================================================================================================

 [ARCHITETTURA GENERALE IoT (LEZ. 20)]
  ├── Smart Objects ("Things"): Sensori, attuatori, microcontrollori vincolati (RAM/Flash limitate, batteria decennale)
  ├── Edge Computing & IoT Gateway: Bridging di protocollo (Zigbee/BLE/LoRa -> IP), aggregazione dati e filtraggio locale
  ├── Web of Things (WoT): Integrazione degli Smart Objects nei protocolli applicativi standard del Web (Livello 7)
  └── Trade-off Chiave: Potenza di calcolo e consumo energetico vs interoperabilità e semplicità di sviluppo
         │
         ▼
 [PARADIGMA RESTful ED HTTP (LEZ. 20 & 21)]
  ├── Modello Client-Server: Sincrono, orientato alla connessione, basato su Request-Response
  ├── Identificazione Risorse: URI/URL gerarchici univoci (es. /api/v1/sensors/temp_01)
  ├── Verbi CRUD HTTP: GET (lettura idempotente), POST (creazione), PUT (sostituzione), DELETE (cancellazione)
  ├── Codici di Stato: 200 OK, 201 Created, 204 No Content, 400 Bad Request, 404 Not Found, 500 Server Error
  ├── Formati Dati: JSON (compatto, human-readable, nativo Web) vs XML (verboso, pesante per MCU vincolate)
  └── Limiti Critici di HTTP in IoT: Elevato overhead di trasporto/header testuali e assenza nativa di push dal server
         │
         ▼
 [PATTERN DI SINCRONIZZAZIONE: POLLING VS NOTIFICA (LEZ. 21)]
  ├── Polling Periodico: Il client interroga il server a intervalli regolari T -> Spreco enorme se i dati non cambiano
  ├── Event-Driven Webhook: Il dispositivo notifica il server solo al variare della misura -> Efficienza massima a basso change rate
  └── Trade-off Matematico d'Esame: Soglia analitica di convenienza tra Polling e Notifica in funzione del tasso di variazione λ
         │
         ▼
 [PARADIGMA PUBLISH-SUBSCRIBE ED MQTT (LEZ. 22)]
  ├── Disaccoppiamento Totale: Spaziale (mittente/destinatario non si conoscono), Temporale (possono non essere online insieme) e di Sincronizzazione
  ├── Architettura a Broker Centrale: Smistamento messaggi da Publisher verso molteplici Subscriber
  ├── Connessione TCP Persistente: Mantenuta attiva tramite pacchetti minimi PINGREQ / PINGRESP (Keep-Alive)
  ├── Attraversamento NAT & Firewall: Il client inizia sempre la connessione verso il Broker pubblico (outbound consentito)
  ├── Spazio dei Topic: Struttura gerarchica (/campus/edificioA/piano1/sensoreTemp) con Wildcard:
  │    ├── Singolo Livello: '+' (es. /campus/+/piano1/sensoreTemp)
  │    └── Multi-Livello: '#' (es. /campus/edificioA/#)
  └── Controllo di Flusso e Affidabilità:
       ├── Livelli di QoS: QoS 0 (at most once), QoS 1 (at least once con PUBACK), QoS 2 (exactly once a 4 vie)
       ├── Sessioni Persistenti (CleanSession = 0): Il broker accumula i messaggi per subscriber temporaneamente offline
       ├── Retained Messages: Il broker memorizza l'ultimo valore valido per inviarlo all'istante ai nuovi sottoscrittori
       └── Last Will and Testament (LWT): Messaggio di emergenza inviato automaticamente dal broker in caso di crash/timeout del nodo
========================================================================================================================
```

---

## Lezione 20 (3 Maggio): Fondamenti IoT, Web of Things e Architettura RESTful

### 1. Il Paradigma Internet of Things (IoT)
L'Internet of Things estende la connettività IP dal mondo dei computer e smartphone al mondo degli oggetti fisici (**Smart Objects** o *Things*):
* **Caratteristiche degli Smart Objects**: dispositivi equipaggiati con sensori (grandezze ambientali, industriali, biometriche), attuatori (relè, motori, valvole) e microcontrollori vincolati (MCU con poche decine di KB di RAM, clock a MHz e alimentazione a batteria decennale o energy harvesting).
* **Il Ruolo dell'IoT Gateway**: la stragrande maggioranza dei sensori sul campo non parla direttamente IP (usano standard a corto raggio a bassissimo consumo come IEEE 802.15.4, Zigbee, Bluetooth Low Energy, o LPWAN come LoRaWAN). L'**IoT Gateway** funge da ponte:
  1. *Traduzione di protocollo*: converte trame radio proprietarie/locali in pacchetti TCP/IP.
  2. *Edge Computing*: esegue filtraggio locale, aggregazione dati, rilevamento anomalie e pre-elaborazione per evitare di inondare il cloud di dati grezzi ridondanti.
  3. *Sicurezza e cifratura*: gestisce canali protetti TLS verso la rete geografica.

### 2. Dal Machine-to-Machine al Web of Things (WoT)
* Negli anni 2000 l'approccio prevalente era il **M2M (Machine-to-Machine)**: silos verticali chiusi, ciascuno con protocolli proprietari e applicazioni dedicate.
* Il **Web of Things (WoT)** supera la frammentazione applicando a Livello 7 i principi aperti e universali del World Wide Web:
  * Ogni sensore, attuatore o dato diventa una **risorsa Web** identificabile tramite un indirizzo standard.
  * Gli sviluppatori possono interrogare o comandare gli oggetti mediante comuni richieste HTTP o WebSocket, senza dover conoscere i dettagli fisici del sensore.

### 3. Identificazione delle Risorse: URI ed URL
* **URI (Uniform Resource Identifier)**: stringa che identifica univocamente una risorsa logica o fisica.
* **URL (Uniform Resource Locator)**: specifica non solo l'identità, ma anche il meccanismo primario di accesso (protocollo) e la locazione di rete:
  $$\text{URL} = \underbrace{\text{http://}}_{\text{schema}} \underbrace{\text{iot.azienda.com:8080}}_{\text{autorità / host:porta}} \underbrace{\text{/api/v1/sensori/temperatura}}_{\text{percorso gerarchico}} \underbrace{\text{?stanza=101\&unita=C}}_{\text{query string}}$$

### 4. Il Protocollo HTTP e la sua Evoluzione
HTTP opera secondo il classico modello **Client-Server Request-Response**:
* **HTTP/1.0**: una nuova connessione TCP a tre vie (Three-Way Handshake) per ciascun singolo scambio richiesta/risposta. Inefficiente per IoT a causa del pesante overhead di setup e teardown TCP per trasmettere pochi byte di telemetria.
* **HTTP/1.1**: introduce le **connessioni persistenti (*Keep-Alive*)**: la connessione TCP rimane aperta per trasferire multiple richieste e risposte consecutive, riducendo drasticamente la latenza e l'overhead di segnalazione. Introduce inoltre il *pipelining* e il trasferimento a blocchi (*Chunked Transfer Encoding*).

### 5. Architettura RESTful e Vincoli di Fielding
Roy Fielding ha formalizzato l'architettura **REST (Representational State Transfer)**, fondata su 6 vincoli architetturali:
1. **Client-Server**: separazione netta tra interfaccia utente/sensore e gestione dei dati/storage.
2. **Stateless (Privo di Stato)**: ogni singola richiesta deve contenere tutte le informazioni necessarie per essere compresa ed eseguita dal server. Il server non memorizza alcun contesto di sessione tra una richiesta e l'altra (scalabilità estrema).
3. **Cacheable**: le risposte devono dichiararsi esplicitamente memorizzabili in cache o meno, per ridurre il traffico ridondante.
4. **Uniform Interface (Interfaccia Uniforme)**:
   * Identificazione univoca delle risorse tramite URI.
   * Manipolazione delle risorse attraverso le loro rappresentazioni (es. invio di un documento JSON).
   * Messaggi auto-descrittivi (header `Content-Type`).
   * HATEOAS (*Hypermedia As The Engine Of Application State*): la risposta include link ipertestuali per navigare verso stati successivi.
5. **Layered System (Sistema a Strati)**: il client non sa (e non deve sapere) se è connesso direttamente al server finale o a un intermediario (proxy, gateway, load balancer, firewall).
6. **Code on Demand** (opzionale): possibilità per il server di inviare codice eseguibile al client.

### 6. I Verbi HTTP e le Operazioni CRUD
Nei sistemi IoT RESTful, i metodi standard HTTP mappano le operazioni CRUD sui dati dei sensori:
* **GET** (Read): recupera la rappresentazione corrente dello stato di una risorsa. È **idempotente** e **sicuro** (non altera lo stato del server).
* **POST** (Create): invia dati al server per creare una nuova risorsa subordinata (es. registrazione di un nuovo sensore). Non è idempotente.
* **PUT** (Update / Replace): sostituisce integralmente lo stato della risorsa identificata dall'URI con il payload fornito. È idempotente.
* **PATCH** (Partial Update): modifica solo alcuni campi specifici della risorsa (es. aggiorna solo la temperatura lasciando invariata l'umidità).
* **DELETE** (Delete): rimuove la risorsa specificata dall'URI. È idempotente.

### 7. Formati Dati: JSON vs XML
* **XML (eXtensible Markup Language)**: fortemente tipizzato e validabile con XSD, ma estremamente verboso a causa della duplicazione dei tag di chiusura (`<temperatura>21.5</temperatura>`). Richiede parser complessi con elevato footprint di memoria RAM, risultando poco adatto a MCU embedded vincolate.
* **JSON (JavaScript Object Notation)**: formato testuale compatto basato su coppie chiave-valore e array:
  ```json
  {
    "sensor_id": "temp_room_101",
    "timestamp": 1683100800,
    "value": 21.5,
    "unit": "Celsius"
  }
  ```
  Molto più leggero da trasmettere via radio, facilissimo da parsare ed elaborare in qualsiasi linguaggio moderno.

### 8. I Limiti Critici di HTTP nell'IoT
Sebbene HTTP sia onnipresente e attraversi agevolmente firewall e proxy web aziendali (porte standard 80 e 443), presenta gravi limiti intrinseci per l'IoT:
1. **Enorme Overhead Testuale**: gli header HTTP (`Host`, `User-Agent`, `Accept`, `Content-Type`) pesano centinaia di byte (spesso $200 \div 500\text{ byte}$ per trasportare un payload numerico di soli $4\text{ byte}$).
2. **Modello Unidirezionale (Pull)**: solo il client può iniziare una comunicazione. Il server non può contattare spontaneamente uno Smart Object per inviargli un comando se lo Smart Object si trova dietro un NAT, costringendo all'uso del polling continuo.

---

## Lezione 21 (5 Maggio): Pattern di Sincronizzazione, Efficienza e Confronto Analitico

### 1. Pattern Architetturali di Comunicazione
Nell'interazione tra Smart Objects e applicazioni centralizzate emergono due pattern antitetici:

#### A. Polling Periodico Sincrono (Request-Response)
Il client interroga ciclicamente il server a intervalli regolari di periodo $T_{\text{poll}}$:
* **Vantaggi**: implementazione elementare; non richiede canali persistenti né server capaci di iniziare connessioni verso l'esterno.
* **Criticità Sistemistiche**:
  1. *Latenza intrinseca di rilevamento*: se una grandezza cambia subito dopo un'interrogazione, il sistema la rileva con un ritardo medio pari a:
     $$E[D] = \frac{T_{\text{poll}}}{2}$$
  2. *Spreco energetico e di banda*: se la grandezza non varia per lungo tempo (es. sensore di fumo o allarme), ogni singola richiesta HTTP riceve una risposta identica alla precedente. Il $99\%$ del traffico generato trasporta informazione nulla.

#### B. Notifica Asincrona su Evento (Event-Driven / WebHook)
Il dispositivo rimane silenzioso e trasmette una richiesta HTTP POST (o notifica) verso un endpoint (*WebHook*) **soltanto quando si verifica un evento significativo** (superamento di soglia, variazione di stato $\Delta S > \epsilon$):
* **Vantaggi**: azzera le comunicazioni inutili; notifica tempestiva e immediata al momento del cambio.
* **Criticità**: richiede che il ricevitore sia sempre raggiungibile (IP pubblico o dominio con certificato valido).

---

### 2. Esercizio d'Esame: Calcolo dell'Efficienza di Trasferimento HTTP
All'esame orale il docente chiede frequentemente di quantificare l'efficienza di un pacchetto di telemetria HTTP:

**Quesito Tipico**:
Un sensore IoT trasmette una misura di temperatura di $4\text{ byte}$ incapsulata in un oggetto JSON:
`{"temp":21.5}` (lunghezza payload: $15\text{ byte}$).
L'header HTTP della richiesta POST misura $185\text{ byte}$.
La richiesta viaggia su protocollo TCP/IP su interfaccia Ethernet:
* Header TCP: $20\text{ byte}$
* Header IPv4: $20\text{ byte}$
* Header Ethernet: $14\text{ byte}$ (+ $4\text{ byte}$ FCS CRC)

**Calcolo**:
* Dimensione totale a livello 2 del frame trasmesso:
  $$L_{\text{tot}} = 14 + 20 + 20 + 185 + 15 + 4 = 258\text{ byte}$$
* Efficienza utile rispetto al payload JSON:
  $$\eta_{\text{JSON}} = \frac{15}{258} \approx 5.81\%$$
* Efficienza utile rispetto al solo dato numerico grezzo ($4\text{ byte}$ float):
  $$\eta_{\text{dato}} = \frac{4}{258} \approx 1.55\%$$
> **Conclusione d'Esame**: oltre il **$98\%$ della banda radio ed energetica** viene sprecata in overhead di protocollo. Questo dimostra la necessità di protocolli binari ultra-compatti come MQTT o CoAP.

---

### 3. Esercizio d'Esame: Confronto Analitico tra Polling e Notifica Asincrona
Il docente richiede di formalizzare la condizione matematica per cui la Notifica su evento risulta più efficiente del Polling.

**Modellazione Matematica**:
* Sia $T_{\text{obs}}$ l'intervallo temporale di osservazione complessivo.
* Nel **Polling**, il client effettua un'interrogazione ogni $T_{\text{poll}}$ secondi.
  Il numero totale di transazioni HTTP è:
  $$N_{\text{poll}} = \frac{T_{\text{obs}}}{T_{\text{poll}}}$$
  Ciascuna transazione comporta uno scambio completo richiesta/risposta di dimensione $B_{\text{poll}} = B_{\text{req}} + B_{\text{resp}}$ byte. Il volume dati totale generato è:
  $$V_{\text{poll}} = N_{\text{poll}} \cdot B_{\text{poll}} = \frac{T_{\text{obs}}}{T_{\text{poll}}} \cdot B_{\text{poll}}$$
* Nella **Notifica Asincrona (Event-driven)**, il nodo trasmette solo al verificarsi di una variazione. Sia $\lambda$ la frequenza media delle variazioni (eventi per secondo, tasso del processo di Poisson).
  Il numero medio di eventi nel periodo $T_{\text{obs}}$ è:
  $$N_{\text{notif}} = \lambda \cdot T_{\text{obs}}$$
  Ogni notifica comporta una trasmissione di dimensione $B_{\text{notif}}$ byte. Il volume dati totale generato è:
  $$V_{\text{notif}} = \lambda \cdot T_{\text{obs}} \cdot B_{\text{notif}}$$

**Soglia di Convenienza**:
La Notifica asincrona genera meno traffico del Polling se e solo se $V_{\text{notif}} < V_{\text{poll}}$:
$$\lambda \cdot T_{\text{obs}} \cdot B_{\text{notif}} < \frac{T_{\text{obs}}}{T_{\text{poll}}} \cdot B_{\text{poll}}$$
Semplificando $T_{\text{obs}}$:
$$\lambda < \frac{1}{T_{\text{poll}}} \cdot \frac{B_{\text{poll}}}{B_{\text{notif}}}$$
Se supponiamo per semplicità $B_{\text{notif}} \approx B_{\text{poll}}$ (entrambi scambi HTTP di dimensione simile):
$$\lambda < \frac{1}{T_{\text{poll}}} \iff T_{\text{evento}} = \frac{1}{\lambda} > T_{\text{poll}}$$
> **Regola Aurea per l'Orale**:
> 1. Se gli eventi sono **rari** ($\lambda$ piccolo, tempo medio tra eventi molto lungo rispetto al periodo di polling desiderato), la **Notifica asincrona è infinitamente superiore** perché azzera il traffico nei periodi di calma.
> 2. Se la grandezza varia **frequentemente e continuamente** ($\lambda > 1/T_{\text{poll}}$, es. vibrazioni ad alta frequenza o streaming continuo), il **Polling periodico è più efficiente**, poiché funge da campionamento a frequenza controllata evitando la saturazione da raffiche di notifiche.

---

## Lezione 22 (12 Maggio): Architettura Publish-Subscribe e Protocollo MQTT

### 1. L'Architettura Publish-Subscribe
Per superare la rigidità punto-a-punto di HTTP, l'IoT adotta l'architettura **Publish-Subscribe (Pub/Sub)**, caratterizzata da un **disaccoppiamento totale** tra produttori e consumatori di dati:
1. **Disaccoppiamento nello Spazio**: Publisher e Subscriber non conoscono l'identità né l'indirizzo IP reciproco. Comunicano esclusivamente tramite un nodo intermedio centrale denominato **Broker**.
2. **Disaccoppiamento nel Tempo**: Publisher e Subscriber non devono necessariamente essere attivi e connessi contemporaneamente (grazie al buffering del Broker per le sessioni persistenti).
3. **Disaccoppiamento nella Sincronizzazione**: la pubblicazione è asincrona; il publisher invia il dato al broker e prosegue le proprie operazioni senza attendere la ricezione da parte dei subscriber.

```text
               ┌───────────────┐
               │  PUBLISHER A  │ (Sensore Temp)
               └───────┬───────┘
                       │ Publish: /casa/salotto/temp = 21.5
                       ▼
               ┌───────────────┐  Subscribe: /casa/+/temp  ┌───────────────┐
               │               ├──────────────────────────►│ SUBSCRIBER 1  │ (Display)
               │  MQTT BROKER  │                           └───────────────┘
               │   (Centrale)  │  Subscribe: /casa/#       ┌───────────────┐
               │               ├──────────────────────────►│ SUBSCRIBER 2  │ (Cloud DB)
               └───────▲───────┘                           └───────────────┘
                       │ Publish: /casa/cucina/fumo = 0
               ┌───────┴───────┐
               │  PUBLISHER B  │ (Sensore Fumo)
               └───────────────┘
```

### 2. Il Protocollo MQTT (Message Queuing Telemetry Transport)
Creato da Andy Stanford-Clark (IBM) e Arlen Nipper nel 1999 per monitorare oleodotti via satellite, standardizzato da OASIS e ISO:
* **Protocollo Binario e Minimale**: l'header fisso di un pacchetto MQTT misura **soli 2 byte** (rispetto alle centinaia di byte di un header HTTP).
* **Trasporto Affidabile**: opera sopra lo stack **TCP/IP** (porta standard non cifrata 1883, cifrata TLS 8883).
* **Attraversamento NAT e Firewall Trasparente**:
  * Negli Smart Object domestici o industriali, i sensori risiedono dietro firewall aziendali o router con NAT che bloccano qualunque connessione entrante dall'esterno.
  * In MQTT, è il client (sia publisher che subscriber) a **inizializzare la connessione TCP verso l'esterno (outbound)** in direzione del Broker pubblico. Una volta aperta, la connessione bidirezionale rimane aperta indefinitamente: il Broker può inviare messaggi push al client in qualsiasi istante senza violare le policy del firewall!

### 3. Spazio dei Topic e Meccanismi di Wildcard
I messaggi in MQTT non contengono metadati applicativi nell'header, ma vengono instradati in base al campo testuale **Topic**:
* Struttura ad albero gerarchica case-sensitive con separatore `/`:
  `ateneo/ingegneria/edificioB/piano2/aula12/temperatura`
* Un subscriber può registrarsi su un singolo topic esatto oppure aggregare più canali mediante due caratteri **Wildcard**:
  1. **Wildcard a Singolo Livello (`+`)**:
     * Sostituisce esattamente un singolo livello gerarchico tra due slash.
     * Esempio: `ateneo/ingegneria/edificioB/+/aula12/temperatura` cattura la temperatura dell'aula 12 di qualsiasi piano (`piano1`, `piano2`, ecc.), ma non sottolivelli ulteriori.
  2. **Wildcard Multi-Livello (`#`)**:
     * Cattura tutti i livelli gerarchici sottostanti fino alla fine dell'albero.
     * Deve essere posizionata tassativamente **come ultimo carattere del topic**.
     * Esempio: `ateneo/ingegneria/#` riceve qualsiasi messaggio emesso all'interno della facoltà di ingegneria a qualsiasi profondità.
* **Topic di Sistema (`$SYS/`)**: topic speciali riservati al broker che pubblicano metriche interne (numero di client connessi, carico CPU, messaggi al secondo). Non vengono catturati dalla wildcard `#`.

### 4. Connessione Persistente e Meccanismo di Keep-Alive
Per mantenere aperta la connessione TCP attraverso NAT che chiuderebbero le tabelle di stato per inattività:
* Il client negozia nel pacchetto di connessione iniziale `CONNECT` un intervallo di **Keep Alive** (espresso in secondi, es. $60\text{ s}$).
* Se durante tale intervallo non vi è stato alcun traffico dati, il client trasmette un pacchetto ultraleggero di controllo **`PINGREQ` (2 byte)**.
* Il broker risponde immediatamente con un **`PINGRESP` (2 byte)**.
* Se il broker non riceve né dati né ping entro $1.5 \times \text{KeepAlive}$, dichiara la connessione caduta, chiude il socket TCP e innesca il meccanismo di emergenza *Last Will and Testament*.

### 5. I Tre Livelli di Quality of Service (QoS) in MQTT
MQTT consente di selezionare la garanzia di consegna messaggio per messaggio:

```text
QoS 0: "At most once" (Fire & Forget)
Publisher ─────────── PUBLISH ───────────► Broker
(Nessun riscontro, zero overhead, rischio perdita)

QoS 1: "At least once" (Consegna Garantita, possibili duplicati)
Publisher ─────────── PUBLISH (PacketId=10) ───────────► Broker
Publisher ◄────────── PUBACK  (PacketId=10) ─────────── Broker
(Ritrasmette se PUBACK scade; il subscriber può ricevere duplicati)

QoS 2: "Exactly once" (Handshake a 4 vie, consegna esattamente una volta)
Publisher ─────────── PUBLISH (PacketId=25) ───────────► Broker
Publisher ◄────────── PUBREC  (PacketId=25) ─────────── Broker
Publisher ─────────── PUBREL  (PacketId=25) ───────────► Broker
Publisher ◄────────── PUBCOMP (PacketId=25) ─────────── Broker
(Handshake a 4 vie a prova di duplicazione; massima affidabilità e maggior costo)
```

1. **QoS 0 (At most once - Al massimo una volta)**:
   * Meccanismo *Fire and Forget*. Il messaggio viene inviato una sola volta senza richiedere conferma.
   * Nessun Packet Identifier, nessun buffer di ritrasmissione.
   * Adatto a misure ambientali frequenti dove la perdita di un singolo campione è ininfluente.
2. **QoS 1 (At least once - Almeno una volta)**:
   * Garantisce che il messaggio giunga a destinazione, ma **può generare copie duplicate**.
   * Il messaggio viaggia con un `PacketId` univoco. Il ricevitore risponde con un pacchetto **`PUBACK`**.
   * Se il trasmettitore non riceve il `PUBACK` entro un timeout, ritrasmette il messaggio impostando il flag di duplicazione (**DUP flag**). Il ricevitore potrebbe quindi elaborare due volte la stessa lettura.
3. **QoS 2 (Exactly once - Esattamente una volta)**:
   * Livello di massima affidabilità: assicura che il messaggio arrivi e che venga elaborato **una sola ed unica volta**, eliminando sia perdite che duplicati.
   * Si articola in un **handshake crittografico a 4 vie**:
     1. Mittente invia `PUBLISH` con PacketId.
     2. Ricevitore memorizza l'ID e risponde con `PUBREC` (*Publish Received*).
     3. Mittente invia `PUBREL` (*Publish Release*) comunicando che può liberare la risorsa.
     4. Ricevitore cancella l'ID e risponde con `PUBCOMP` (*Publish Complete*).
   * Indispensabile per transazioni critiche, telemetria finanziaria o comandi ad attuatori (es. erogazione farmaci, cancelli automatici).

### 6. Gestione dello Stato: Sessioni Persistenti, Retain e Last Will

#### A. Sessioni Persistenti (CleanSession Flag)
Nel messaggio iniziale `CONNECT`, il client imposta il flag **`CleanSession`**:
* **`CleanSession = 1` (Sessione Volatile)**: alla disconnessione del client, il broker distrugge tutte le sottoscrizioni e svuota le code.
* **`CleanSession = 0` (Sessione Persistente)**: il broker memorizza il `ClientID`. Se il client si disconnette (es. spegnimento temporaneo o caduta radio), il broker **mantiene attive le sue sottoscrizioni e accumula in una coda bufferizzata tutti i messaggi QoS 1 e QoS 2** emessi durante la sua assenza. Al momento della riconnessione, il broker recapita immediatamente l'intera cronologia non recapitata.

#### B. Retained Messages (Messaggi Conservati)
Normalmente, se un publisher invia un messaggio su un topic e in quell'istante nessun subscriber è online, il messaggio viene scartato dal broker.
* Se il publisher imposta il flag **`RETAIN = 1`**, il broker esegue due azioni:
  1. Consegna normalmente il messaggio a tutti i subscriber attualmente connessi.
  2. **Memorizza l'ultimo messaggio valido e lo conserva in memoria permanentemente** per quel determinato topic.
* Quando un nuovo subscriber si connette in un momento futuro e si sottoscrive a quel topic, il broker gli trasmette **immediatamente l'ultimo messaggio trattenuto**, senza dover attendere che il publisher si risvegli e pubblichi un nuovo dato.

#### C. Last Will and Testament (LWT - Testamento Biologico)
Come fa il sistema a sapere se un sensore si è spento bruscamente (batteria scarica, cavo tranciato, guasto hardware)?
* Durante la fase di connessione iniziale (`CONNECT`), il client deposita presso il broker un messaggio speciale: il proprio **Testamento (LWT)**, specificando topic, payload, QoS e retain (es. Topic `/sensori/nodo5/status`, Payload `"OFFLINE"`).
* Se il client si disconnette regolarmente inviando il pacchetto `DISCONNECT`, il broker cancella il testamento senza trasmetterlo.
* Se invece il socket TCP cade improvvisamente senza preavviso (o scade il timeout del Keep-Alive), il broker **pubblica istantaneamente il messaggio LWT a tutti i subscriber registrati**. Tutti i nodi vengono avvisati all'istante del guasto senza bisogno di polling.

---

### 7. Tavola Sinottica Comparativa Finale: HTTP vs MQTT

| Parametro Architetturale | HTTP (RESTful) | MQTT |
| :--- | :--- | :--- |
| **Paradigma di Comunicazione** | Request-Response sincrono (Client-Server) | Publish-Subscribe asincrono (tramite Broker) |
| **Disaccoppiamento** | Accoppiato nello spazio e nel tempo | Totalmente disaccoppiato (spazio, tempo, sync) |
| **Dimensione Minima Header** | Centinaia di byte ($200 \div 500\text{ B}$, formato testo ASCII) | **2 byte** (formato binario compatto) |
| **Protocollo di Trasporto** | TCP (porta 80/443), connessioni effimere o Keep-Alive | TCP (porta 1883/8883), connessione **persistente** |
| **Capacità di Invio PUSH verso nodi** | Molto complessa (richiede polling o WebHook con IP pubblico) | **Nativa e immediata** (anche dietro NAT e firewall) |
| **Livelli di Affidabilità (QoS)** | Limitato all'ACK di livello trasporto TCP | **3 livelli granulari (QoS 0, QoS 1, QoS 2)** |
| **Gestione Disconnessioni Anomale** | Nessuna (rilevabile solo per mancata risposta al timeout) | **Last Will and Testament (LWT)** integrato |
| **Pattern Ideale di Utilizzo** | Query ad-hoc, interrogazioni puntuali, download file pesanti | **Telemetria continua, sensori a batteria, eventi asincroni** |
