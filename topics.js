// Database Flashcards d'Esame Raffinato - Reti Wireless (Prof. M. Femminella)
// Allineato alle 5 Mappe Concettuali (Reti Cellulari, Dimensionamento, LTE, 17-22 Marzo, 5G)

window.DEFAULT_TOPICS = [
  {
    "topic_id": "reticell_fondamenti_propagazione",
    "topic_name": "1. Reti Cellulari Fondamentali & Propagazione",
    "cards": [
      {
        "id": "t1_01",
        "front": "Che cos'è una rete cellulare mobile e su quale principio fondamentale si basa?",
        "back": "È un'infrastruttura radiomobile che suddivide il territorio in aree geografiche elementari denominate **celle** (servite da stazioni radio base).\nSi basa sul principio del **riutilizzo delle frequenze**: limitando la potenza di trasmissione, la stessa banda radio può essere riutilizzata in celle geograficamente distanti senza generare intollerabile interferenza co-canale.",
        "node": "Concetto di Cella & Riutilizzo",
        "note": "01 Introduzione Reti Wireless"
      },
      {
        "id": "t1_02",
        "front": "Come si definisce un radiatore isotropico e qual è la formula della densità di potenza a distanza d?",
        "back": "Un radiatore isotropico è un'antenna teorica puntiforme che irradia la potenza $P_{tx}$ uniformemente in tutte le direzioni dello spazio (su una superficie sferica).\nLa densità di potenza a distanza $d$ vale:\n$$S_{iso}(d) = \\frac{P_{tx}}{4\\pi d^2} \\quad [\\text{W/m}^2]$$",
        "node": "Radiatore Isotropico",
        "note": "01 Introduzione Reti Wireless"
      },
      {
        "id": "t1_03",
        "front": "Come si definisce il Guadagno d'Antenna G e che cos'è l'EIRP?",
        "back": "Il **Guadagno d'Antenna** $G(\\theta, \\phi)$ misura la capacità di concentrare l'energia irradiata in una determinata direzione rispetto all'irradiatore isotropico.\nL'**EIRP (Equivalent Isotropically Radiated Power)** è la potenza che dovrebbe irradiare un'antenna isotropica per produrre la stessa densità di potenza nella direzione di massimo guadagno:\n$$EIRP = P_{tx} \\cdot G_{tx} \\implies EIRP_{\\text{dBm}} = P_{tx,\\text{dBm}} + G_{tx,\\text{dBi}}$$",
        "node": "Guadagno & EIRP",
        "note": "01 Introduzione Reti Wireless"
      },
      {
        "id": "t1_04",
        "front": "Qual è la Formula di Trasmissione di Friis per lo spazio libero?",
        "back": "Esprime la potenza ricevuta $P_{rx}$ in condizioni di spazio libero (assenza di ostacoli, Line-Of-Sight):\n$$P_{rx} = P_{tx} \\cdot G_{tx} \\cdot G_{rx} \\cdot \\left(\\frac{\\lambda}{4\\pi d}\\right)^2 = P_{tx} \\cdot G_{tx} \\cdot G_{rx} \\cdot \\left(\\frac{c}{4\\pi d f}\\right)^2$$\nIn decibel (Path Loss di spazio libero):\n$$PL_{FS}(d) \\text{ [dB]} = 32.44 + 20\\log_{10}(f_{\\text{MHz}}) + 20\\log_{10}(d_{\\text{km}})$$\nCresce quadraticamente con la distanza ($d^2$) e con la frequenza ($f^2$).",
        "node": "Formula di Friis",
        "note": "01 Introduzione Reti Wireless"
      },
      {
        "id": "t1_05",
        "front": "Quali sono i tre principali fenomeni fisici di attenuazione nei canali mobili?",
        "back": "1. **Path Loss (Larga scala)**: attenuazione deterministica legata alla distanza $d$, con legge esponenziale $PL(d) \\propto d^\\gamma$ (con $\\gamma \\in [3, 4.5]$ in ambiente urbano).\n2. **Shadowing (Media scala)**: ombreggiamento da grandi ostacoli (edifici, rilievi), modellato con distribuzione **Log-Normale** su decine di metri.\n3. **Multipath Fading (Piccola scala / Veloce)**: fluttuazioni rapide su distanze microscopiche (frazioni di $\\lambda$) dovute alla somma costruttiva/distruttiva di raggi riflessi (distribuzione di Rayleigh o Rice).",
        "node": "Meccanismi di Propagazione",
        "note": "01 Introduzione Reti Wireless"
      },
      {
        "id": "t1_06",
        "front": "Qual è la differenza fondamentale tra Multipath Fading di Rayleigh e di Rice?",
        "back": "* **Rayleigh**: si applica in assenza di un raggio visivo diretto (**NLOS - Non-Line-Of-Sight**). L'inviluppo segue una densità di Rayleigh e la potenza istantanea segue una distribuzione esponenziale decrescente.\n* **Rice**: si applica in presenza di un raggio diretto dominante (**LOS - Line-Of-Sight**). Il parametro $K_{Rice} = P_{LOS} / P_{diffusa}$ quantifica la robustezza del canale. Per $K \\to 0$ collassa in Rayleigh; per $K \\to \\infty$ diventa un canale gaussiano senza fading.",
        "node": "Rayleigh vs Rice",
        "note": "01 Introduzione Reti Wireless"
      },
      {
        "id": "t1_07",
        "front": "Cosa rappresentano il Tempo di Coerenza Tc e la Banda di Coerenza Bc del canale radio?",
        "back": "* **Tempo di Coerenza ($T_c$)**: intervallo temporale in cui la risposta impulsiva del canale si può considerare costante. È inversamente proporzionale allo shift Doppler massimo: $T_c \\approx 1 / f_{d,max}$. Se la durata del simbolo $T_s > T_c$ si ha *fading veloce*.\n* **Banda di Coerenza ($B_c$)**: intervallo di frequenza in cui il canale ha guadagno approssimativamente costante. È inversamente proporzionale al delay spread: $B_c \\approx 1 / (2\\pi \\tau_{max})$. Se la banda del segnale $B > B_c$ il canale è *selettivo in frequenza*.",
        "node": "Tempo e Banda di Coerenza",
        "note": "01 Introduzione Reti Wireless"
      },
      {
        "id": "t1_08",
        "front": "Che cos'è un Cluster di celle e come si calcola la dimensione N?",
        "back": "Un **cluster** è il gruppo minimo di $N$ celle adiacenti che utilizzano complessivamente l'intera banda assegnata all'operatore, senza riutilizzare frequenze al suo interno.\nPer tassellare perfettamente il piano esagonale deve valere:\n$$N = i^2 + ij + j^2 \\quad (i, j \\in \\mathbb{N}_0)$$\nValori ammissibili: $N \\in \\{1, 3, 4, 7, 9, 12, ...\\}$.",
        "node": "Cluster di Riutilizzo",
        "note": "01 Introduzione Reti Wireless"
      },
      {
        "id": "t1_09",
        "front": "Come si calcola la Distanza di Riuso Co-Canale D in funzione del raggio di cella R e di N?",
        "back": "La distanza tra i centri di due celle che riutilizzano lo stesso set di frequenze vale:\n$$D = R \\sqrt{3N}$$\nIl parametro $Q = \\frac{D}{R} = \\sqrt{3N}$ è il **rapporto di riutilizzo co-canale** (*co-channel reuse ratio*). All'aumentare di $N$, $D$ cresce e l'interferenza tra celle diminuisce.",
        "node": "Distanza di Riuso D",
        "note": "01 Introduzione Reti Wireless"
      },
      {
        "id": "t1_10",
        "front": "Qual è la formula del rapporto Segnale-Interferenza (SIR) con 6 interferenti di primo anello?",
        "back": "Nel caso peggiore di downlink con terminale al bordo cella ($d = R$) e 6 interferenti a distanza media $D$:\n$$SIR = \\frac{S}{I} \\approx \\frac{P_t K R^{-\\gamma}}{6 P_t K D^{-\\gamma}} = \\frac{1}{6} \\left(\\frac{D}{R}\\right)^\\gamma = \\frac{(\\sqrt{3N})^\\gamma}{6} = \\frac{(3N)^{\\gamma/2}}{6}$$\nCon esponente di path loss $\\gamma = 4$, risulta: $SIR = \\frac{(3N)^2}{6} = 1.5 \\cdot N^2$.",
        "node": "Calcolo del SIR",
        "note": "01 Introduzione Reti Wireless"
      },
      {
        "id": "t1_11",
        "front": "Qual è il fondamentale trade-off progettuale legato alla scelta di N?",
        "back": "* **$N$ elevato (es. $N = 7$ o $12$)**: la distanza di riuso $D$ aumenta $\\implies$ il SIR cresce $\\implies$ qualità radio eccellente e bassa interferenza. Tuttavia, i canali per cella sono pochi ($C = S/N$), riducendo la **capacità complessiva** del sistema.\n* **$N$ basso (es. $N = 1$ in LTE/5G)**: massima capacità di banda per cella ($C = S$), ma interferenza co-canale elevata che richiede tecniche trasmissive avanzate (OFDMA, MIMO, coordinamento ICIC).",
        "node": "Trade-Off Dimensione Cluster",
        "note": "01 Introduzione Reti Wireless"
      },
      {
        "id": "t1_12",
        "front": "In che modo la settorizzazione a 120 gradi migliora il SIR della cella?",
        "back": "Sostituendo l'antenna omnidirezionale con 3 antenne direttive a $120^\\circ$:\n* L'angolo di ricezione dell'interferenza viene ridotto da $360^\\circ$ a $120^\\circ$.\n* Il numero di stazioni base co-canale di primo anello che irradiano verso il settore dell'utente passa da **6 a soli 2** (o talvolta 1).\n* Il SIR migliora di un fattore $6/2 = 3$ ($+4.77 \\text{ dB}$), consentendo di ridurre $N$ a parità di qualità radio.",
        "node": "Settorizzazione a 120 Gradi",
        "note": "01 Introduzione Reti Wireless"
      },
      {
        "id": "t1_13",
        "front": "Che cos'è la Probabilità di Fuori Servizio (Outage Probability) e cos'è il Fade Margin?",
        "back": "* **Probabilità di Outage ($P_{out}$)**: probabilità che la potenza ricevuta $P_{rx}$ scenda al di sotto della soglia minima di sensibilità del ricevitore $\\gamma_{th}$ necessaria per demodulare: $P_{out} = P(P_{rx} < \\gamma_{th})$.\n* **Fade Margin ($M$)**: margine di potenza addizionale trasmesso rispetto alla soglia nominale per proteggere il collegamento dalle fluttuazioni casuali dello shadowing log-normale e del multipath.",
        "node": "Outage & Fade Margin",
        "note": "01 Introduzione Reti Wireless"
      }
    ]
  },
  {
    "topic_id": "reticell_dimensionamento_traffico",
    "topic_name": "2. Dimensionamento della Cella & Teoria del Traffico",
    "cards": [
      {
        "id": "t2_01",
        "front": "Quali sono le 4 ipotesi fondamentali alla base del modello di traffico Erlang B?",
        "back": "1. **Arrivi Poissoniani**: tasso medio di arrivo $\\lambda$ [chiamate/s], intertempi esponenziali negativi.\n2. **Durata Conversazione Esponenziale**: durata media $t_m = 1/\\mu$ [s].\n3. **Popolazione Infinita**: tasso di richiesta indipendente dagli utenti già serviti.\n4. **Sistema a Perdita pura (M/M/C/C)**: nessuna coda d'attesa. Le chiamate che trovano tutti i $C$ canali occupati vengono immediatamente bloccate e perse (*Blocked Calls Cleared*).",
        "node": "Ipotesi Erlang B",
        "note": "02 Dimensionamento della cella"
      },
      {
        "id": "t2_02",
        "front": "Come si definisce l'intensità di traffico offerto A e qual è la sua unità di misura?",
        "back": "L'intensità del traffico offerto $A$ rappresenta il volume medio di traffico generato dalla sorgente ed è una grandezza adimensionale espressa in **Erlang**:\n$$A = \\lambda \\cdot t_m = \\frac{\\lambda}{\\mu}$$\nUn Erlang corrisponde all'occupazione continua al 100% di un canale per un'ora intera (3600 secondi di conversazione in un'ora).",
        "node": "Traffico Offerto A (Erlang)",
        "note": "02 Dimensionamento della cella"
      },
      {
        "id": "t2_03",
        "front": "Qual è la formula analitica di Erlang B per la probabilità di blocco Pb?",
        "back": "La probabilità che tutti i $C$ canali siano occupati corrisponde allo stato $C$ della catena markoviana:\n$$P_b = B(C, A) = \\frac{\\frac{A^C}{C!}}{\\sum_{k=0}^{C} \\frac{A^k}{k!}}$$\nFormula ricorsiva per il calcolo rapido:\n$$B(0, A) = 1, \\quad B(k, A) = \\frac{A \\cdot B(k-1, A)}{k + A \\cdot B(k-1, A)}$$",
        "node": "Formula Erlang B",
        "note": "02 Dimensionamento della cella"
      },
      {
        "id": "t2_04",
        "front": "Che cos'è l'Efficienza di Trunking (Trunking Efficiency) e perché cresce con C?",
        "back": "È la quantità di traffico gestibile per singolo canale a parità di probabilità di blocco fissata (es. $P_b = 2\\%$):\n$$\\eta_{trunking} = \\frac{A_{max}}{C} \\quad [\\text{Erlang/canale}]$$\nAll'aumentare del numero di canali condivisi $C$, l'efficienza **cresce in modo monotono** (statistica dei grandi numeri: le fluttuazioni degli arrivi si mediano meglio). Aggregare risorse in gruppi ampi (pooling) riduce lo spreco di spettro.",
        "node": "Efficienza di Trunking",
        "note": "02 Dimensionamento della cella"
      },
      {
        "id": "t2_05",
        "front": "Come si dimensionano il numero di canali C e il numero di celle necessarie in una città?",
        "back": "1. Traffico totale dell'area urbana: $A_{tot} = U_{tot} \\cdot (\\lambda_u \\cdot t_m)$.\n2. Fissato $P_b$, si determina il traffico massimo $A_{cell}$ che una cella può sostenere con i propri $C_{cell}$ canali tramite Erlang B.\n3. Il numero minimo di stazioni base necessarie per coprire il traffico è:\n$$N_{celle} = \\left\\lceil \\frac{A_{tot}}{A_{cell}} \\right\\rceil$$",
        "node": "Dimensionamento Canali & Celle",
        "note": "02 Dimensionamento della cella"
      },
      {
        "id": "t2_06",
        "front": "Qual è la differenza fondamentale tra un sistema 'Coverage-Limited' e 'Capacity-Limited'?",
        "back": "* **Coverage-Limited (Limitato dalla Copertura)**: tipico di aree rurali. Il raggio di cella $R$ è limitato esclusivamente dalla sensibilità del ricevitore e dal link budget di potenza radio. La cella è fisicamente grande ma poco carica di traffico.\n* **Capacity-Limited (Limitato dalla Capacità)**: tipico di aree urbane dense. Il raggio di cella $R$ deve essere ridotto drasticamente (microcelle/picocelle) per soddisfare l'altissima densità di traffico offerto per $\\text{km}^2$, anche se la potenza radio permetterebbe una copertura molto più estesa.",
        "node": "Coverage vs Capacity Limited",
        "note": "02 Dimensionamento della cella"
      },
      {
        "id": "t2_07",
        "front": "Come si confrontano i protocolli ad accesso casuale ALOHA puro e Slotted ALOHA?",
        "back": "* **ALOHA Puro**: un nodo trasmette non appena ha un pacchetto pronto. Periodo di vulnerabilità $T_v = 2T$. Throughput massimo: $S_{max} = \\frac{1}{2e} \\approx 18.4\\%$ (per carico $G = 0.5$).\n* **Slotted ALOHA**: il tempo è diviso in slot sincronizzati di durata $T$; i nodi trasmettono solo all'inizio dello slot. Periodo di vulnerabilità dimezzato a $T_v = T$. Throughput massimo **raddoppiato**: $S_{max} = \\frac{1}{e} \\approx 36.8\\%$ (per carico $G = 1$).",
        "node": "ALOHA vs Slotted ALOHA",
        "note": "01 Introduzione Reti Wireless"
      }
    ]
  },
  {
    "topic_id": "reticell_accesso_multiplo_2g_3g",
    "topic_name": "3. Accesso Multiplo & Sistemi 2G/3G (GSM & UMTS)",
    "cards": [
      {
        "id": "t3_01",
        "front": "Qual è la differenza fondamentale tra duplexing FDD e duplexing TDD?",
        "back": "* **FDD (Frequency Division Duplexing)**: Uplink e Downlink trasmettono simultaneamente su due bande di frequenza distinte separate da un salto fisso (*Duplex Spacing*). Ideale per traffico simmetrico (voce).\n* **TDD (Time Division Duplexing)**: Uplink e Downlink condividono la medesima banda di frequenza ma trasmettono alternandosi in slot temporali disgiunti. Ideale per traffico asimmetrico (Internet, 5G NR) poiché consente di allocare dinamicamente più slot al Downlink.",
        "node": "Duplexing FDD vs TDD",
        "note": "01 Introduzione Reti Wireless"
      },
      {
        "id": "t3_02",
        "front": "Come opera ciascuna delle tecniche di accesso multiplo FDMA, TDMA e CDMA?",
        "back": "* **FDMA (1G)**: suddivide lo spettro in bande di frequenza disgiunte; ogni utente ha un canale continuo ma dedicato.\n* **TDMA (2G GSM)**: suddivide il tempo in slot periodici su una stessa portante; ciascun utente trasmette in un burst temporale esclusivo.\n* **CDMA (3G UMTS)**: tutti gli utenti trasmettono contemporaneamente sull'intera banda condivisa; i segnali sono separati mediante codici matematici quasi-ortogonali a spettro espanso.",
        "node": "FDMA, TDMA e CDMA",
        "note": "01 Introduzione Reti Wireless"
      },
      {
        "id": "t3_03",
        "front": "Quali sono i sottosistemi principali della rete GSM (2G) e i loro nodi chiave?",
        "back": "1. **BSS (Base Station Subsystem - Accesso Radio)**: **BTS** (apparati ricetrasmettitori radio) e **BSC** (controllo radio, allocazione canali, handover intra-BSS).\n2. **NSS (Network & Switching Subsystem - Core a Circuito)**:\n   - **MSC/VLR**: centrale di commutazione e database temporaneo per gli utenti nella Location Area.\n   - **HLR/AuC**: database centrale permanente abbonati e centro di autenticazione.\n   - **EIR**: registro identificativi hardware IMEI.",
        "node": "Architettura Rete GSM",
        "note": "03 Rete cellulare GSM"
      },
      {
        "id": "t3_04",
        "front": "Come viene introdotto il traffico a pacchetto in 2.5G con GPRS ed EDGE?",
        "back": "Senza sostituire le BTS/BSC esistenti, vengono aggiunti due nodi di Core a pacchetto:\n* **SGSN (Serving GPRS Support Node)**: equivalente dell'MSC per la commutazione di pacchetto (mobilità per Routing Area, cifratura).\n* **GGSN (Gateway GPRS Support Node)**: gateway IP verso Internet, alloca l'indirizzo IP all'utente.\n* **EDGE**: introduce la modulazione 8-PSK (3 bit/simbolo anziché 1 di GMSK), triplicando la velocità dati fino a 384 kbps.",
        "node": "GPRS & EDGE",
        "note": "03 Rete cellulare GSM"
      },
      {
        "id": "t3_05",
        "front": "In 3G WCDMA, qual è la formula dello Spreading Factor SF e del Guadagno di Processo Gp?",
        "back": "Detti $R_{chip} = 3.84 \\text{ Mchip/s}$ il chip rate e $R_b$ il bit rate informativo dell'utente:\n* **Spreading Factor ($SF$)**:\n$$SF = \\frac{R_{chip}}{R_b} = \\frac{T_b}{T_c}$$\n* **Guadagno di Processo ($G_p$)**:\n$$G_p = 10\\log_{10}(SF) = 10\\log_{10}\\left(\\frac{W}{R_b}\\right) \\quad [\\text{dB}]$$\nPermette di estrarre il segnale desiderato anche con rapporto segnale-disturbo iniziale negativo prima del despreading.",
        "node": "Spreading Factor & Guadagno Gp",
        "note": "04 Rete cellulare UMTS"
      },
      {
        "id": "t3_06",
        "front": "Qual è la differenza tra Codici di Canale (OVSF) e Codici di Scrambling in UMTS?",
        "back": "* **Codici OVSF (Orthogonal Variable Spreading Factor)**: albero di codici perfettamente ortogonali generati da matrici di Hadamard. Allargano lo spettro e separano canali/utenti sincronizzati nella medesima cella (in DL) o canali dati/controllo dello stesso UE (in UL).\n* **Codici di Scrambling**: sequenze pseudo-casuali (Gold o Kasami). Non cambiano la banda del segnale; presentano bassa correlazione incrociata e servono a **discriminare celle diverse** in Downlink (512 codici primari) o terminali diversi in Uplink.",
        "node": "OVSF vs Scrambling",
        "note": "04 Rete cellulare UMTS"
      },
      {
        "id": "t3_07",
        "front": "Che cos'è il problema Near-Far (vicino-lontano) in CDMA e come si risolve?",
        "back": "In Uplink, se tutti i terminali trasmettessero alla stessa potenza, il segnale di un utente vicino alla stazione base arriverebbe con potenza enormemente superiore a quello di un utente al bordo cella, accecando il ricevitore per non perfetta ortogonalità dei codici.\n* **Soluzione**: controllo di potenza obbligatorio affinché tutti i segnali giungano alla stazione base con la **medesima potenza target**: $P_{rx,1} = P_{rx,2} = ... = P_{target}$.",
        "node": "Problema Near-Far",
        "note": "04 Rete cellulare UMTS"
      },
      {
        "id": "t3_08",
        "front": "Come funziona il Fast Closed-Loop Power Control a 1500 Hz in UMTS?",
        "back": "Opera a frequenza rapidissima (**1500 Hz**, una correzione ogni slot da $667 \\ \\mu\\text{s}$) per inseguire il fading veloce di Rayleigh:\n1. La stazione base (NodeB) stima il SIR istantaneo dell'utente sul canale pilota DPCCH.\n2. Lo confronta con un $SIR_{target}$ prefissato.\n3. Invia all'utente un comando **TPC (Transmit Power Control)** di 1 bit in DL: comanda di alzare (`1`) o abbassare (`0`) la potenza di un passo $\\Delta P$ (es. $1 \\text{ dB}$).",
        "node": "Fast Closed-Loop Power Control",
        "note": "04 Rete cellulare UMTS"
      },
      {
        "id": "t3_09",
        "front": "Che cos'è il fenomeno del Cell Breathing (respiro della cella) nei sistemi CDMA?",
        "back": "In CDMA la cella è limitata dall'interferenza complessiva (*Noise Rise*):\n* Quando il numero di utenti attivi aumenta, l'interferenza totale sale e la stazione base comanda a tutti di alzare la potenza.\n* I terminali al bordo cella raggiungono il loro limite massimo hardware ($P_{max} = 21/24 \\text{ dBm}$) e non riescono più a collegarsi $\\implies$ il raggio di copertura utile **si contrae** (espira).\n* Quando il carico cala, il rumore diminuisce e la copertura **si espande** (inspira).",
        "node": "Cell Breathing",
        "note": "04 Rete cellulare UMTS"
      },
      {
        "id": "t3_10",
        "front": "Qual è la differenza operativa tra Hard Handover e Soft Handover?",
        "back": "* **Hard Handover (\"Break-Before-Make\")**: il canale radio con la vecchia cella viene interrotto prima di agganciare la nuova (tipico di GSM e LTE). Semplice ed efficiente, non spreca risorse radio duplicate.\n* **Soft Handover (\"Make-Before-Break\")**: il terminale si collega alla nuova cella prima di rilasciare la vecchia (tipico di UMTS, frequenze uguali). Comunica contemporaneamente con 2 o più NodeB; in ricezione l'UE usa il **Rake Receiver** per combinare i segnali con Maximal Ratio Combining (MRC).",
        "node": "Hard vs Soft Handover",
        "note": "01 Introduzione Reti Wireless"
      }
    ]
  },
  {
    "topic_id": "lte_fisico_trasmissione",
    "topic_name": "4. LTE: Architettura, Modulazione & Canali Radio",
    "cards": [
      {
        "id": "t4_01",
        "front": "Per quale motivo fondamentale l'architettura LTE (EPS) è definita 'All-IP'?",
        "back": "Perché elimina totalmente il sottosistema a commutazione di circuito (CS): l'intero traffico utente, compresa la voce (**VoLTE**), viene trasportato nativamente come pacchetti IP su tunnel GTP-U unificati.",
        "node": "Architettura All-IP LTE",
        "note": "05 Lezione 8 marzo"
      },
      {
        "id": "t4_02",
        "front": "Qual è la differenza fondamentale tra l'architettura radio E-UTRAN di LTE e quella di UMTS?",
        "back": "L'architettura radio di LTE è **piatta (flat)**: scompare l'entità intermedia RNC (*Radio Network Controller*). La rete di accesso è formata esclusivamente dagli **eNodeB**, che integrano tutte le funzioni radio, scheduling, compressione intestazioni e decisione autonoma di Handover, riducendo drasticamente la latenza radio.",
        "node": "E-UTRAN Architettura Piatta",
        "note": "05 Lezione 8 marzo"
      },
      {
        "id": "t4_03",
        "front": "Quali ruoli svolgono rispettivamente MME, S-GW e P-GW in LTE?",
        "back": "* **MME (Mobility Management Entity)**: governa esclusivamente il **Piano di Controllo** (segnalazione NAS, autenticazione, paging, gestione della mobilità in Idle per Tracking Area, selezione dei gateway).\n* **S-GW (Serving Gateway)**: perno del **Piano Utente locale** (ancora di mobilità locale tra eNodeB diversi, bufferizzazione pacchetti per terminali IDLE).\n* **P-GW (Packet Data Network Gateway)**: gateway IP di confine verso Internet (ancora globale di sessione, allocazione indirizzo IP all'UE, enforcement delle regole di QoS e limiti AMBR).",
        "node": "Ruoli Nodi EPC (MME, SGW, PGW)",
        "note": "05 Lezione 8 marzo"
      },
      {
        "id": "t4_04",
        "front": "Perché LTE impiega la modulazione OFDMA in Downlink e SC-FDMA in Uplink?",
        "back": "* **Downlink (OFDMA)**: la stazione base ha alimentazione fissa e amplificatori lineari; OFDMA permette allocazione dinamica di risorse a grana fine tempo-frequenza e scheduling selettivo sul miglior canale per ciascun utente.\n* **Uplink (SC-FDMA)**: il terminale mobile è alimentato a batteria. L'OFDM classico ha un elevatissimo rapporto picco-potenza media (**PAPR**), che richiederebbe amplificatori con grande back-off. SC-FDMA (grazie alla pre-codifica DFT) genera una forma d'onda a singola portante con **PAPR ridotto**, prolungando la batteria e migliorando la copertura al bordo cella.",
        "node": "OFDMA vs SC-FDMA (PAPR)",
        "note": "05 Lezione 8 marzo"
      },
      {
        "id": "t4_05",
        "front": "A cosa serve il Prefisso Ciclico (CP) in LTE e come elimina l'ISI?",
        "back": "Copia gli ultimi campioni del simbolo utile OFDM all'inizio dell'intervallo di trasmissione (lunghezza $T_{cp} \\ge \\tau_{max}$).\n* **Elimina l'ISI**: assorbe i ritardi di propagazione dei raggi multipath prima dell'intervallo di integrazione utile.\n* **Proprietà matematica**: trasforma la convoluzione lineare del canale in una **convoluzione circolare**, consentendo di equalizzare il canale in ricezione con una semplice divisione scalare per singolo tap su ciascuna sottoportante.",
        "node": "Prefisso Ciclico & Convoluzione Circolare",
        "note": "05 Lezione 8 marzo"
      },
      {
        "id": "t4_06",
        "front": "Qual è la struttura standard di un Resource Block (RB) in LTE con prefisso ciclico normale?",
        "back": "Un Resource Block (RB) è l'unità base di allocazione delle risorse:\n* **Frequenza**: **12 sottoportanti** adiacenti da $15 \\text{ kHz}$ ciascuna $\\implies$ banda totale di **$180 \\text{ kHz}$**.\n* **Tempo**: **1 time slot di $0.5 \\text{ ms}$**, contenente **7 simboli OFDM** (con CP normale).\n* **Resource Elements totali**: $12 \\times 7 = \\mathbf{84 \\text{ RE}}$. Un Resource Block Pair (schedulato su un subframe da $1 \\text{ ms}$) comprende $12 \\times 14 = 168 \\text{ RE}$.",
        "node": "Struttura Resource Block (RB)",
        "note": "05 Lezione 8 marzo"
      },
      {
        "id": "t4_07",
        "front": "Quali sono le 6 larghezze di banda scalabili previste in LTE e i relativi Resource Block?",
        "back": "Lo standard LTE prevede 6 larghezze di banda di canale scalabili:\n1. **$1.4 \\text{ MHz}$** $\\to$ **$6 \\text{ RB}$** (occupa $1.08 \\text{ MHz}$ utili)\n2. **$3 \\text{ MHz}$** $\\to$ **$15 \\text{ RB}$** ($2.7 \\text{ MHz}$)\n3. **$5 \\text{ MHz}$** $\\to$ **$25 \\text{ RB}$** ($4.5 \\text{ MHz}$)\n4. **$10 \\text{ MHz}$** $\\to$ **$50 \\text{ RB}$** ($9.0 \\text{ MHz}$)\n5. **$15 \\text{ MHz}$** $\\to$ **$75 \\text{ RB}$** ($13.5 \\text{ MHz}$)\n6. **$20 \\text{ MHz}$** $\\to$ **$100 \\text{ RB}$** ($18.0 \\text{ MHz}$)\nIl restante 10% della banda fa da banda di guardia laterale.",
        "node": "Bande Scalabili LTE",
        "note": "05 Lezione 8 marzo"
      },
      {
        "id": "t4_08",
        "front": "A cosa servono i segnali PSS e SSS e come si calcola la Physical Cell Identity (PCI)?",
        "back": "* **PSS (Primary Synchronization Signal)**: fornisce il sincronismo temporale di simbolo (slot) e indica l'identità di settore $N_{ID}^{(2)} \\in \\{0, 1, 2\\}$.\n* **SSS (Secondary Synchronization Signal)**: fornisce il sincronismo di trama radio ($10 \\text{ ms}$) e indica il gruppo di cella $N_{ID}^{(1)} \\in \\{0, ..., 167\\}$.\n* **Formula PCI** (504 identità fisiche univoche):\n$$PCI = 3 \\cdot N_{ID}^{(1)} + N_{ID}^{(2)}$$",
        "node": "PSS, SSS e Calcolo PCI",
        "note": "05 Lezione 8 marzo"
      },
      {
        "id": "t4_09",
        "front": "Qual è la gerarchia dei canali in LTE (Logici, Trasporto, Fisici)?",
        "back": "1. **Canali Logici (Cosa viene trasferito)**: definiti dal tipo di informazione (Controllo: BCCH, PCCH, CCCH, DCCH; Dati: DTCH).\n2. **Canali di Trasporto (Come viene trasferito)**: definiti dal formato di codifica e interleaving (DL: BCH, PCH, DL-SCH; UL: RACH, UL-SCH).\n3. **Canali Fisici (Dove viene trasmesso tempo-frequenza)**:\n   - DL: PBCH (MIB), PDCCH (scheduling grant), PDSCH (dati utente).\n   - UL: PRACH (preamboli di accesso), PUCCH (ACK/NACK, CQI), PUSCH (dati utente).",
        "node": "Gerarchia Canali LTE",
        "note": "05 Lezione 8 marzo"
      },
      {
        "id": "t4_10",
        "front": "In quali 4 passi si articola la procedura di accesso casuale RACH in LTE?",
        "back": "1. **Msg1 (Preamble)**: l'UE invia un preambolo casuale su PRACH per farsi rilevare.\n2. **Msg2 (Random Access Response - RAR)**: l'eNodeB risponde su PDSCH indicando correzione temporale (*Timing Advance*), C-RNTI temporaneo e grant UL.\n3. **Msg3 (RRC Connection Request)**: l'UE trasmette la propria richiesta di connessione con identificativo su PUSCH.\n4. **Msg4 (Contention Resolution)**: l'eNodeB conferma quale UE ha vinto l'eventuale contesa tra preamboli identici.",
        "node": "Procedura RACH a 4 Passi",
        "note": "05 Lezione 8 marzo"
      }
    ]
  },
  {
    "topic_id": "lte_tecniche_fisiche_17_22_marzo",
    "topic_name": "5. LTE Tecniche Fisiche Avanzate (Lezioni 17-22 Marzo)",
    "cards": [
      {
        "id": "t5_01",
        "front": "Che cos'è il Carrier Frequency Offset (CFO) e da quali cause fisiche si origina?",
        "back": "È lo scostamento $\\Delta f_{cfo}$ tra la frequenza della portante del trasmettitore e quella dell'oscillatore locale del ricevitore.\nSi origina da due cause fisiche:\n1. **Tolleranza termica e imprecisione dei risonatori RF** a quarzo.\n2. **Effetto Doppler da movimento dell'utente**: $f_d = \\frac{v}{\\lambda}\\cos\\theta = \\frac{v \\cdot f_c}{c}\\cos\\theta$.\nIl CFO normalizzato rispetto alla spaziatura tra sottoportanti vale: $\\epsilon = \\frac{\\Delta f_{cfo}}{\\Delta f}$.",
        "node": "Origine Fisica del CFO",
        "note": "Lezione 17 marzo - Appunti integrali"
      },
      {
        "id": "t5_02",
        "front": "In che modo il CFO distrugge l'ortogonalità tra le sottoportanti OFDM generando ICI?",
        "back": "Nel tempo introduce una rampa di fase $e^{j 2\\pi \\Delta f_{cfo} t}$. In frequenza, sposta i punti di campionamento della FFT lontano dai passaggi per lo zero delle funzioni $\\text{sinc}$.\n* Il segnale utile sulla sottoportante viene attenuato del fattore $\\text{sinc}(\\epsilon)$.\n* L'energia di tutte le altre $N-1$ sottoportanti tracima sulla sottoportante considerata, generando **Inter-Carrier Interference (ICI)**.",
        "node": "CFO & Nascita ICI",
        "note": "Lezione 17 marzo - Appunti integrali"
      },
      {
        "id": "t5_03",
        "front": "Qual è la formula asintotica della potenza dell'ICI e qual è il limite tollerabile di epsilon?",
        "back": "Per piccoli valori di $\\epsilon$ ($|\\epsilon| \\ll 1$), la potenza di ICI cresce in modo quadratico:\n$$P_{ICI} \\approx \\sigma_x^2 \\cdot \\frac{\\pi^2}{3} \\epsilon^2$$\nIl rapporto segnale-interferenza degrada come: $SIR_{cfo} \\approx \\frac{3}{\\pi^2 \\epsilon^2}$.\n* **Limite di progetto**: per contenere la perdita di SNR a meno di 0.5 dB, è obbligatorio contenere il CFO normalizzato entro **$|\\epsilon| \\le 0.01 \\div 0.02$** (meno dell'1-2% di $\\Delta f$).",
        "node": "Potenza ICI & Limite Epsilon",
        "note": "Lezione 17 marzo - Appunti integrali"
      },
      {
        "id": "t5_04",
        "front": "Come viene stimato il canale in LTE tramite i simboli pilota (Reference Signals)?",
        "back": "1. **Stima sui Piloti**: sui Resource Element che contengono i simboli noti CRS, il ricevitore applica la stima Least Squares (LS):\n$$\\hat{H}_{LS}(k_p, l_p) = \\frac{Y(k_p, l_p)}{X_p}$$\n2. **Interpolazione 2D**: mediante interpolazione lineare, cubica o filtraggio Wiener su tempo e frequenza, si ricava la risposta di canale $\\hat{H}_k$ su tutti i dati della trama.",
        "node": "Stima Canale su Piloti CRS",
        "note": "Lezione 17 marzo - Appunti integrali"
      },
      {
        "id": "t5_05",
        "front": "Qual è la differenza fondamentale tra l'equalizzatore Zero-Forcing (ZF) e l'equalizzatore MMSE?",
        "back": "* **Zero-Forcing ($G_{ZF} = 1/H_k$)**: inverte esattamente la risposta del canale eliminando la distorsione. **Grave difetto**: nei nulli di canale ($|H_k| \\to 0$), amplifica a dismisura il rumore termico (*Noise Enhancement*).\n* **MMSE ($G_{MMSE} = \\frac{H_k^*}{|H_k|^2 + 1/SNR}$)**: minimizza l'errore quadratico medio totale. Quando $|H_k| \\to 0$, il termine $1/SNR$ a denominatore impedisce l'amplificazione incontrollata del rumore, garantendo prestazioni nettamente superiori.",
        "node": "Equalizzatori ZF vs MMSE",
        "note": "Lezione 17 marzo - Appunti integrali"
      },
      {
        "id": "t5_06",
        "front": "Come funziona la Link Adaptation adattativa (AMC) e qual è il ruolo del CQI?",
        "back": "1. L'UE misura il SINR sui simboli pilota e seleziona il più alto indice **CQI ($1..15$)** che garantisce un tasso di errore di blocco **$BLER \\le 10\\%$** sul primo invio.\n2. Invia periodicamente il CQI all'eNodeB.\n3. L'eNodeB adatta dinamicamente lo schema di modulazione (QPSK, 16QAM, 64QAM) e il code rate (MCS), massimizzando la velocità di trasmissione al variare delle condizioni radio.",
        "node": "Link Adaptation & CQI",
        "note": "Lezione 22 marzo - Appunti integrali"
      },
      {
        "id": "t5_07",
        "front": "Come opera l'algoritmo Outer Loop Link Adaptation (OLLA) e perché delta_down = 9 * delta_up?",
        "back": "Corregge gli errori di stima e i ritardi del CQI aggiornando un offset additivo $\\Delta_{OLLA}$:\n* Ad ogni **ACK** (ricezione corretta): $\\Delta_{OLLA} \\leftarrow \\Delta_{OLLA} + \\delta_{up}$.\n* Ad ogni **NACK** (blocco errato): $\\Delta_{OLLA} \\leftarrow \\Delta_{OLLA} - \\delta_{down}$.\n* Per convergere stabilmente al target di $BLER_{target} = 10\\%$ ($0.10$), all'equilibrio deve valere: $0.90 \\cdot \\delta_{up} = 0.10 \\cdot \\delta_{down} \\implies \\mathbf{\\delta_{down} = 9 \\cdot \\delta_{up}}$ (es. $\\delta_{up} = 0.1 \\text{ dB}, \\delta_{down} = 0.9 \\text{ dB}$).",
        "node": "Algoritmo OLLA",
        "note": "Lezione 22 marzo - Appunti integrali"
      },
      {
        "id": "t5_08",
        "front": "Quali sono le tre modalità operative fondamentali delle tecnologie multi-antenna MIMO?",
        "back": "1. **Diversità Spaziale (Spatial Diversity)**: invia lo stesso segnale duplicato su canali indipendenti (es. codice di Alamouti/SFBC) per massimizzare l'**affidabilità** contro il fading.\n2. **Beamforming**: applica pesi di fase per orientare il lobo principale verso l'utente, massimizzando il **guadagno di SNR** e riducendo l'interferenza verso altre celle.\n3. **Multiplexing Spaziale (Spatial Multiplexing)**: trasmette flussi indipendenti (*Layers*) simultaneamente sulla stessa risorsa, **moltiplicando il throughput** per il Rank della matrice di canale.",
        "node": "Le 3 Modalità MIMO",
        "note": "Lezione 22 marzo - Appunti integrali"
      },
      {
        "id": "t5_09",
        "front": "Come funziona il Codice di Alamouti (SFBC) per la diversità spaziale con 2 antenne trasmettenti?",
        "back": "Due simboli consecutivi $s_1, s_2$ vengono trasmessi su due sottoportanti adiacenti con matrice:\n$$\\mathbf{S} = \\begin{pmatrix} s_1 & -s_2^* \\\\ s_2 & s_1^* \\end{pmatrix}$$\nIl ricevitore estrae i simboli tramite semplice elaborazione lineare, ottenendo un ordine di diversità pari a $2 \\times N_{rx}$ a piena velocità di simbolo, senza richiedere che il trasmettitore conosca il canale (*open-loop*).",
        "node": "Codice di Alamouti (SFBC)",
        "note": "Lezione 22 marzo - Appunti integrali"
      },
      {
        "id": "t5_10",
        "front": "Qual è il vincolo di Rango (Rank) nel Spatial Multiplexing MIMO e quale condizione ambientale richiede?",
        "back": "Il numero di flussi paralleli $N_L$ è vincolato dal rango della matrice di canale $\\mathbf{H}$ ($N_R \\times N_T$):\n$$N_L \\le \\text{Rank}(\\mathbf{H}) \\le \\min(N_T, N_R)$$\n* **Condizione Ambientale**: richiede un ambiente ricco di **scattering e multipath**, che renda i cammini radio linearmente indipendenti. In canale puramente ottico (LOS) senza riflessioni, il rango collassa a 1 e il multiplexing spaziale non è possibile.",
        "node": "Vincolo di Rango MIMO",
        "note": "Lezione 22 marzo - Appunti integrali"
      },
      {
        "id": "t5_11",
        "front": "Che cos'è la Carrier Aggregation (CA) in LTE-Advanced?",
        "back": "È la tecnica che permette di aggregare fino a **5 portanti componenti (Component Carrier - CC)** da massimo $20 \\text{ MHz}$ ciascuna, per formare un unico canale virtuale con ampiezza complessiva fino a **$100 \\text{ MHz}$**, moltiplicando direttamente il throughput di picco dell'utente. Può essere intra-banda (contigua o non contigua) o inter-banda.",
        "node": "Carrier Aggregation",
        "note": "Lezione 22 marzo - Appunti integrali"
      }
    ]
  },
  {
    "topic_id": "lte_procedure_sicurezza_stati",
    "topic_name": "6. LTE: Procedure di Rete, Sicurezza, Stati & Handover",
    "cards": [
      {
        "id": "t6_01",
        "front": "Cosa avviene durante la procedura di Attach del terminale alla rete LTE?",
        "back": "1. L'UE invia l'Attach Request (con IMSI o GUTI) all'MME tramite l'eNodeB.\n2. L'MME richiede i vettori di autenticazione all'HSS ed esegue l'autenticazione mutua **EPS-AKA**.\n3. Viene attivata la sicurezza NAS e AS.\n4. L'MME seleziona S-GW e P-GW e comanda l'attivazione del **Default EPS Bearer** con allocazione dell'indirizzo IP all'UE.\n5. L'UE passa in stato connesso e può iniziare a trasmettere dati IP.",
        "node": "Procedura di Attach",
        "note": "05 Lezione 8 marzo"
      },
      {
        "id": "t6_02",
        "front": "Come funziona l'autenticazione mutua EPS-AKA e qual è il ruolo del token AUTN?",
        "back": "L'HSS/AuC genera il vettore $(RAND, AUTN, XRES, K_{ASME})$.\n* L'MME invia $(RAND, AUTN)$ alla SIM dell'utente.\n* **Autenticazione della Rete da parte dell'UE**: la SIM verifica il token $AUTN$ (controllando che il numero di sequenza $SQN$ sia nuovo e che il $MAC$ sia corretto tramite la chiave segreta master $K$). Se valido, la SIM calcola $RES$.\n* **Autenticazione dell'UE da parte dell'MME**: l'UE invia $RES$ all'MME, che lo confronta con $XRES$. Se coincidono, l'utente è autenticato.",
        "node": "Autenticazione EPS-AKA & AUTN",
        "note": "05 Lezione 8 marzo"
      },
      {
        "id": "t6_03",
        "front": "Come è strutturata la gerarchia delle chiavi crittografiche in LTE (K -> K_ASME -> K_eNB)?",
        "back": "1. **Chiave Master $K$**: risiede solo nella SIM dell'abbonato e nell'AuC dell'operatore (non viene mai trasmessa in rete).\n2. **Chiave $K_{ASME}$**: generata da SIM e HSS durante EPS-AKA e consegnata all'MME. Da essa derivano le chiavi di integrità e cifratura NAS ($K_{NASint}, K_{NASenc}$).\n3. **Chiave $K_{eNB}$**: derivata dall'MME da $K_{ASME}$ e consegnata all'eNodeB per la sicurezza AS (interfaccia radio: $K_{RRCint}, K_{RRCenc}, K_{UPenc}$).",
        "node": "Gerarchia Chiavi Crittografiche",
        "note": "05 Lezione 8 marzo"
      },
      {
        "id": "t6_04",
        "front": "Che cos'è un EPS Bearer e qual è la differenza tra Default Bearer e Dedicated Bearer?",
        "back": "Un **EPS Bearer** è un tunnel virtuale di livello 2/3 con qualità di servizio (QoS) garantita tra l'UE e il P-GW.\n* **Default Bearer**: viene attivato **obbligatoriamente e automaticamente all'Attach** (always-on). Fornisce connettività IP di base (best-effort, non-GBR) per tutta la durata della connessione con l'IP assegnato.\n* **Dedicated Bearer**: viene creato successivamente su richiesta di un servizio specifico (es. chiamata VoLTE con QCI=1 o streaming video). Può essere di tipo **GBR** (Guaranteed Bit Rate) e viene associato a un Traffic Flow Template (TFT).",
        "node": "Default vs Dedicated Bearer",
        "note": "05 Lezione 8 marzo"
      },
      {
        "id": "t6_05",
        "front": "Cosa rappresentano i limiti aggregati APN-AMBR e UE-AMBR?",
        "back": "* **APN-AMBR (Aggregate Maximum Bit Rate per APN)**: limite massimo di banda aggregata sommando tutti i bearer non-GBR associati a un determinato APN (es. Internet o IMS). È applicato dal **P-GW** in DL e dall'**eNodeB/UE** in UL.\n* **UE-AMBR (Aggregate Maximum Bit Rate per UE)**: limite massimo complessivo sommando tutti gli APN a cui l'utente è contemporaneamente connesso. È applicato dall'**eNodeB**.",
        "node": "Limiti APN-AMBR e UE-AMBR",
        "note": "05 Lezione 8 marzo"
      },
      {
        "id": "t6_06",
        "front": "Qual è la differenza tra gli stati EMM, ECM e RRC del terminale in LTE?",
        "back": "* **EMM (EPS Mobility Management - con MME)**: *DEREGISTERED* (rete ignora posizione UE) vs *REGISTERED* (UE autenticato e noto con granularità di Tracking Area).\n* **ECM (EPS Connection Management - con MME)**: *IDLE* (nessun collegamento di segnalazione NAS attivo, bearer radio rilasciati) vs *CONNECTED* (canale di segnalazione S1-MME attivo).\n* **RRC (Radio Resource Control - con eNodeB)**: *RRC_IDLE* (nessuna risorsa radio dedicata allocata) vs *RRC_CONNECTED* (connessione radio attiva).",
        "node": "Stati EMM, ECM e RRC",
        "note": "05 Lezione 8 marzo"
      },
      {
        "id": "t6_07",
        "front": "Come viene gestito un terminale in stato IDLE e come funziona la procedura di Paging?",
        "back": "* In IDLE, il terminale ascolta il canale a intervalli periodici (**DRX - Discontinuous Reception**) per risparmiare batteria e aggiorna la rete solo se cambia **Tracking Area (TAU - Tracking Area Update)**.\n* Quando arrivano pacchetti IP in Downlink al Serving Gateway (S-GW):\n  1. L'S-GW bufferizza i pacchetti e invia una *Downlink Data Notification* all'MME.\n  2. L'MME invia messaggi di **Paging** a tutti gli eNodeB appartenenti all'ultima Tracking Area dell'utente.\n  3. Gli eNodeB irradiano il Paging sull'interfaccia radio. L'UE lo riceve e avvia la procedura di Service Request per riattivare i bearer radio.",
        "node": "Gestione IDLE & Paging",
        "note": "05 Lezione 8 marzo"
      },
      {
        "id": "t6_08",
        "front": "Qual è la differenza tra Handover X2 e Handover S1 in LTE?",
        "back": "* **Handover X2 (Preferito e Diretto)**: avviene direttamente tra l'eNodeB sorgente e l'eNodeB target tramite l'interfaccia **X2**, senza coinvolgere l'MME nella fase preparatoria. L'eNodeB sorgente inoltra i pacchetti pendenti via tunnel dati (*Data Forwarding*). L'MME viene informato solo a cose fatte (*Path Switch Request*) per commutare il tunnel dell'S-GW.\n* **Handover S1 (Fallback)**: si utilizza se l'interfaccia X2 non è disponibile o se cambiano sia l'MME che l'S-GW. Tutta la segnalazione preparatoria transita attraverso la Core Network via interfaccia **S1-MME**.",
        "node": "Handover X2 vs S1",
        "note": "05 Lezione 8 marzo"
      }
    ]
  },
  {
    "topic_id": "5g_nr_core",
    "topic_name": "7. 5G: New Radio, 5G Core, SBA, Slicing & Deployment",
    "cards": [
      {
        "id": "t7_01",
        "front": "Quali sono i tre macro-scenari applicativi definiti dall'ITU per il 5G (IMT-2020)?",
        "back": "1. **eMBB (Enhanced Mobile Broadband)**: velocità estreme (picco 20 Gbps, 100 Mbps garantiti) e altissima capacità d'area per streaming 8K e VR/AR.\n2. **URLLC (Ultra-Reliable Low-Latency Communication)**: latenza radio ultra-bassa ($\\le 1 \\text{ ms}$) e affidabilità estrema ($99.999\\%$) per guida autonoma, telechirurgia e Industria 4.0.\n3. **mMTC (massive Machine-Type Communications)**: densità di $10^6 \\text{ disp/km}^2$, batterie $> 10$ anni e basso costo per smart metering e sensoristica diffusa.",
        "node": "I 3 Pilastri ITU (IMT-2020)",
        "note": "01 Introduzione 5G"
      },
      {
        "id": "t7_02",
        "front": "Qual è la differenza fondamentale tra le bande 5G FR1 ed FR2?",
        "back": "* **FR1 (Sub-6 GHz, da 410 MHz a 7.125 GHz)**: ottima propagazione e copertura geografica estesa; canali radio fino a 100 MHz; spaziatura sottoportanti $\\Delta f = 15, 30, 60 \\text{ kHz}$. Include la \"golden band\" dei 3.5 GHz per l'eMBB primario.\n* **FR2 (mmWave, onde millimetriche da 24.25 GHz a 52.6 GHz)**: canali enormi fino a 400 MHz per velocità gigabit estreme; attenuazione elevatissima (assorbimento da muri e pioggia); raggio di cella ridotto a centinaia di metri; spaziatura sottoportanti $\\Delta f = 60, 120 \\text{ kHz}$.",
        "node": "Bande FR1 vs FR2 mmWave",
        "note": "01 Introduzione 5G"
      },
      {
        "id": "t7_03",
        "front": "Come si definisce la Numerologia Flessibile del 5G NR e come si calcola Delta f?",
        "back": "La spaziatura tra le sottoportanti OFDM è scalabile con l'indice $\\mu \\in \\{0, 1, 2, 3, 4\\}$:\n$$\\Delta f = 15 \\cdot 2^\\mu \\text{ kHz}$$\n* $\\mu = 0 \\implies 15 \\text{ kHz}$ ($T_{slot} = 1.0 \\text{ ms}$)\n* $\\mu = 1 \\implies 30 \\text{ kHz}$ ($T_{slot} = 0.5 \\text{ ms}$)\n* $\\mu = 2 \\implies 60 \\text{ kHz}$ ($T_{slot} = 0.25 \\text{ ms}$)\n* $\\mu = 3 \\implies 120 \\text{ kHz}$ ($T_{slot} = 0.125 \\text{ ms} = 125 \\ \\mu\\text{s}$)\nCiascun slot contiene sempre **14 simboli OFDM**: aumentando $\\mu$ lo slot si accorcia, abbattendo la latenza radio.",
        "node": "Numerologia Flessibile 5G",
        "note": "01 Introduzione 5G"
      },
      {
        "id": "t7_04",
        "front": "Perché nelle bande millimetriche (FR2) è obbligatorio adottare una spaziatura Delta f elevata (es. 120 kHz)?",
        "back": "1. **Rumore di Fase (*Phase Noise*)**: alle altissime frequenze ($28 \\div 39 \\text{ GHz}$), gli oscillatori locali presentano forte rumore di fase. Una spaziatura ridotta (15 kHz) verrebbe distrutta dall'ICI, mentre spaziature ampie ($120 \\text{ kHz}$) tollerano il rumore di fase.\n2. **Shift Doppler elevato**: lo spostamento Doppler è proporzionale a $f_c$ ($f_d \\propto f_c$). A 28 GHz un veicolo a 100 km/h genera oltre 2.5 kHz di Doppler, insostenibile a 15 kHz ma trascurabile a 120 kHz.",
        "node": "Perché Delta f grande in mmWave",
        "note": "01 Introduzione 5G"
      },
      {
        "id": "t7_05",
        "front": "Cosa sono i Self-Contained Slot e i Mini-Slot in 5G NR e a cosa servono?",
        "back": "* **Self-Contained Slot**: all'interno dello stesso slot da 14 simboli coesistono il grant di controllo in DL, la trasmissione dati e la risposta ACK/NACK in UL, consentendo un riscontro HARQ immediato senza attendere i subframe successivi.\n* **Mini-Slot (da 2, 4 o 7 simboli)**: permettono di trasmettere dati immediatamente senza attendere l'inizio del prossimo boundary di slot standard. Possono eseguire la **preemption** (prelazione immediata) su trasmissioni eMBB in corso per soddisfare la latenza $< 1 \\text{ ms}$ del traffico critico **URLLC**.",
        "node": "Self-Contained & Mini-Slot",
        "note": "01 Introduzione 5G"
      },
      {
        "id": "t7_06",
        "front": "Che cos'è il Beam Management in 5G NR e in quali 4 fasi si articola?",
        "back": "Nelle bande millimetriche il collegamento radio necessita di fasci stretti e direttivi per superare l'attenuazione. Il Beam Management identifica e traccia il miglior fascio tra gNodeB e UE tramite:\n1. **Beam Sweeping**: il gNodeB irradia periodicamente i blocchi SSB coprendo l'intero settore angolare a ventaglio.\n2. **Beam Measurement**: l'UE misura la potenza RSRP sui diversi fasci ricevuti.\n3. **Beam Determination**: selezione della coppia di fasci trasmettitore/ricevitore ottimale.\n4. **Beam Recovery (BFR)**: procedura rapida per recuperare il collegamento in caso di improvviso ostacolo (*Beam Failure*).",
        "node": "Beam Management & Sweeping",
        "note": "01 Introduzione 5G"
      },
      {
        "id": "t7_07",
        "front": "Come funziona la Service-Based Architecture (SBA) della Core Network 5G (5GC)?",
        "back": "Nel Piano di Controllo, le funzioni di rete (**Network Functions - NF**) non usano più protocolli telecom rigidi punto-punto (GTP-C/Diameter), ma operano come **microservizi software virtualizzati** che comunicano tramite **API RESTful su HTTP/2 con messaggi JSON**.\nUn'entità dedicata, l'**NRF (Network Repository Function)**, funge da registro centrale per la registrazione e la scoperta dinamica dei servizi (*Service Discovery*).",
        "node": "Service-Based Architecture (SBA)",
        "note": "01 Introduzione 5G"
      },
      {
        "id": "t7_08",
        "front": "Quali sono le principali Network Function (NF) della 5GC e i loro ruoli?",
        "back": "* **AMF (Access and Mobility Management Function)**: gestisce autenticazione e mobilità dell'UE (eredita il ruolo dell'MME nel controllo).\n* **SMF (Session Management Function)**: governa le sessioni dati (PDU Sessions), alloca gli IP e controlla l'UPF tramite protocollo PFCP.\n* **UPF (User Plane Function)**: **l'unico nodo del Piano Utente** (fonde S-GW e P-GW). Instrada pacchetti IP e applica la QoS; può essere posizionato all'estremo bordo (**Edge Computing / MEC**) per la latenza sub-millisecondo.\n* **UDM / UDR**: gestione e database credenziali e profili abbonamento (evoluzione HSS).\n* **NSSF (Network Slice Selection Function)**: seleziona le slice per l'UE in base all'S-NSSAI.",
        "node": "Network Functions 5GC (AMF, SMF, UPF)",
        "note": "01 Introduzione 5G"
      },
      {
        "id": "t7_09",
        "front": "Che cos'è il Network Slicing e come viene identificata una Slice (S-NSSAI)?",
        "back": "È la capacità di creare molteplici **reti logiche virtuali end-to-end, isolate e indipendenti**, che coesistono sulla medesima infrastruttura fisica per servire contemporaneamente e senza interferenze requisiti contrastanti (eMBB, URLLC, mMTC).\nOgni slice è identificata globalmente dall'etichetta **S-NSSAI**, composta da:\n* **SST (Slice/Service Type)**: tipo di servizio standardizzato ($1 = \\text{eMBB}$, $2 = \\text{URLLC}$, $3 = \\text{mMTC}$, $4 = \\text{V2X}$).\n* **SD (Slice Differentiator)**: valore opzionale a 24 bit per partizionare slice dello stesso tipo tra diversi clienti/operatori virtuali.",
        "node": "Network Slicing & S-NSSAI",
        "note": "01 Introduzione 5G"
      },
      {
        "id": "t7_10",
        "front": "Qual è la differenza tra le opzioni di deployment 5G Standalone (SA) e Non-Standalone (NSA)?",
        "back": "* **Non-Standalone (NSA - Opzione 3x)**: si appoggia all'infrastruttura 4G esistente. Il terminale usa la **Dual Connectivity (EN-DC)** ancorando il piano di controllo all'eNodeB LTE e alla Core Network **EPC**. Il gNodeB 5G funge solo da acceleratore di banda dati per il piano utente.\n* **Standalone (SA - Opzione 2)**: è l'architettura 5G pura e autonoma. Il terminale si connette direttamente al **gNodeB 5G NR**, che è collegato alla nuova **Core Network 5GC (SBA)**. È l'unica modalità che abilita nativamente il vero Network Slicing end-to-end e la latenza ultra-bassa di URLLC.",
        "node": "Deployment Standalone (SA) vs Non-Standalone (NSA)",
        "note": "01 Introduzione 5G"
      }
    ]
  }
];
