// Database definitivo delle flashcards per Reti Wireless (Reti Cellulari)
// Generato automaticamente da RetiCellulari.excalidraw
window.DEFAULT_TOPICS = [
  {
    "topic_id": "reticell_architettura",
    "topic_name": "1. Reti Cellulari, Antenne e Propagazione",
    "cards": [
      {
        "id": "reticell-001",
        "front": "Che cos'è una rete cellulare mobile e su quale principio si basa?",
        "back": "È un'architettura di rete wireless in cui il territorio è suddiviso in aree geografiche elementari (celle), ciascuna servita da una stazione radio base.",
        "node": "Reti Cellulari",
        "note": "Introduzione alle reti cellulari e al riuso",
        "image": "",
        "image_side": "nessuno",
        "extra": "Consente di riutilizzare le stesse frequenze a distanza spaziale controllata.",
        "difficolta": 1
      },
      {
        "id": "reticell-002",
        "front": "Qual è il principale vantaggio del partizionamento del territorio in celle?",
        "back": "Permette il riuso delle frequenze nello spazio, moltiplicando la capacità complessiva del sistema rispetto a una copertura a singola cella.",
        "node": "Reti Cellulari",
        "note": "Lezione 01 22 febbraio - 38",
        "image": "",
        "image_side": "nessuno",
        "extra": "A parità di banda spettrale licenziata, aumenta gli utenti contemporanei.",
        "difficolta": 1
      },
      {
        "id": "reticell-003",
        "front": "Che cos'è un radiatore isotropico e come irradia la potenza?",
        "back": "È un'antenna ideale puntiforme che irradia potenza elettromagnetica con la stessa intensità in tutte le direzioni dello spazio sferico.",
        "node": "Radiatore Isotropico",
        "note": "Lezione 01 22 febbraio - 21",
        "image": "",
        "image_side": "nessuno",
        "extra": "Riferimento teorico per il calcolo del guadagno d'antenna.",
        "difficolta": 1
      },
      {
        "id": "reticell-004",
        "front": "Qual è la formula della densità di potenza isotropica S_iso a distanza d?",
        "back": "S_iso = Pt / (4 * pi * d^2), espressa in W/m^2. La potenza totale Pt si distribuisce uniformemente sulla superficie sferica 4*pi*d^2.",
        "node": "Radiatore Isotropico",
        "note": "Formulario Reti Wireless - Sez 1.2",
        "image": "",
        "image_side": "nessuno",
        "extra": "Decadimento quadratico con la distanza nello spazio libero.",
        "difficolta": 2
      },
      {
        "id": "reticell-005",
        "front": "Qual è la funzione di un'antenna direttiva rispetto a quella isotropica?",
        "back": "Focalizza la potenza irradiata verso una direzione privilegiata dello spazio, aumentando la densità di potenza utile e riducendo l'interferenza nelle altre direzioni.",
        "node": "Antenne direttive",
        "note": "Lezione 01 22 febbraio - 22",
        "image": "",
        "image_side": "nessuno",
        "extra": "Il guadagno Gt quantifica l'amplificazione direzionale.",
        "difficolta": 1
      },
      {
        "id": "reticell-006",
        "front": "Come si definisce l'EIRP e cosa rappresenta fisicamente?",
        "back": "L'EIRP (Equivalent Isotropically Radiated Power) è la potenza che dovrebbe irradiare un radiatore isotropico per produrre la stessa densità di potenza nella direzione di massimo lobo.",
        "node": "EIRP",
        "note": "Lezione 01 22 febbraio - 24",
        "image": "RetiCellulari-img-01-eirp.png",
        "image_side": "retro",
        "extra": "EIRP = Pt * Gt, o in decibel: EIRP_dBm = Pt_dBm + Gt_dBi.",
        "difficolta": 2
      },
      {
        "id": "reticell-007",
        "front": "Quale relazione fisica fondamentale è espressa da questa formula?",
        "back": "La densità di potenza direzionale S a distanza d in funzione dell'EIRP: S = EIRP / (4*pi*d^2) = (Pt * Gt) / (4*pi*d^2).",
        "node": "EIRP",
        "note": "Slide Reti cellulari",
        "image": "RetiCellulari-img-01-eirp.png",
        "image_side": "fronte",
        "extra": "Formula slide Lezione 01.",
        "difficolta": 2
      },
      {
        "id": "reticell-008",
        "front": "Qual è la formula di trasmissione di Friis in forma lineare?",
        "back": "Pr = Pt * Gt * Gr * (lambda / (4 * pi * d))^2. Lega la potenza ricevuta Pr alla potenza trasmessa e alla distanza d nello spazio libero.",
        "node": "Formula di FRISS",
        "note": "Formulario Reti Wireless - Sez 1.5",
        "image": "RetiCellulari-img-02-friis.png",
        "image_side": "retro",
        "extra": "Valida in condizioni di campo lontano d >= d0.",
        "difficolta": 2
      },
      {
        "id": "reticell-009",
        "front": "Identifica la formula in figura e specifica la condizione di validità.",
        "back": "È la formula di Friis per la propagazione in spazio libero (LOS), valida in assenza di ostacoli e per distanze superiori alla regione di campo vicino.",
        "node": "Formula di FRISS",
        "note": "Slide Reti cellulari",
        "image": "RetiCellulari-img-02-friis.png",
        "image_side": "fronte",
        "extra": "Esponente di propagazione eta = 2.",
        "difficolta": 1
      },
      {
        "id": "reticell-010",
        "front": "Quali sono i tre blocchi concettuali che compongono l'espressione di Friis mostrata?",
        "back": "1) Potenza trasmessa e guadagno Tx (EIRP); 2) Attenuazione geometrica di spazio libero (1/(4*pi*d^2)); 3) Area efficace dell'antenna ricevente (Ae = Gr * lambda^2 / 4*pi).",
        "node": "Formula di FRISS",
        "note": "Slide Reti cellulari",
        "image": "RetiCellulari-img-03-friis-dettaglio.png",
        "image_side": "fronte",
        "extra": "Pr = (Pt*Gt) * (1/(4*pi*d^2)) * (Gr*lambda^2 / 4*pi).",
        "difficolta": 2
      },
      {
        "id": "reticell-011",
        "front": "Cosa rappresenta l'esponente di propagazione eta (o gamma) e quanto vale nei vari ambienti?",
        "back": "Misura la rapidità con cui decade la potenza ricevuta con la distanza (Pr proporzionale a d^(-eta)). Vale 2 in spazio libero, e tra 3 e 5 in ambienti urbani terrestri.",
        "node": "ETA",
        "note": "Lezione 01 22 febbraio - 30",
        "image": "",
        "image_side": "nessuno",
        "extra": "Nel modello a due raggi (Two-Ray ground) a grandi distanze vale esattamente 4.",
        "difficolta": 2
      },
      {
        "id": "reticell-012",
        "front": "Cosa comporta un aumento dell'esponente di attenuazione eta per il raggio di cella R?",
        "back": "A parità di potenza emessa, la potenza decade molto più rapidamente, contraendo il raggio di copertura utile R della cella.",
        "node": "ETA",
        "note": "Lezione 04 3 marzo - 13",
        "image": "",
        "image_side": "nessuno",
        "extra": "Tuttavia, attenua più fortemente anche l'interferenza co-canale dai siti vicini.",
        "difficolta": 2
      },
      {
        "id": "reticell-071",
        "front": "Qual è la formula della distanza di visibilità dell'orizzonte radio tra due antenne elevate?",
        "back": "d_radio = sqrt(2 * R' * ht) + sqrt(2 * R' * hr) approx 4.12 * (sqrt(ht) + sqrt(hr)) in km, con ht, hr in metri ed R' = (4/3)*R_terra.",
        "node": "Orizzonte ottico ed orizzonte radio",
        "note": "Formulario Reti Wireless - Sez 1.6",
        "image": "",
        "image_side": "nessuno",
        "extra": "Il raggio terrestre fittizio R' tiene conto della rifrazione atmosferica standard.",
        "difficolta": 2
      },
      {
        "id": "reticell-072",
        "front": "Perché l'orizzonte radio d_radio è circa il 15% più esteso dell'orizzonte ottico d_ottico?",
        "back": "A causa del gradiente di indice di rifrazione dell'atmosfera con la quota, che incurva i raggi elettromagnetici verso la superficie terrestre.",
        "node": "Orizzonte ottico ed orizzonte radio",
        "note": "Lezione 01 22 febbraio - 28",
        "image": "",
        "image_side": "nessuno",
        "extra": "Si modella incrementando il raggio terrestre a R' = (4/3)*R approx 8500 km.",
        "difficolta": 2
      },
      {
        "id": "reticell-073",
        "front": "Qual è la formula asintotica di potenza ricevuta nel modello a due raggi (Two-Ray Ground)?",
        "back": "Pr = Pt * Gt * Gr * (ht * hr)^2 / d^4. La potenza ricevuta decade con la quarta potenza della distanza ed è indipendente dalla frequenza.",
        "node": "Modello a due raggi e decadimento d^4",
        "note": "Formulario Reti Wireless - Sez 1.8",
        "image": "",
        "image_side": "nessuno",
        "extra": "Valida per distanze oltre la distanza di crossover d_c = (4 * pi * ht * hr) / lambda.",
        "difficolta": 3
      },
      {
        "id": "reticell-074",
        "front": "Perché nel modello a due raggi la potenza decade con d^4 anziché con d^2?",
        "back": "Perché il raggio riflesso dal suolo subisce uno sfasamento di circa 180 gradi rispetto al raggio diretto, provocando un'interferenza distruttiva quasi perfetta a grande distanza.",
        "node": "Modello a due raggi e decadimento d^4",
        "note": "Lezione 01 22 febbraio - 29",
        "image": "",
        "image_side": "nessuno",
        "extra": "Dimostra perché a terra l'esponente di attenuazione effettivo eta sale a 4.",
        "difficolta": 3
      }
    ]
  },
  {
    "topic_id": "reticell_riuso_sir",
    "topic_name": "2. Riuso di Frequenza, Geometria Cluster e Analisi SIR",
    "cards": [
      {
        "id": "reticell-013",
        "front": "Qual è il limite principale della progettazione a singola cella?",
        "back": "La capacità complessiva è rigidamente limitata dalla banda totale assegnata, poiché tutte le frequenze possono essere usate una sola volta in tutta l'area.",
        "node": "Singola Cella",
        "note": "Lezione 01 22 febbraio - 33",
        "image": "RetiCellulari-img-04-singola-cella.png",
        "image_side": "retro",
        "extra": "Se ho 12 frequenze, posso servire solo 12 canali simultanei in tutto il territorio.",
        "difficolta": 1
      },
      {
        "id": "reticell-014",
        "front": "Quale scenario operativo è illustrato nel diagramma?",
        "back": "Copertura mediante singola stazione radio base centrale con frequenze dedicate f1..f12 senza riuso spaziale.",
        "node": "Singola Cella",
        "note": "Slide Reti cellulari",
        "image": "RetiCellulari-img-04-singola-cella.png",
        "image_side": "fronte",
        "extra": "Semplice installazione ma capacità totale limitata a N canali.",
        "difficolta": 1
      },
      {
        "id": "reticell-015",
        "front": "Come il sistema multicella supera il limite di capacità della singola cella?",
        "back": "Fraziona il territorio in tante celle e riutilizza lo stesso gruppo di frequenze in celle distanti, moltiplicando la capacità per il numero di volte che le frequenze sono riusate.",
        "node": "Multi Cella",
        "note": "Lezione 01 22 febbraio - 35",
        "image": "RetiCellulari-img-11-capacita-multicella.png",
        "image_side": "retro",
        "extra": "Capacità complessiva C_tot = M * (Banda / N_cluster).",
        "difficolta": 2
      },
      {
        "id": "reticell-016",
        "front": "Cosa dimostra la formula di capacità del sistema multicella mostrata?",
        "back": "Mostra che la capacità di sistema scala linearmente con il numero di celle M, permettendo di aumentare la densità di utenti semplicemente riducendo il raggio delle celle.",
        "node": "Multi Cella",
        "note": "Slide Reti cellulari",
        "image": "RetiCellulari-img-11-capacita-multicella.png",
        "image_side": "fronte",
        "extra": "Capacità totale = M * (Banda_cella / canali).",
        "difficolta": 2
      },
      {
        "id": "reticell-017",
        "front": "Quali elementi tecnici richiede la gestione di un'infrastruttura multicella?",
        "back": "Richiede pianificazione delle frequenze, gestione della mobilità (handover tra celle adiacenti) e controllo dell'interferenza co-canale.",
        "node": "Progetto stazione radio base",
        "note": "Lezione 01 22 febbraio - 35",
        "image": "",
        "image_side": "nessuno",
        "extra": "Costi di installazione e complessità di rete più elevati rispetto a singola cella.",
        "difficolta": 2
      },
      {
        "id": "reticell-018",
        "front": "Che cos'è il riuso unitario (N=1)?",
        "back": "È la configurazione in cui ogni cella del sistema utilizza l'intera banda disponibile di sistema senza partizionamento tra celle adiacenti.",
        "node": "Riuso Unitario",
        "note": "Lezione 01 22 febbraio - 36",
        "image": "",
        "image_side": "nessuno",
        "extra": "Adottato in CDMA ed LTE/5G.",
        "difficolta": 2
      },
      {
        "id": "reticell-019",
        "front": "Qual è il principale inconveniente del riuso di frequenza tra celle diverse?",
        "back": "Genera interferenza co-canale (CCI), che degrada il rapporto segnale/interferenza (SIR) specialmente al bordo cella dove la potenza del segnale utile è minima.",
        "node": "Interferenza tra celle",
        "note": "Lezione 01 22 febbraio - 37",
        "image": "",
        "image_side": "nessuno",
        "extra": "L'interferenza co-canale dipende dal rapporto tra distanza di riuso D e raggio R.",
        "difficolta": 2
      },
      {
        "id": "reticell-020",
        "front": "Definisci il concetto di riuso cellulare e la sua metrica principale Q.",
        "back": "È l'allocazione delle stesse frequenze a celle separate da una distanza D tale che l'interferenza co-canale rimanga sotto una soglia tollerabile. Q = D / R.",
        "node": "Riuso Cellulare",
        "note": "Lezione 02 24 febbraio - 02",
        "image": "",
        "image_side": "nessuno",
        "extra": "Q è il fattore di riuso o rapporto di protezione.",
        "difficolta": 1
      },
      {
        "id": "reticell-021",
        "front": "Che cos'è un cluster di celle e quali valori può assumere la sua dimensione N?",
        "back": "È il gruppo minimo di celle adiacenti a cui viene assegnato l'intero insieme di frequenze disponibili senza ripetizioni. N assume valori ammissibili N = u^2 + u*v + v^2.",
        "node": "Cluster",
        "note": "Lezione 02 24 febbraio - 06",
        "image": "RetiCellulari-img-06-cluster-uv.png",
        "image_side": "retro",
        "extra": "Valori ammissibili: N in {1, 3, 4, 7, 9, 12, ...}.",
        "difficolta": 2
      },
      {
        "id": "reticell-022",
        "front": "Come si determinano i centri delle celle co-canale usando gli assi u e v in figura?",
        "back": "Partendo dal centro di una cella, ci si sposta di u passi lungo l'asse u, si ruota di 60 gradi in senso antiorario e ci si sposta di v passi lungo l'asse v.",
        "node": "Cluster",
        "note": "Slide Reti cellulari",
        "image": "RetiCellulari-img-06-cluster-uv.png",
        "image_side": "fronte",
        "extra": "Formula della distanza D = R * sqrt(3*(u^2 + u*v + v^2)).",
        "difficolta": 2
      },
      {
        "id": "reticell-023",
        "front": "Qual è la formula che lega la distanza di riuso D al raggio R e alla dimensione N del cluster?",
        "back": "D = R * sqrt(3 * N), dove R è il raggio dell'esagono circoscritto e N è il numero di celle del cluster.",
        "node": "Distanza di riuso",
        "note": "Formulario Reti Wireless - Sez 2.2",
        "image": "RetiCellulari-img-05-distanza-riuso.png",
        "image_side": "retro",
        "extra": "Il fattore di riuso adimensionale vale Q = D / R = sqrt(3 * N).",
        "difficolta": 2
      },
      {
        "id": "reticell-024",
        "front": "Quale formula geometrica è rappresentata nell'immagine?",
        "back": "La relazione della distanza di riuso D = R * radice(3*N), che definisce la spaziatura minima tra stazioni base che condividono le medesime frequenze.",
        "node": "Distanza di riuso",
        "note": "Slide Reti cellulari",
        "image": "RetiCellulari-img-05-distanza-riuso.png",
        "image_side": "fronte",
        "extra": "Derivata dalla geometria della griglia esagonale.",
        "difficolta": 1
      },
      {
        "id": "reticell-025",
        "front": "Come si esprime la capacità di canale di Shannon in presenza di rumore?",
        "back": "C = B * log2(1 + S / N), espressa in bit/s, dove B è la banda in Hz ed S/N è il rapporto segnale/rumore in potenza lineare.",
        "node": "Rapporto segnale disturbo - Shannon",
        "note": "Formulario Reti Wireless - Sez 2.3",
        "image": "RetiCellulari-img-07-shannon.png",
        "image_side": "retro",
        "extra": "Limite teorico massimo insuperabile per canale AWGN.",
        "difficolta": 2
      },
      {
        "id": "reticell-026",
        "front": "Indica il significato della formula di Shannon mostrata nell'immagine.",
        "back": "Rappresenta la capacità massima teorica di trasmissione C [bit/s] su canale a banda B con rapporto segnale/disturbo S/N.",
        "node": "Rapporto segnale disturbo - Shannon",
        "note": "Slide Reti cellulari",
        "image": "RetiCellulari-img-07-shannon.png",
        "image_side": "fronte",
        "extra": "Base per la modulazione adattativa e la codifica di canale.",
        "difficolta": 1
      },
      {
        "id": "reticell-027",
        "front": "Qual è la differenza fondamentale tra SINR e SIR in una rete cellulare?",
        "back": "Il SINR include al denominatore sia l'interferenza co-canale I che il rumore termico N (S/(I+N)); il SIR trascura il rumore termico (C/I), valida in regimi interference-limited.",
        "node": "SINR e SIR",
        "note": "Lezione 02 24 febbraio - 09",
        "image": "RetiCellulari-img-08-sinr.png",
        "image_side": "retro",
        "extra": "Nelle reti cellulari urbane il sistema è quasi sempre interference-limited (SIR approx SINR).",
        "difficolta": 2
      },
      {
        "id": "reticell-028",
        "front": "Quale grandezza esprime la formula in figura e quando si approssima a SIR?",
        "back": "Esprime il SINR = S / (somma(I_i) + N). Quando l'interferenza co-canale somma(I_i) domina nettamente il rumore termico N, il SINR collassa a SIR = C / I.",
        "node": "SINR e SIR",
        "note": "Slide Reti cellulari",
        "image": "RetiCellulari-img-08-sinr.png",
        "image_side": "fronte",
        "extra": "Slide Lezione 02.",
        "difficolta": 2
      },
      {
        "id": "reticell-029",
        "front": "Come si modella la potenza ricevuta Pr a distanza d nel modello semplificato con esponente eta?",
        "back": "Pr(d) = k * Pt * d^(-eta), dove k è una costante d'antenna e di propagazione ed eta è l'esponente di attenuazione.",
        "node": "Potenza ricevuta Pr",
        "note": "Lezione 02 24 febbraio - 10",
        "image": "RetiCellulari-img-09-potenza-eta.png",
        "image_side": "retro",
        "extra": "In decibel: Pr_dB = k_dB + Pt_dB - 10*eta*log10(d).",
        "difficolta": 2
      },
      {
        "id": "reticell-030",
        "front": "Cosa descrive la relazione di proporzionalità Pr mostrata in figura?",
        "back": "Descrive il decadimento della potenza ricevuta Pr proporzionale a d^(-gamma) (o d^(-eta)), parametrizzata dalla costante k e dalla potenza emessa Pt.",
        "node": "Potenza ricevuta Pr",
        "note": "Slide Reti cellulari",
        "image": "RetiCellulari-img-09-potenza-eta.png",
        "image_side": "fronte",
        "extra": "Modello base per la derivazione del SIR di cella.",
        "difficolta": 1
      },
      {
        "id": "reticell-031",
        "front": "Perché il SIR al bordo cella è indipendente dal raggio assoluto R della cella?",
        "back": "Perché sia la potenza del segnale utile C (proporzionale a R^(-eta)) sia l'interferenza I (proporzionale a D^(-eta)) scalano con la stessa potenza; nel rapporto C/I il termine R si semplifica.",
        "node": "Indipendenza dalla grandezza della cella",
        "note": "Lezione 02 24 febbraio - 12",
        "image": "",
        "image_side": "nessuno",
        "extra": "SIR = (1/ni) * (D/R)^eta = (1/ni) * (3*N)^(eta/2).",
        "difficolta": 3
      },
      {
        "id": "reticell-032",
        "front": "Come si scrive la formula analitica del SIR in funzione di Q ed eta nel caso peggiore?",
        "back": "SIR_lineare = (1 / ni) * Q^eta = (1 / ni) * (3 * N)^(eta / 2), dove ni è il numero di interferenti co-canale del primo anello.",
        "node": "Gamma è SIR ed è lineare",
        "note": "Formulario Reti Wireless - Sez 2.4",
        "image": "RetiCellulari-img-10-sir-lineare.png",
        "image_side": "retro",
        "extra": "In dB: SIR_dB = 10*log10(1/ni) + 10*(eta/2)*log10(3*N).",
        "difficolta": 2
      },
      {
        "id": "reticell-033",
        "front": "Indica cosa rappresentano gamma e ni nell'equazione di progetto mostrata.",
        "back": "gamma (o Gamma_th) è la soglia minima di SIR lineare richiesta per il servizio, mentre ni è il numero di stazioni radio base interferenti del primo ordine.",
        "node": "Gamma è SIR ed è lineare",
        "note": "Slide Reti cellulari",
        "image": "RetiCellulari-img-10-sir-lineare.png",
        "image_side": "fronte",
        "extra": "ni = 6 per celle omnidirezionali, ni = 2 per settorizzazione a 120 gradi.",
        "difficolta": 2
      },
      {
        "id": "reticell-034",
        "front": "Perché con la settorializzazione a 120 gradi gli interferenti si riducono da 6 a 2?",
        "back": "Perché le antenne direttive irradiano solo su un arco di 120 gradi, eliminando i lobi verso gli altri 4 interferenti del primo anello che non puntano verso il settore.",
        "node": "ni = 6 omnidirezionale / ni = 2 con 3 settori",
        "note": "Lezione 02 24 febbraio - 16",
        "image": "",
        "image_side": "nessuno",
        "extra": "Guadagno in SIR = 10*log10(6/2) = 10*log10(3) approx 4.77 dB.",
        "difficolta": 2
      },
      {
        "id": "reticell-035",
        "front": "Qual è il costo prestazionale della settorializzazione delle celle a 3 settori?",
        "back": "La banda della cella viene partizionata tra i 3 settori (ciascuno con 1/3 dei canali), causando una perdita di efficienza di aggregazione del traffico (trunking efficiency).",
        "node": "Settorizzazione",
        "note": "Lezione 02 24 febbraio - 15",
        "image": "",
        "image_side": "nessuno",
        "extra": "Servono più canali totali per garantire la stessa probabilità di blocco di Erlang-B.",
        "difficolta": 2
      },
      {
        "id": "reticell-036",
        "front": "Come si adatta la formula di Shannon al sistema multicella interference-limited?",
        "back": "Si sostituisce il rapporto segnale/rumore (SNR) con il rapporto segnale/interferenza (SIR): C_cella = B_cella * log2(1 + SIR).",
        "node": "Shannon con Multicella",
        "note": "Lezione 02 24 febbraio - 13",
        "image": "",
        "image_side": "nessuno",
        "extra": "La capacità per cella non cresce aumentando la potenza Pt, perché cresce proporzionalmente anche l'interferenza I.",
        "difficolta": 3
      },
      {
        "id": "reticell-075",
        "front": "Come si ricavano le coordinate oblique u e v per individuare i cluster ammissibili?",
        "back": "Si imposta una griglia di assi inclinati di 60 gradi passanti per i centri degli esagoni. Il numero di celle vale N = u^2 + u*v + v^2 con u, v interi.",
        "node": "Coordinate oblique (u, v)",
        "note": "Lezione 02 24 febbraio - 04",
        "image": "",
        "image_side": "nessuno",
        "extra": "Ad esempio u=1, v=1 dà N = 1+1+1 = 3; u=2, v=1 dà N = 4+2+1 = 7.",
        "difficolta": 2
      },
      {
        "id": "reticell-076",
        "front": "Qual è la formula della distanza D tra due celle generiche aventi coordinate cartesiane oblique?",
        "back": "D^2 = 3 * R^2 * (u^2 + u*v + v^2) = 3 * R^2 * N, da cui D = R * sqrt(3*N).",
        "node": "Coordinate oblique (u, v)",
        "note": "Lezione 02 24 febbraio - 05",
        "image": "",
        "image_side": "nessuno",
        "extra": "R è il raggio dell'esagono circoscritto.",
        "difficolta": 2
      },
      {
        "id": "reticell-077",
        "front": "Qual è la differenza fondamentale tra Fractional Frequency Reuse (FFR) e Soft Frequency Reuse (SFR)?",
        "back": "FFR riserva bande ortogonali disgiunte tra centro e bordo cella; SFR usa tutta la banda ovunque ma modula la potenza, trasmettendo a piena potenza al bordo su bande ortogonali.",
        "node": "Riuso frazionario: FFR ed SFR",
        "note": "Lezione 04 3 marzo - 22",
        "image": "",
        "image_side": "nessuno",
        "extra": "SFR massimizza l'efficienza spettrale consentendo riuso 1 al centro con potenza ridotta.",
        "difficolta": 3
      },
      {
        "id": "reticell-078",
        "front": "A quale scopo vengono adottate le tecniche FFR ed SFR nelle reti moderne come LTE e 5G?",
        "back": "Servono a mitigare l'interferenza inter-cella al bordo della cella garantendo al contempo un riuso unitario della frequenza (N=1) nella parte centrale della cella.",
        "node": "Riuso frazionario: FFR ed SFR",
        "note": "Riuso cellulare, FFR e SFR",
        "image": "",
        "image_side": "nessuno",
        "extra": "Migliorano il throughput degli utenti periferici senza sacrificare la capacità complessiva.",
        "difficolta": 2
      }
    ]
  },
  {
    "topic_id": "reticell_accesso_multiplo",
    "topic_name": "3. Tecniche di Accesso Multiplo (FDMA, TDMA, CDMA, OFDMA)",
    "cards": [
      {
        "id": "reticell-037",
        "front": "Qual è la differenza fondamentale tra duplexing FDD e duplexing TDD?",
        "back": "L'FDD separa uplink e downlink su due frequenze distinte contemporaneamente; il TDD usa la stessa frequenza separando uplink e downlink in slot temporali alternati.",
        "node": "FDD e TDD",
        "note": "Lezione 02 24 febbraio - 20",
        "image": "",
        "image_side": "nessuno",
        "extra": "FDD richiede filtri duplexer e banda di guardia; TDD permette allocazione asimmetrica flessibile.",
        "difficolta": 2
      },
      {
        "id": "reticell-038",
        "front": "Perché le problematiche di potenza differiscono radicalmente tra Uplink e Downlink?",
        "back": "Nel Downlink la stazione base ha alimentazione di rete e trasmette a tutti gli utenti; nell'Uplink il terminale mobile è a batteria e deve contenere la potenza per non interferire con gli altri.",
        "node": "Distribuzione potenza Uplink e Downlink",
        "note": "Lezione 02 24 febbraio - 21",
        "image": "",
        "image_side": "nessuno",
        "extra": "In uplink è essenziale il controllo di potenza ad anello chiuso per risolvere il problema near-far.",
        "difficolta": 2
      },
      {
        "id": "reticell-039",
        "front": "Quali sono le tre famiglie fondamentali di tecniche di accesso multiplo al canale?",
        "back": "1) Canalizzazione statica (FDMA, TDMA, CDMA, OFDMA); 2) Accesso controllato (polling, prenotazione, token); 3) Accesso casuale (ALOHA, Slotted ALOHA, CSMA).",
        "node": "Accesso Multiplo",
        "note": "Slide Reti cellulari",
        "image": "RetiCellulari-img-12-tre-famiglie-accesso.png",
        "image_side": "fronte",
        "extra": "Come rappresentato nel diagramma tassonomico.",
        "difficolta": 1
      },
      {
        "id": "reticell-040",
        "front": "Qual è il principio della canalizzazione statica e quale limite presenta?",
        "back": "Assegna porzioni dedicate e ortogonali di frequenza, tempo o codice a ciascun utente. Il limite è lo spreco di risorse in presenza di traffico a raffica (bursty).",
        "node": "Canalizzazione",
        "note": "Lezione 02 24 febbraio - 22",
        "image": "",
        "image_side": "nessuno",
        "extra": "Ottimale per traffico continuo come la voce, inefficiente per il traffico dati a pacchetto.",
        "difficolta": 2
      },
      {
        "id": "reticell-041",
        "front": "Come funziona l'accesso multiplo FDMA (Frequency Division Multiple Access)?",
        "back": "La banda totale viene suddivisa in sottobande di frequenza disgiunte (canali radio); a ciascuna comunicazione è assegnata una frequenza per tutta la durata della connessione.",
        "node": "FDMA",
        "note": "Lezione 02 24 febbraio - 22",
        "image": "",
        "image_side": "nessuno",
        "extra": "Richiede filtri passabanda selettivi per evitare cross-talk.",
        "difficolta": 1
      },
      {
        "id": "reticell-042",
        "front": "Come funziona l'accesso multiplo TDMA (Time Division Multiple Access)?",
        "back": "Tutti gli utenti condividono la stessa frequenza portante trasmettendo a turno all'interno di intervalli temporali dedicati e periodici (time slot all'interno di una trama).",
        "node": "TDMA",
        "note": "Lezione 02 24 febbraio - 22",
        "image": "",
        "image_side": "nessuno",
        "extra": "Richiede una rigorosa sincronizzazione temporale e tempi di guardia.",
        "difficolta": 1
      },
      {
        "id": "reticell-043",
        "front": "Quale principio fisico-matematico permette la separazione dei segnali in CDMA?",
        "back": "La moltiplicazione per sequenze di codice pseudo-casuali mutuamente ortogonali; in ricezione l'integrale del prodotto del segnale ricevuto con il codice proprio estrae il bit trasmesso.",
        "node": "CDMA",
        "note": "Slide Reti cellulari",
        "image": "RetiCellulari-img-13-cdma-ortogonali.png",
        "image_side": "fronte",
        "extra": "Tutti gli utenti trasmettono contemporaneamente sulla medesima frequenza.",
        "difficolta": 2
      },
      {
        "id": "reticell-044",
        "front": "Come opera l'accesso controllato a prenotazione o polling?",
        "back": "Un nodo coordinatore centrale interroga a turno i nodi (polling) o i nodi inviano brevi messaggi di prenotazione per ottenere uno slot di trasmissione garantito e privo di collisioni.",
        "node": "Accesso Controllato",
        "note": "Lezione 02 24 febbraio - 23",
        "image": "",
        "image_side": "nessuno",
        "extra": "Evita collisioni ma introduce latenza e overhead di coordinamento.",
        "difficolta": 2
      },
      {
        "id": "reticell-045",
        "front": "Che cos'è l'accesso casuale (random access)?",
        "back": "È un paradigma di accesso in cui i terminali trasmettono spontaneamente quando hanno dati pronti, gestendo le possibili collisioni mediante meccanismi di riscontro e ritrasmissione.",
        "node": "Accesso Casuale",
        "note": "Lezione 02 24 febbraio - 24",
        "image": "",
        "image_side": "nessuno",
        "extra": "Include le famiglie ALOHA e CSMA.",
        "difficolta": 1
      },
      {
        "id": "reticell-046",
        "front": "Perché il meccanismo CSMA/CD di Ethernet non è applicabile nelle reti wireless?",
        "back": "Perché nel mezzo radio la potenza trasmessa locale è enormemente superiore al debole segnale ricevuto attenuato, rendendo impossibile rilevare una collisione durante la trasmissione.",
        "node": "CSMA/CD",
        "note": "Lezione 02 24 febbraio - 24",
        "image": "",
        "image_side": "nessuno",
        "extra": "Nelle reti wireless si usa CSMA/CA (Collision Avoidance).",
        "difficolta": 2
      },
      {
        "id": "reticell-047",
        "front": "Quali sono le due differenze cruciali tra mezzo guidato cablato e canale radio?",
        "back": "1) Nel wireless il canale è tempo-variabile, condiviso broadcast e soggetto a multipath/fading; 2) Non è possibile rilevare collisioni mentre si trasmette a causa della grande dinamica di potenza.",
        "node": "Differenza tra reti cablate e wireless",
        "note": "Lezione 01 22 febbraio - 13",
        "image": "",
        "image_side": "nessuno",
        "extra": "Richiede riscontri positivi espliciti (ACK immediati a livello MAC).",
        "difficolta": 1
      },
      {
        "id": "reticell-048",
        "front": "Che cos'è la modulazione OFDM (Orthogonal Frequency Division Multiplexing)?",
        "back": "È una tecnica di modulazione che suddivide un flusso dati ad alta velocità in molti flussi paralleli a bassa velocità modulati su sottoportanti ortogonali strettamente spaziate.",
        "node": "OFDM",
        "note": "Lezione 03 1 marzo - 24",
        "image": "",
        "image_side": "nessuno",
        "extra": "Spaziatura minima Delta_f = 1 / T_simbolo.",
        "difficolta": 2
      },
      {
        "id": "reticell-049",
        "front": "A cosa servono le portanti pilota (pilot carriers o reference signals) in OFDM?",
        "back": "Trasmettono simboli noti al ricevitore per stimare la risposta in frequenza del canale, correggere la fase e consentire la demodulazione coerente dei dati.",
        "node": "Sottoportanti, flussi paralleli e portanti pilota",
        "note": "Lezione 03 1 marzo - 24",
        "image": "",
        "image_side": "nessuno",
        "extra": "In LTE sono i Cell-specific Reference Signals (CRS).",
        "difficolta": 2
      },
      {
        "id": "reticell-050",
        "front": "Come fa l'OFDM a trasformare un canale selettivo in frequenza in canali con fading piatto?",
        "back": "Aumentando la durata del simbolo su ciascuna sottoportante (T >> delay spread), la banda della singola portante diventa inferiore alla banda di coerenza del canale (B_sub << B_c).",
        "node": "Delay spread, fading piatto e selettivita in frequenza",
        "note": "Lezione 03 1 marzo - 25",
        "image": "",
        "image_side": "nessuno",
        "extra": "Ogni sottoportante sperimenta un guadagno costante, equalizzabile con un singolo moltiplicatore.",
        "difficolta": 3
      },
      {
        "id": "reticell-051",
        "front": "A cosa serve il prefisso ciclico (Cyclic Prefix) in OFDM?",
        "back": "Copia la coda del simbolo OFDM in testa all'intervallo di guardia; elimina l'interferenza inter-simbolica (ISI) causata dal multipath e preserva l'ortogonalità tra sottoportanti.",
        "node": "Prefisso ciclico e intervallo di guardia temporale",
        "note": "Lezione 03 1 marzo - 26",
        "image": "",
        "image_side": "nessuno",
        "extra": "La durata T_cp deve essere maggiore del massimo ritardo di multipath (delay spread).",
        "difficolta": 2
      },
      {
        "id": "reticell-052",
        "front": "Come avviene l'allocazione delle risorse agli utenti nella griglia OFDMA mostrata?",
        "back": "Le risorse sono suddivise in blocchi bidimensionali tempo-frequenza (Resource Block); lo scheduler assegna dinamicamente blocchi differenti a utenti diversi ogni slot temporale.",
        "node": "OFDMA",
        "note": "Slide Reti cellulari",
        "image": "RetiCellulari-img-14-ofdma-griglia.png",
        "image_side": "fronte",
        "extra": "Consente l'adattamento dinamico in base al canale di ogni utente (scheduling opportunistico).",
        "difficolta": 2
      },
      {
        "id": "reticell-070",
        "front": "In base a quale trade-off si sceglie tra canalizzazione statica e accesso casuale?",
        "back": "La canalizzazione è ottimale per traffico continuo e garantito (bassa variabilità, QoS rigida); l'accesso casuale è ideale per carichi bassi e fortemente a raffica (bursty).",
        "node": "Tre famiglie di accesso multiplo e relaz",
        "note": "Lezione 02 24 febbraio - 25",
        "image": "",
        "image_side": "nessuno",
        "extra": "Per carichi intermedi si usano schemi a prenotazione (accesso controllato).",
        "difficolta": 2
      }
    ]
  },
  {
    "topic_id": "reticell_aloha",
    "topic_name": "4. Protocolli ad Accesso Casuale (ALOHA e Slotted ALOHA)",
    "cards": [
      {
        "id": "reticell-053",
        "front": "Qual è la regola operativa fondamentale del protocollo ALOHA puro?",
        "back": "Ogni stazione trasmette immediatamente il pacchetto non appena è disponibile. Se riceve l'ACK prima del timeout ha successo, altrimenti ritrasmette dopo un backoff casuale.",
        "node": "ALOHA",
        "note": "Lezione 03 1 marzo - 05",
        "image": "RetiCellulari-img-15-aloha-collisioni.png",
        "image_side": "retro",
        "extra": "Completamente asincrono e privo di carrier sensing.",
        "difficolta": 1
      },
      {
        "id": "reticell-054",
        "front": "Cosa mostra il diagramma temporale di ALOHA puro in figura?",
        "back": "Mostra che la sovrapposizione anche solo parziale tra due o più pacchetti trasmessi da nodi diversi provoca la collisione e distruzione di tutti i pacchetti coinvolti.",
        "node": "ALOHA",
        "note": "Slide Reti cellulari",
        "image": "RetiCellulari-img-15-aloha-collisioni.png",
        "image_side": "fronte",
        "extra": "Basta 1 bit sovrapposto per distruggere l'intera trama.",
        "difficolta": 1
      },
      {
        "id": "reticell-055",
        "front": "Come si calcola il tempo di timeout Tout per il riscontro in ALOHA?",
        "back": "Tout = 2 * Tmax = 2 * (T_prop + T_frame), pari al tempo di andata e ritorno del segnale più il tempo di emissione del pacchetto e dell'ACK.",
        "node": "Tempo di attesa del riscontro Tout=2Tmax",
        "note": "Formulario Reti Wireless - Sez 4.1",
        "image": "RetiCellulari-img-16-aloha-timeout.png",
        "image_side": "fronte",
        "extra": "Scaduto il Tout senza ACK, la stazione assume che sia avvenuta una collisione.",
        "difficolta": 2
      },
      {
        "id": "reticell-056",
        "front": "Perché è indispensabile un ritardo di backoff casuale dopo una collisione in ALOHA?",
        "back": "Per evitare che le stazioni che sono entrate in collisione ritrasmettano nello stesso istante, collidendo di nuovo indefinitamente.",
        "node": "Backoff e ritrasmissione",
        "note": "Lezione 03 1 marzo - 06",
        "image": "",
        "image_side": "nessuno",
        "extra": "Il tempo di attesa casuale desincronizza le ritrasmissioni dei nodi.",
        "difficolta": 1
      },
      {
        "id": "reticell-057",
        "front": "Qual è la formula della distribuzione di Poisson per la generazione dei pacchetti?",
        "back": "P(k) = ((G)^k / k!) * e^(-G), che esprime la probabilità di generare k pacchetti nell'intervallo temporale considerato, dove G è il tasso medio di arrivo.",
        "node": "Modello di Poisson",
        "note": "Formulario Reti Wireless - Sez 4.2",
        "image": "RetiCellulari-img-17-poisson-grafico.png",
        "image_side": "retro",
        "extra": "Ipotesi di popolazione infinita di sorgenti indipendenti.",
        "difficolta": 2
      },
      {
        "id": "reticell-058",
        "front": "Cosa rappresenta la formula P(0) = e^(-2G) in figura?",
        "back": "Rappresenta la probabilità che nessun altro pacchetto venga generato durante l'intero intervallo di vulnerabilità 2T in ALOHA puro, garantendo il successo del pacchetto.",
        "node": "Modello di Poisson",
        "note": "Slide Reti cellulari",
        "image": "RetiCellulari-img-18-poisson-p0.png",
        "image_side": "fronte",
        "extra": "P_succ = P(0 arrivi in 2T) = e^(-2G).",
        "difficolta": 2
      },
      {
        "id": "reticell-059",
        "front": "Perché il periodo di vulnerabilità di ALOHA puro vale esattamente Tv = 2*T?",
        "back": "Perché un pacchetto di durata T entra in collisione se un altro nodo inizia a trasmettere nell'intervallo (t0 - T, t0 + T), che ha un'estensione totale pari a 2T.",
        "node": "Periodo Vulnerabilità Tv=2T",
        "note": "Lezione 03 1 marzo - 09",
        "image": "",
        "image_side": "nessuno",
        "extra": "T è la durata di emissione del pacchetto.",
        "difficolta": 2
      },
      {
        "id": "reticell-060",
        "front": "Qual è la formula del throughput normalizzato S(G) per ALOHA puro?",
        "back": "S = G * e^(-2G), dove G è il carico offerto totale (nuovi pacchetti più ritrasmissioni).",
        "node": "Throughput di ALOHA",
        "note": "Formulario Reti Wireless - Sez 4.3",
        "image": "RetiCellulari-img-20-throughput-aloha.png",
        "image_side": "retro",
        "extra": "Massimo a G = 0.5, dove S_max = 1 / (2*e) approx 0.184 (18.4%).",
        "difficolta": 2
      },
      {
        "id": "reticell-061",
        "front": "Qual è il punto di massimo della curva S(G) per ALOHA puro mostrata?",
        "back": "Il massimo si ha per un carico offerto G = 0.5 pacchetti/slot, in corrispondenza del quale il throughput vale S_max = 1/(2*e) approx 18.4%.",
        "node": "Throughput di ALOHA",
        "note": "Slide Reti cellulari",
        "image": "RetiCellulari-img-20-throughput-aloha.png",
        "image_side": "fronte",
        "extra": "Per G > 0.5 la rete entra in congestione per collisioni a catena.",
        "difficolta": 2
      },
      {
        "id": "reticell-062",
        "front": "Qual è la formula del numero medio di tentativi di trasmissione E[N] in ALOHA puro?",
        "back": "E[N] = e^(2G). Cresce esponenzialmente al crescere del carico generato G.",
        "node": "Numero medio di tentativi",
        "note": "Formulario Reti Wireless - Sez 4.4",
        "image": "RetiCellulari-img-21-tentativi-aloha.png",
        "image_side": "retro",
        "extra": "In Slotted ALOHA vale invece E[N] = e^G.",
        "difficolta": 2
      },
      {
        "id": "reticell-063",
        "front": "Confronta l'espressione di E[N] tra ALOHA puro e Slotted ALOHA visibile in figura.",
        "back": "In ALOHA puro E[N] = e^(2G), mentre in Slotted ALOHA E[N] = e^G; Slotted ALOHA richiede meno tentativi medi grazie al dimezzamento della vulnerabilità.",
        "node": "Numero medio di tentativi",
        "note": "Slide Reti cellulari",
        "image": "RetiCellulari-img-23-confronto-tentativi.png",
        "image_side": "fronte",
        "extra": "Slide Lezione 03.",
        "difficolta": 2
      },
      {
        "id": "reticell-064",
        "front": "In cosa differisce lo Slotted ALOHA da ALOHA puro e qual è il vantaggio?",
        "back": "Il tempo è discretizzato in slot sincronizzati di durata T; i nodi possono iniziare a trasmettere solo all'inizio di ogni slot. Dimezza la vulnerabilità raddoppiando l'efficienza.",
        "node": "Slotted Aloha",
        "note": "Lezione 03 1 marzo - 15",
        "image": "RetiCellulari-img-19-slotted-vulnerabilita.png",
        "image_side": "retro",
        "extra": "Throughput massimo raddoppiato da 18.4% a 36.8%.",
        "difficolta": 2
      },
      {
        "id": "reticell-065",
        "front": "Perché l'intervallo di vulnerabilità in Slotted ALOHA vale solo Tv = T?",
        "back": "Perché forzando l'inizio della trasmissione ai bordi degli slot, due pacchetti possono collidere solo se arrivano entrambi nello stesso slot temporale T.",
        "node": "Periodo vulnerabilità Tv=T",
        "note": "Slide Reti cellulari",
        "image": "RetiCellulari-img-19-slotted-vulnerabilita.png",
        "image_side": "fronte",
        "extra": "Elimina le collisioni parziali tipiche di ALOHA puro.",
        "difficolta": 2
      },
      {
        "id": "reticell-066",
        "front": "Qual è la formula del throughput di Slotted ALOHA e il suo valore di picco?",
        "back": "S = G * e^(-G). Il valore massimo si ha per G = 1 e vale S_max = 1 / e approx 0.368 (36.8%).",
        "node": "Throughput Slotted ALOHA",
        "note": "Formulario Reti Wireless - Sez 4.3",
        "image": "RetiCellulari-img-24-throughput-slotted.png",
        "image_side": "retro",
        "extra": "Raddoppia il limite teorico rispetto ad ALOHA puro.",
        "difficolta": 2
      },
      {
        "id": "reticell-067",
        "front": "Descrivi le due curve di throughput messe a confronto nel grafico.",
        "back": "La curva inferiore è ALOHA puro (picco S=18.4% a G=0.5); la curva superiore è Slotted ALOHA (picco S=36.8% a G=1.0).",
        "node": "Throughput Slotted ALOHA",
        "note": "Slide Reti cellulari",
        "image": "RetiCellulari-img-26-confronto-throughput.png",
        "image_side": "fronte",
        "extra": "Dimostra il raddoppio esatto dell'efficienza grazie alla sincronizzazione a slot.",
        "difficolta": 2
      },
      {
        "id": "reticell-068",
        "front": "Che cos'è il carico normalizzato G nei protocolli di accesso casuale?",
        "back": "È il tasso medio complessivo di pacchetti presentati al canale nell'unità di tempo T, includendo sia i pacchetti di prima generazione sia le ritrasmissioni.",
        "node": "Carico Normalizzato",
        "note": "Lezione 03 1 marzo - 10",
        "image": "RetiCellulari-img-27-carico-normalizzato.png",
        "image_side": "retro",
        "extra": "G = lambda * T, dove lambda è la frequenza complessiva di generazione arrivi.",
        "difficolta": 2
      },
      {
        "id": "reticell-069",
        "front": "Quale formula di bilancio lega il carico offerto G al throughput S?",
        "back": "G = S * E[N]. Il carico totale offerto al canale G è pari al tasso di successo S moltiplicato per il numero medio di tentativi necessari E[N].",
        "node": "Carico Normalizzato",
        "note": "Slide Reti cellulari",
        "image": "RetiCellulari-img-27-carico-normalizzato.png",
        "image_side": "fronte",
        "extra": "Poiché E[N] >= 1, si ha sempre G >= S.",
        "difficolta": 2
      }
    ]
  }
];
