---
tipo: riassunto_esame
tecnologia: 5G
lezioni: ["24 marzo", "31 marzo"]
tags:
  - reti-wireless
  - 5g
  - 5g-nr
  - 5gc
  - sba
  - network-slicing
  - massive-mimo
  - beamforming
  - nsa-sa
---

# Riassunto Integrato d'Esame: 5G NR, 5G Core, Service-Based Architecture e Network Slicing

> **Scopo della Nota**: Sintesi concettuale ad alto rendimento basata sulle lezioni del 24 e 31 marzo (Prof. Mauro Femminella). Organizzata per comprendere l'evoluzione rispetto al 4G LTE, i principi fisici della New Radio (NR), l'architettura a microservizi (SBA) e i punti caldi d'esame.

---

## 🧭 I 4 Pilastri del 5G

```
                 [ IL TRIANGOLO ITU DEI SERVIZI ]
                 (eMBB · uRLLC · mMTC)
                           │
       ┌───────────────────┴───────────────────┐
       ▼                                       ▼
[ LIVELLO RADIO: 5G NR ]              [ CORE NETWORK: 5GC ]
• Spettro: FR1 (Sub-6) & FR2 (mmWave)  • CUPS: Control/User Plane Separation
• SUL (Supplemental Uplink)           • SBA (Service-Based Architecture)
• Numerologie flessibili (μ = 0..4)   • Microservizi REST / HTTP/2
• Self-Contained Slot & Mini-Slot     • Nodi: AMF, SMF, UPF, UDM, PCF, NRF
• Massive MIMO & Beamforming 3D                │
• Codici: LDPC (dati) & Polar (ctrl)           ▼
• F-OFDM (guard band al 2-3%)          [ NETWORK SLICING & DEPLOYMENT ]
                                       • Slice isolate end-to-end (S-NSSAI)
                                       • Disaggregazione RAN: RU, DU, CU
                                       • Deployment: NSA (Opz. 3x) vs SA (Opz. 2)
```

---

## 1. Il Triangolo ITU: I Tre Casi d'Uso del 5G

Il 5G non è un semplice aumento di velocità rispetto al 4G: è progettato per gestire tre classi di servizio con **requisiti mutuamente incompatibili**:

| Classe di Servizio | Requisiti Principali | Esempi Applicativi | Sfida Tecnologica |
| :--- | :--- | :--- | :--- |
| **eMBB** *(enhanced Mobile Broadband)* | Throughput di picco fino a 20 Gbps, capacità per km² $\times 100$ | Streaming 8K, Realtà Virtuale/Aumentata, stadi affollati | Spettro millimetrico (mmWave), 256-QAM, Massive MIMO |
| **uRLLC** *(ultra-Reliable Low-Latency)* | Latenza radio $\le 1\text{ ms}$, affidabilità del $99.999\%$ (5-nine) | Guida autonoma, chirurgia remota, robotica industriale | Numerologie alte, slot self-contained, mini-slot, MEC |
| **mMTC** *(massive Machine-Type Comm.)* | Densità fino a $10^6\text{ dispositivi/km}^2$, batteria $> 10$ anni | Smart metering, sensori agricoli, logistica diffusa | Banda stretta, basso costo hardware, sonno prolungato |

---

## 2. Interfaccia Radio 5G NR (New Radio)

### 2.1 Le Bande di Frequenza: FR1 ed FR2
- **FR1 (Frequency Range 1 - Sub-6 GHz)**: da $410\text{ MHz}$ a $7.125\text{ GHz}$. Comprende la fondamentale **Banda C (~3.5 GHz)**, asse portante del deployment commerciale iniziale. Larghezza di canale fino a **$100\text{ MHz}$** (vs $20\text{ MHz}$ di LTE).
- **FR2 (Frequency Range 2 - mmWave)**: da $24.25\text{ GHz}$ a $52.6\text{ GHz}$ (onde millimetriche). Enorme disponibilità spettrale con canali fino a **$400\text{ MHz}$**, ma attenuazione estrema e penetrazione quasi nulla negli edifici.
- **Supplemental Uplink (SUL)**: in banda C la trasmissione in downlink dalla torre radio arriva lontano, ma il terminale mobile ha potenza limitata ($23\text{ dBm}$) e non riesce a rispondere. Il 5G NR introduce una portante Uplink ausiliaria a frequenza più bassa (es. $700-800\text{ MHz}$) per bilanciare il link budget asimmetrico.

### 2.2 Numerologie Flessibili e Spaziatura Sottoportanti ($\mu$)
In 4G la spaziatura tra sottoportanti è rigidamente fissata a $\Delta f = 15\text{ kHz}$. In 5G NR diventa parametrica:
$$\Delta f = 15 \cdot 2^\mu\ \mathrm{kHz}, \qquad \mu \in \{0, 1, 2, 3, 4\}$$

- $\mu = 0$ ($\Delta f = 15\text{ kHz}$, slot $1\text{ ms}$): compatibile 4G, celle ampie Sub-3 GHz.
- $\mu = 1$ ($\Delta f = 30\text{ kHz}$, slot $0.5\text{ ms}$): standard per Banda C (3.5 GHz).
- $\mu = 2$ ($\Delta f = 60\text{ kHz}$, slot $0.25\text{ ms}$): celle dense e uRLLC.
- $\mu = 3, 4$ ($\Delta f = 120, 240\text{ kHz}$, slot $0.125, 0.0625\text{ ms}$): onde millimetriche (FR2) per combattere il rumore di fase e abbattere la latenza.

### 2.3 Struttura di Slot: Self-Contained Slot e Mini-Slot
- **Self-Contained Slot**: in un singolo slot (anche solo $0.25\text{ ms}$) coesistono simboli di Downlink, un periodo di guardia e simboli di Uplink con riscontro immediato (HARQ-ACK). Permette di confermare la ricezione del pacchetto istantaneamente senza attendere la trama successiva.
- **Mini-Slot (non-slot scheduling)**: per uRLLC, la trasmissione può iniziare su blocchi di soli 2, 4 o 7 simboli OFDM, interrompendo (*preemption*) una trasmissione eMBB in corso per recapitare un allarme critico in meno di $1\text{ ms}$.

### 2.4 Massive MIMO, Beamforming 3D e Modulazioni
- **Massive MIMO**: pannelli d'antenna con fino a $64$ o $128$ elementi radianti integrati che trasmettono fino a 16 flussi spaziali paralleli.
- **Beamforming 3D**: l'energia elettromagnetica non viene irradiata a ventaglio su tutto il settore, ma focalizzata in stretti fasci direttivi ("spotlight") indirizzati dinamicamente verso il singolo utente, sia in orizzontale (azimuth) che in verticale (zenith).
- **F-OFDM (Filtered OFDM)**: filtraggio digitale dei blocchi di sottoportanti che riduce le bande di guardia laterali al **$2-3\%$** della banda (rispetto al $10\%$ di LTE), massimizzando l'efficienza spettrale.
- **Codici LDPC e Polar**: per i dati ad alta velocità si usano codici Low-Density Parity-Check (LDPC); per la segnalazione di controllo si usano codici Polari.

---

## 3. La Rete Centrale: 5G Core (5GC) e Service-Based Architecture

### 3.1 Da CUPS alla Service-Based Architecture (SBA)
In 4G i protocolli erano verticali e proprietari punto-punto (Diameter, GTP-C). Nel 5G:
1. **CUPS (Control and User Plane Separation)**: il piano utente è totalmente scorporato dal controllo.
2. **SBA (Service-Based Architecture)**: le funzioni del piano di controllo (5GC) sono progettate come **microservizi cloud-native** che comunicano tramite API RESTful su protocollo standard **HTTP/2 con serializzazione JSON**.

### 3.2 Le Funzioni di Rete del 5GC e i Corrispettivi 4G

| Funzione 5GC | Nome Esteso | Equivalente 4G LTE | Ruolo Chiave |
| :--- | :--- | :--- | :--- |
| **AMF** | *Access and Mobility Management Function* | Parte controllo dell'**MME** | Gestione terminazione NAS, registrazione, autenticazione, mobilità e paging. |
| **SMF** | *Session Management Function* | Parte sessione di **MME, S-GW-C, P-GW-C** | Allocazione indirizzi IP, gestione e controllo delle Sessioni PDU, policy QoS. |
| **UPF** | *User Plane Function* | **S-GW-U + P-GW-U** | Unico nodo che tocca i dati utente: routing, incapsulamento/decapsulamento, NAT e tariffazione. |
| **UDM** | *Unified Data Management* | Parte database dell'**HSS** | Gestione credenziali, profili abbonati e autorizzazioni. |
| **AUSF** | *Authentication Server Function* | Parte crittografica dell'**AuC** | Esegue l'algoritmo di autenticazione 5G-AKA. |
| **PCF** | *Policy Control Function* | **PCRF** | Regole di tariffazione e QoS dinamica per utente/servizio. |
| **NRF** | *Network Repository Function* | *Nuovo in 5G* (DNS dei servizi) | Registro centrale: ogni funzione si registra e scopre le altre funzioni disponibili. |
| **NSSF** | *Network Slice Selection Function* | *Nuovo in 5G* | Seleziona l'istanza corretta di Network Slice richiesta dal terminale. |

Il protocollo che governa il legame tra SMF (controllo) e UPF (dati) sull'interfaccia **N4** è il protocollo standard **PFCP (Packet Forwarding Control Protocol)**.

---

## 4. Network Slicing

### 4.1 Definizione e Funzionamento
Il Network Slicing permette di istanziare **reti virtuali logicamente indipendenti e isolate end-to-end** (dalla radio al core) che condividono la stessa infrastruttura fisica di antenne, server e fibre ottiche:
- **Slice 1 (eMBB)**: ottimizzata per massimizzare la banda; funzioni core centralizzate nel cloud.
- **Slice 2 (uRLLC)**: ottimizzata per la minima latenza; UPF e server applicativi posizionati all'estrema periferia tramite **MEC (Multi-Access Edge Computing)**.
- **Slice 3 (mMTC)**: ottimizzata per gestire milioni di sensori con segnalazione ultra-semplificata.

### 4.2 Identificatore S-NSSAI
Ogni slice è identificata a livello globale dal codice **S-NSSAI (Single Network Slice Selection Assistance Information)** composto da:
- **SST (Slice/Service Type)**: tipo di servizio standardizzato (1 = eMBB, 2 = uRLLC, 3 = MIoT/mMTC, 4 = V2X).
- **SD (Slice Differentiator)**: discriminatore opzionale a 24 bit dell'operatore (es. operatore A vs operatore B).

---

## 5. Disaggregazione RAN (O-RAN) e Scenari di Deployment

### 5.1 Disaggregazione dell'Antenna: RU, DU e CU
La stazione base 5G (**gNodeB**) non è più un unico blocco monolitico sull'antenna, ma è disaggregata in 3 entità:
1. **RU (Radio Unit)**: posizionata sul palo dell'antenna, gestisce la radiofrequenza analogica, conversione D/A e beamforming.
2. **DU (Distributed Unit)**: posizionata alla base della torre o in una centrale locale; gestisce PHY alto, MAC e RLC (latenza rigida $\approx 1-2\text{ ms}$). Collegata alla RU tramite link **Fronthaul (eCPRI)**.
3. **CU (Centralized Unit)**: virtualizzata su server cloud; gestisce PDCP, SDAP e RRC (latenza più elastica $\approx 10-20\text{ ms}$). Divisa a sua volta in **CU-CP** (controllo RRC) e **CU-UP** (dati PDCP). Collegata alla DU tramite link **Midhaul (F1)**.

### 5.2 NSA (Non-Standalone) vs SA (Standalone)

```
        OPZIONE 3x: NSA (Non-Standalone)                     OPZIONE 2: SA (Standalone)
 
         ┌────────────┐                                              ┌────────────┐
         │  EPC (4G)  │                                              │ 5GC (Core) │
         └─────┬──────┘                                              └─────┬──────┘
         Controllo  \ Dati S1-U                                      Controllo  \ Dati N3
               │     \                                                     │     \
         ┌─────▼──────┐ \   Interfaccia X2                           ┌─────▼──────┐ \
         │ eNodeB(4G) ├──────────────────┐                           │  gNodeB    │  │ (Tutto 5G nativo)
         └─────┬──────┘                  │                           └─────┬──────┘  │
       Segnalazione                      ▼                                 │         ▼
         Controllo                ┌──────────────┐                         └────► [ UE ]
               │                  │  gNodeB (5G) │
               ▼                  └──────┬───────┘
            [ UE ] ◄─── Dati Utente ─────┘
                    (Dual Connectivity EN-DC)
```

- **NSA (Non-Standalone - Opzione 3x)**:
  - Consente agli operatori di lanciare il 5G senza rifare la rete centrale.
  - Si usa il vecchio core 4G (**EPC**) e la stazione base 4G master (**eNodeB**) per tutta la segnalazione di controllo e registrazione.
  - La stazione 5G (**gNodeB**) funge da "turbo" secondario per il solo piano dati tramite **Dual Connectivity (EN-DC)**.
  - *Limite*: non supporta il Network Slicing nativo né la bassissima latenza uRLLC pura.
- **SA (Standalone - Opzione 2)**:
  - Rete interamente 5G: stazione **gNodeB nativa collegata direttamente al 5G Core (5GC)**.
  - Supporta pienamente Network Slicing end-to-end, migrazione Edge Computing (MEC) e vera latenza sotto il millisecondo.

---

## 🎯 Domande Tipiche dell'Esame Orale sul 5G

1. **Perché in 5G NR la spaziatura delle sottoportanti non è fissa a 15 kHz come in LTE?**
   *Risposta*: Perché alle alte frequenze (onde millimetriche FR2) il rumore di fase dell'oscillatore locale distruggerebbe l'ortogonalità se la spaziatura fosse stretta; allargando $\Delta f$ fino a $120\text{ kHz}$ o $240\text{ kHz}$ il sistema diventa robusto al rumore di fase e riduce la durata dello slot a frazioni di millisecondo, abbattendo la latenza per i servizi uRLLC.
2. **Che differenza c'è tra SBA e l'architettura LTE classica?**
   *Risposta*: In LTE i nodi scambiano protocolli punto-punto rigidi (GTP-C, Diameter); in 5GC le funzioni di rete sono microservizi registrati su un catalogo centrale (NRF) che espongono API RESTful tramite HTTP/2 e JSON.
3. **Cosa garantisce l'isolamento tra due Network Slice?**
   *Risposta*: L'isolamento è garantito sia sul piano radio (tramite partizionamento e scheduling dedicato di Resource Block) sia sul piano di trasporto e calcolo (tramite istanze dedicate di UPF, bandwidth reservation nelle reti ottiche e virtualizzazione cloud/container).
4. **Perché il Supplemental Uplink (SUL) è necessario in banda C?**
   *Risposta*: A 3.5 GHz le perdite di propagazione sono elevate. In downlink la stazione base può trasmettere ad alta potenza compensando l'attenuazione; in uplink il terminale mobile ha un limite di potenza a batteria (tipicamente 200 mW) e perderebbe la copertura molto prima. Con il SUL, l'uplink viene agganciato a una frequenza sub-1GHz garantendo continuità di servizio.
