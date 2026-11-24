---
tipo: riassunto_esame
lezioni: ["17 marzo", "22 marzo"]
tags:
  - reti-wireless
  - lte
  - attach
  - autenticazione
  - eps-bearer
  - stati-terminale
  - gtp-u
  - ambr
  - roaming
  - handover
---

# Riassunto Integrato d'Esame: Lezioni del 17 e 22 Marzo
## Attach LTE, Sicurezza, Default Bearer, Stati EMM/ECM/RRC, Piano Utente GTP-U, Scheduling, Roaming e Handover X2

> **Scopo della Nota**: Questa guida sintetizza in modo organico e sequenziale l'intero percorso didattico delle lezioni del 17 e 22 marzo (Prof. Mauro Femminella). È strutturata per collegare tutti i 66 argomenti di dettaglio del vault in una narrazione coerente e focalizzata sui punti chiave richiesti all'esame orale.

---

## 🧭 Mappa Concettuale dei 4 Atti

```
[ ACCENSIONE E IDENTIFICAZIONE ] ──> [ AUTENTICAZIONE E CHIAVI ] ──> [ DEFAULT EPS BEARER & IP ]
               │                                   │                               │
               v                                   v                               v
    [[#Atto 1 La Procedura di Attach]]    [[#Atto 1 2 Autenticazione EPS-AKA]]   [[#Atto 2 Default Bearer e Tunnel]]
               │
               ├───────────────────────────────────┐
               v                                   v
[ GESTIONE ENERGETICA E MOBILITÀ ]      [ TRASPORTO DATI E LIMITI BANDA ]
• Stati EMM, ECM, RRC                   • Incapsulamento GTP-U e TEID
• Modalità IDLE e DRX                   • Routing e NAT al P-GW
• Paging su Tracking Area               • Enforcement APN-AMBR vs UE-AMBR
               v                                   v
    [[#Atto 3 Il Triangolo degli Stati]]   [[#Atto 2 2 Piano Utente e AMBR]]
               │
               ├───────────────────────────────────┐
               v                                   v
    [ SCHEDULING RADIO (1 ms) ]           [ MOBILITÀ IN RETE ]
    • Downlink: CQI, MCS, PDCCH (DCI)     • Roaming Internazionale Home-Routed (S8)
    • Uplink: BSR e Scheduling Grant      • Handover X2 senza perdita (Forwarding)
               v                                   v
    [[#Atto 4 1 Scheduling Radio]]        [[#Atto 4 2 Roaming ed Handover X2]]
```

---

## Atto 1: L'Accensione del Terminale, Attach e Autenticazione (17 Marzo)

### 1.1 Connessione Radio Iniziale e Attach Request
Quando il terminale (UE) viene acceso:
1. Effettua la scansione delle frequenze e aggancia i segnali di sincronizzazione primaria e secondaria (PSS/SSS), ricavando la PCI e leggendo il MIB sul PBCH: [[Lezione 08 17 marzo - 07 - Dalla sincronizzazione alla connessione RRC|Dalla sincronizzazione alla connessione RRC]].
2. Tramite la procedura ad accesso casuale su canale PRACH ottiene l'allineamento temporale (Timing Advance) e invia la richiesta di connessione radio: [[Lezione 08 17 marzo - 08 - Collegamento radio iniziale e autenticita della rete|Collegamento radio iniziale]].
3. Viene stabilito il canale di segnalazione radio **RRC Connection**: [[Lezione 08 17 marzo - 04 - RRC - stato idle e collegamento con la stazione radio base|RRC stato idle e collegato]].
4. All'interno del terzo messaggio RRC, il terminale inserisce un messaggio trasparente per l'eNodeB, diretto alla rete centrale (**NAS - Non-Access Stratum**): la **Attach Request**: [[Lezione 08 17 marzo - 09 - Attach Request - messaggio NAS dentro RRC e S1-AP|Attach Request]].
5. L'eNodeB impacchetta la richiesta NAS in un messaggio S1-AP e la consegna all'**MME (Mobility Management Entity)**: [[Lezione 08 17 marzo - 10 - ECM connected e registrazione EMM ancora da completare|ECM connected e registrazione]].

### 1.2 La Mutua Autenticazione (EPS-AKA)
*La rete deve autenticare l'utente, ma anche l'utente deve verificare che la rete sia autentica per scongiurare stazioni base civetta (rogue base station).*
- L'MME contatta l'**HSS/AuC** richiedendo i vettori di autenticazione per l'identità IMSI: [[Lezione 08 17 marzo - 13 - HSS e AuC - generazione dei vettori di autenticazione|HSS e AuC - generazione vettori]].
- L'HSS custodisce la chiave segreta master $\mathbf{K}$, condivisa solo con il chip fisico della USIM: [[Lezione 08 17 marzo - 11 - Avvio dell’autenticazione e ipotesi sul contesto precedente|Avvio dell'autenticazione]].
- L'HSS genera un vettore composto da:
  - `RAND`: numero casuale di sfida.
  - `AUTN`: token di autenticazione della rete (include il sequence number cifrato e il MAC calcolato con $K$).
  - `XRES`: risposta attesa dell'utente.
  - $\mathbf{K_{ASME}}$: chiave radice per la sicurezza dell'operatore servente: [[Lezione 08 17 marzo - 12 - Gerarchia delle chiavi LTE - K CK IK KASME e KeNB|Gerarchia delle chiavi LTE]].
- L'MME invia `RAND` e `AUTN` all'UE: [[Lezione 08 17 marzo - 14 - Sfida di autenticazione e verifica della rete nella SIM|Sfida di autenticazione e verifica]].
- **Autenticazione della Rete da parte dell'UE**: la SIM riceve il token, verifica la freschezza e la firma crittografica tramite $K$. Se il test ha successo, la rete è autenticata.
- **Autenticazione dell'UE da parte dell'MME**: la SIM calcola la risposta `RES` e la invia all'MME. L'MME confronta `RES` con `XRES`. Se coincidono, l'utente è autenticato: [[Lezione 08 17 marzo - 15 - RES contro XRES e derivazione comune di KASME|RES contro XRES]].
- Viene attivata la sicurezza NAS (cifratura e integrità tra UE e MME): [[Lezione 08 17 marzo - 16 - NAS Security Mode - algoritmi, integrita e cifratura|NAS Security Mode]].

---

## Atto 2: Costruzione del Default Bearer e Piano Utente GTP-U (17 & 22 Marzo)

### 2.1 Assegnazione IP e Creazione del Tunnel End-to-End
In LTE la connettività dati è "always-on": contestualmente all'Attach viene obbligatoriamente creato un **Default EPS Bearer**: [[Lezione 08 17 marzo - 01 - EPS bearer e separazione tra controllo e dati|EPS bearer e separazione controllo/dati]].
1. L'MME registra la posizione dell'utente nell'HSS (*Location Update*): [[Lezione 08 17 marzo - 17 - Location Update - registrazione dell’MME nell’HSS|Location Update]].
2. L'MME riceve dall'HSS il profilo dell'utente con gli APN ammessi, il QCI di default e i limiti AMBR: [[Lezione 08 17 marzo - 18 - Profilo dell’abbonato, QCI e limiti di bitrate|Profilo dell'abbonato e QCI]].
3. L'MME risolve l'APN tramite DNS e seleziona il **P-GW** e il **S-GW**: [[Lezione 08 17 marzo - 19 - EPS Bearer Identity e selezione del P-GW|Selezione del P-GW]] e [[Lezione 08 17 marzo - 20 - APN e risoluzione DNS - nome del servizio e gateway|APN e risoluzione DNS]].
4. L'MME invia una *Create Session Request* al S-GW, che la inoltra al P-GW: [[Lezione 08 17 marzo - 21 - Assegnazione IP dal P-GW e invio della richiesta tramite S-GW|Assegnazione IP tramite S-GW]].
5. **Il P-GW alloca l'indirizzo IP** per il terminale e stabilisce la prima metà del tunnel dati sulla tratta S5 (**TEID S5 Downlink**): [[Lezione 08 17 marzo - 22 - TEID S5 downlink - la prima meta del tunnel|TEID S5 downlink]] e [[Lezione 08 17 marzo - 23 - P-GW - indirizzo pubblico o privato, policy e tariffazione|P-GW policy e tariffazione]].
6. Il S-GW risponde completando la tratta S5 (**TEID S5 Uplink**): [[Lezione 08 17 marzo - 24 - Risposta del P-GW e completamento del tunnel S5|Completamento tunnel S5]] e assegna il **TEID S1 Uplink**: [[Lezione 08 17 marzo - 25 - Ritorno all’MME, TEID S1 uplink e continuita del contesto|Ritorno all'MME e TEID S1]].
7. L'MME risponde all'eNodeB con *Initial Context Setup Request* contenente il messaggio NAS *Attach Accept*, la chiave crittografica radio $\mathbf{K_{eNB}}$ e il TEID S1 di salita: [[Lezione 08 17 marzo - 27 - Attach Accept - risposta differita e parametri consegnati|Attach Accept]] e [[Lezione 08 17 marzo - 28 - Initial Context Setup - stato radio, limiti e riferimento S1|Initial Context Setup]].
8. L'eNodeB attiva la cifratura radio AS (Access Stratum) al livello PDCP: [[Lezione 08 17 marzo - 29 - AS Security Setup - chiave dell’eNodeB e protezione PDCP|AS Security Setup]].
9. Viene configurato il **Data Radio Bearer (DRB)** con l'UE: [[Lezione 08 17 marzo - 30 - Consegna dell’Attach Accept e creazione del Data Radio Bearer|Creazione del Data Radio Bearer]].
10. L'eNodeB comunica all'MME il **TEID S1 Downlink**, l'MME aggiorna il S-GW (*Modify Bearer Request*) e il percorso dati bidirezionale è completo: [[Lezione 08 17 marzo - 31 - TEID S1 downlink, Attach Complete e percorso bidirezionale|Percorso bidirezionale]].

### 2.2 Il Piano Utente: Incapsulamento GTP-U e Routing NAT (22 Marzo)
*Come viaggia un pacchetto generato dal telefono verso un server web?*
- L'applicazione genera un normale pacchetto IP (es. `10.0.1.5 -> 142.250.180.174`): [[Lezione 09 22 marzo - 01 - Richiamo del bearer e percorso IP dell’utente|Richiamo del bearer e percorso IP]].
- Sull'interfaccia radio, il pacchetto viene protetto dai protocolli PDCP, RLC, MAC e PHY.
- L'eNodeB estrae il pacchetto IP e lo incapsula in un tunnel **GTP-U (GPRS Tunnelling Protocol User Plane)** su UDP/IP, apponendo l'etichetta **TEID** assegnata dal S-GW: [[Lezione 09 22 marzo - 02 - Pacchetto interno ed esterno - incapsulamento GTP-U|Incapsulamento GTP-U]].
- Il S-GW scambia l'intestazione GTP-U indirizzandola verso il P-GW con il rispettivo TEID S5: [[Lezione 09 22 marzo - 03 - Dal S-GW al P-GW - decapsulamento e nuova tratta|Tratta S-GW verso P-GW]].
- Il **P-GW** decapsula completamente il pacchetto, decrementa il TTL ed esegue il **NAT (Network Address Translation)** traducendo l'IP privato in IP pubblico instradandolo su Internet: [[Lezione 09 22 marzo - 04 - P-GW come router di uscita - TTL e NAT|P-GW router di uscita e NAT]].
- Al ritorno, il P-GW riceve la risposta, consulta le tabelle di sessione NAT e i filtri di classificazione (TFT - Traffic Flow Template) e re-incapsula verso il downlink: [[Lezione 09 22 marzo - 05 - Downlink - traduzione inversa e mapping verso la radio|Downlink e traduzione inversa]].

### 2.3 Controllo della Velocità: APN-AMBR vs UE-AMBR
Il traffico Internet è regolato da quote aggregate per evitare congestioni:
- **APN-AMBR**: limite aggregato per singolo APN su tutti i bearer non-GBR. È applicato dal **P-GW** per il downlink e dal terminale/P-GW per l'uplink: [[Lezione 09 22 marzo - 06 - APN-AMBR - limite aggregato e distinzione GBR non-GBR|APN-AMBR]] e [[Lezione 09 22 marzo - 07 - Enforcement APN-AMBR - P-GW, terminale e profilo|Enforcement APN-AMBR]].
- **UE-AMBR**: limite massimo complessivo per il terminale sull'aggregato di tutti gli APN aperti contemporaneamente. È applicato dall'**eNodeB** sullo scheduler radio: [[Lezione 09 22 marzo - 08 - UE-AMBR - limite del terminale e minimo tra i vincoli|UE-AMBR e limite del terminale]].

---

## Atto 3: Gli Stati del Terminale, Inattività e Paging (17 & 22 Marzo)

### 3.1 Il Triangolo degli Stati (EMM, ECM, RRC)
La rete e il terminale tracciano la connettività su 3 piani indipendenti: [[Lezione 09 22 marzo - 09 - Stati EMM, ECM e RRC - controllo e granularita della posizione|Stati EMM, ECM e RRC]]:
1. **EMM (EPS Mobility Management - NAS tra UE e MME)**:
   - `EMM-DEREGISTERED`: terminale spento, non raggiungibile: [[Lezione 09 22 marzo - 10 - Terminale non registrato - scelta PLMN e vecchi contesti|Terminale non registrato]].
   - `EMM-REGISTERED`: terminale autenticato e registrato, IP assegnato e profilo caricato nell'MME: [[Lezione 08 17 marzo - 03 - EMM - registrazione e localizzazione del terminale|EMM registrazione]].
2. **ECM (EPS Connection Management - Segnalazione tra UE e MME)**:
   - `ECM-IDLE`: nessun canale di controllo attivo verso l'MME; radio spenta/a riposo: [[Lezione 09 22 marzo - 11 - Terminale registrato e idle - tracking area e contesto NAS|Terminale registrato e idle]].
   - `ECM-CONNECTED`: canali radio e interfaccia S1-MME attivi per scambio dati: [[Lezione 09 22 marzo - 13 - Stato attivo - ECM connected, C-RNTI e handover|Stato attivo ECM connected]].
3. **RRC (Radio Resource Control - tra UE ed eNodeB)**:
   - `RRC_IDLE`: nessun canale radio allocato, ascolto discontinuo (DRX): [[Lezione 08 17 marzo - 05 - ECM - concatenazione di RRC e S1-AP|ECM concatenazione RRC e S1-AP]].
   - `RRC_CONNECTED`: portanti radio dedicate e identificativo di cella C-RNTI attivo: [[Lezione 08 17 marzo - 06 - Mobilita attiva e idle - confronto tra EMM RRC ECM|Mobilita attiva e idle]].

### 3.2 La Modalità IDLE e la Granularità di Posizione
- Quando il traffico si arresta per pochi secondi, l'eNodeB rilascia la connessione radio e l'MME pone l'UE in `ECM-IDLE`.
- **Importanza per la Batteria**: il terminale non trasmette nulla e attiva il ciclo di ricezione discontinua (DRX), svegliandosi solo per pochi millisecondi ogni secondo: [[Lezione 09 22 marzo - 15 - Oscillazione tra attivo e idle e ruolo di ancora del S-GW|Oscillazione tra attivo e idle]].
- **Granularità**:
  - In `ECM-CONNECTED`: la posizione è nota alla **singola cella**. La mobilità è gestita dalla rete tramite **Handover**.
  - In `ECM-IDLE`: la posizione è nota solo a livello di **Tracking Area (TA)**. Il terminale si sposta tra celle della stessa TA senza avvisare la rete (risparmio energetico totale). Se cambia TA, invia un *Tracking Area Update (TAU)*.

### 3.3 Il Meccanismo del Paging
Se un server Internet invia dati a un terminale in IDLE: [[Lezione 09 22 marzo - 12 - Indirizzo IP conservato, messaggi entranti e paging|Indirizzo IP conservato e paging]]:
1. I pacchetti arrivano al P-GW e scendono al S-GW.
2. Il S-GW rileva che il tunnel S1 verso l'eNodeB non esiste. Mette i pacchetti in buffer e invia una *Downlink Data Notification (DDN)* all'MME.
3. L'MME genera un messaggio di **Paging** e lo trasmette a **tutti gli eNodeB appartenenti alla Tracking Area** dell'utente.
4. Gli eNodeB irradiano il Paging nel canale radio PCH.
5. L'UE intercetta il proprio identificativo (S-TMSI), effettua l'accesso su PRACH, richiede la connessione RRC (*Service Request*) e passa a `ECM-CONNECTED`.
6. Il S-GW scarica i dati accumulati nel buffer e la sessione riprende.

---

## Atto 4: Scheduling, Roaming e Handover X2 (22 Marzo)

### 4.1 Scheduling Radio (1 ms)
Lo scheduling in LTE è completamente centralizzato nell'eNodeB e opera su base subframe ($1\text{ ms}$):
- **Downlink**:
  - L'eNodeB invia i piloti CRS.
  - L'UE stima la qualità del canale e restituisce un valore discreto **CQI (Channel Quality Indicator)** da 1 a 15: [[Lezione 09 22 marzo - 16 - Scheduling downlink - misure, MCS, DCI e riscontri|Scheduling downlink e CQI]].
  - L'eNodeB adatta la modulazione e codifica (**MCS**) e notifica all'UE l'assegnazione dei Resource Block nel canale di controllo PDCCH mediante il messaggio **DCI (Downlink Control Information)**.
- **Uplink**:
  - L'UE non trasmette spontaneamente: invia un **BSR (Buffer Status Report)** dichiarando i byte in attesa nel buffer: [[Lezione 09 22 marzo - 17 - Scheduling uplink - richiesta preliminare, grant e dati|Scheduling uplink e BSR]].
  - L'eNodeB risponde con uno **Scheduling Grant** assegnando frequenze e intervalli temporali dedicati.

### 4.2 Roaming LTE Internazionale: Modello Home-Routed
Nel roaming internazionale intervengono due reti: la rete visitata (**V-PLMN**) e la rete domestica (**H-PLMN**): [[Lezione 09 22 marzo - 18 - Mobilita e home network - una fonte affidabile per rintracciare l’utente|Mobilita e home network]] e [[Lezione 09 22 marzo - 20 - Accordi di roaming e riconoscimento dell’operatore dall’IMSI|Accordi di roaming]].
- Esistono due paradigmi teorici di mobilità:
  - Routing triangolare/indiretto: [[Lezione 09 22 marzo - 22 - Instradamento indiretto e routing triangolare|Routing triangolare]].
  - Routing diretto: [[Lezione 09 22 marzo - 23 - Instradamento diretto e collaborazione del corrispondente|Routing diretto]].
- **Architettura Standard LTE Home-Routed**:
  - L'eNodeB e il S-GW si trovano nella **rete estera visitata (V-PLMN)**.
  - L'MME visitato autentica l'utente consultando l'HSS di casa: [[Lezione 09 22 marzo - 21 - Modello generale di mobilita - rete domestica, visitata e autenticazione|Modello generale di mobilita]].
  - Il tunnel dati attraversa l'interfaccia internazionale **S8** e termina nel **P-GW della rete domestica (H-PLMN)**: [[Lezione 09 22 marzo - 24 - Roaming LTE home-routed - MME visitato e P-GW domestico|Roaming LTE home-routed]].
  - **Vantaggi**: l'utente mantiene il proprio indirizzo IP nazionale, le policy di tariffazione e i filtri di rete di casa: [[Lezione 09 22 marzo - 25 - Piani di controllo e dati in roaming e visibilita dell’indirizzo IP|Piani di controllo e dati in roaming]].

### 4.3 Handover X2 (Senza Perdita di Pacchetti)
Quando l'UE in stato connesso si sposta verso una cella adiacente servita dallo stesso MME/S-GW: [[Lezione 09 22 marzo - 26 - Handover LTE - scenario con MME e S-GW stabili|Handover LTE]]:
1. **Misura e Decisione**: l'UE monitora RSRP/RSRQ delle celle vicine e trasmette i *Measurement Reports*. L'eNodeB sorgente decide l'handover: [[Lezione 09 22 marzo - 27 - Misure delle celle candidate e decisione di handover|Misure e decisione]].
2. **Preparazione**: l'eNodeB sorgente contatta direttamente l'eNodeB target tramite l'interfaccia cablata **X2** (*Handover Request*). Il target alloca le risorse e fornisce un preambolo radio dedicato privo di contesa: [[Lezione 09 22 marzo - 28 - Preparazione del target e accesso senza contesa|Preparazione del target]].
3. **Comando di Handover**: la cella sorgente invia all'UE il messaggio RRC *Connection Reconfiguration* ordinando il cambio cella: [[Lezione 09 22 marzo - 29 - Cambio radio, interfaccia X2 e conclusione apparente per l’utente|Cambio radio e interfaccia X2]].
4. **Packet Forwarding su X2**: mentre l'UE aggancia la nuova antenna, i pacchetti in arrivo dal S-GW alla vecchia cella vengono instradati sul link X2 direttamente al target (**Data Forwarding**). **Zero pacchetti persi durante la transizione radio**: [[Lezione 09 22 marzo - 30 - Forwarding temporaneo tra sorgente e target|Forwarding temporaneo]].
5. **Path Switch su S1**: l'eNodeB target avvisa l'MME (*Path Switch Request*). L'MME istruisce il S-GW (*Modify Bearer Request*) a commutare il tunnel S1 di downlink verso il target. Il S-GW invia un marker di fine pacchetti al vecchio eNodeB: [[Lezione 09 22 marzo - 31 - Path switch - aggiornamento tramite MME e nuovi endpoint|Path switch]].
6. **Rilascio Risorse**: il target invia un *Release Resource* al vecchio eNodeB liberando la memoria e il vecchio canale radio: [[Lezione 09 22 marzo - 32 - Rilascio degli stati vecchi e varianti senza X2 o con cambio MME|Rilascio risorse]].

---

## 🎯 Punti d'Attenzione Chiave per l'Orale con il Docente

1. **La segretezza della chiave $K$**: non viene mai inviata via radio né trasferita tra i nodi della rete; risiede permanentemente nella SIM e nell'AuC/HSS. Tutte le altre chiavi ($K_{ASME}$, $K_{eNB}$, $K_{NAS}$) derivano con funzioni unidirezionali (KDF).
2. **Differenza funzionale tra P-GW e S-GW**: il S-GW è l'ancora di mobilità locale; il P-GW è l'ancora dell'indirizzo IP verso Internet, responsabile di NAT, assegnazione IP e controllo tariffe.
3. **Paging e Tracking Area**: il paging non viene trasmesso in tutta la rete dell'operatore (saturerebbe i canali radio) né in una singola cella (non si conosce l'esatta posizione dell'utente in IDLE), ma nell'insieme compatto di celle che formano la **Tracking Area**.
4. **Enforcement dell'AMBR**: l'APN-AMBR è controllato dal P-GW; l'UE-AMBR è controllato dall'eNodeB.
5. **Perché l'Handover LTE è lossless**: grazie al *Packet Forwarding* temporaneo su interfaccia X2 tra la stazione base sorgente e quella target prima dell'avvenuto *Path Switch* sul piano di trasporto S1.
