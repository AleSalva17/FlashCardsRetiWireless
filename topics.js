// Database iniziale delle flashcards per Reti Wireless
// Può essere arricchito importando altri file JSON direttamente dall'interfaccia mobile
window.DEFAULT_TOPICS = [
  {
    "topic_id": "dim_cella_fading",
    "topic_name": "Dimensionamento Cella, Fading e Shadowing",
    "cards": [
      {
        "id": "FC-01",
        "front": "Qual è la relazione analitica tra potenza ricevuta media Pr(r) e distanza generica r nel modello con distanza di riferimento d0?",
        "back": "Pr(r) = P0 · (d0 / r)^η, dove P0 = Pr(d0) è calcolata tramite la formula di Friis in spazio libero e η è l'esponente di propagazione.",
        "node": "PathLoss e distanza di riferimento / A distanza generica",
        "note": "Lezione 04 3 marzo - 06 - Derivazione della potenza ricevuta a distanza generica"
      },
      {
        "id": "FC-02",
        "front": "Come si calcola la probabilità di outage Pout in presenza di solo fast fading di Rayleigh rispetto alla soglia Pth?",
        "back": "Pout = P(Pr ≤ Pth) = 1 - e^(-Pth / Pr_medio). In assenza di margine (Pr_medio = Pth), l'outage risulta altissimo: 1 - e^(-1) ≈ 63.2%.",
        "node": "Distribuzione di Rayleigh / FastFading e Po coincide con Pth",
        "note": "Lezione 03 1 marzo - 27 - Soglia del ricevitore e probabilità di fuori servizio"
      },
      {
        "id": "FC-03",
        "front": "Come si definisce e a cosa serve il Margine di Potenza (M) contro il fast fading?",
        "back": "È il rapporto M = Pr_medio / Pth ≥ 1 (in dB: M_dB = Pr_medio_dB - Pth_dB). Serve a garantire che l'outage al bordo cella non superi la soglia ammessa (es. Pout ≤ 1% ⇒ M ≈ 100 ⇒ 20 dB).",
        "node": "Margine di potenza e vincolo prestazionale / Esempio con Pout=1%",
        "note": "Lezione 03 1 marzo - 28 - Margine di potenza e vincolo prestazionale"
      },
      {
        "id": "FC-04",
        "front": "Qual è l'effetto dell'introduzione del margine di potenza M sul raggio effettivo di cella R rispetto a R0?",
        "back": "Il margine contrae il raggio secondo la legge R = R0 · M^(-1/η). All'aumentare della protezione richiesta contro il fading, la cella si rimpicciolisce.",
        "node": "Introduzione del margine e riduzione del raggio",
        "note": "Lezione 04 3 marzo - 12 - Introduzione del margine e riduzione del raggio"
      },
      {
        "id": "FC-05",
        "front": "Che distribuzione statistica modella lo Shadowing e come si calcola la relativa Pout?",
        "back": "È modellato da una variabile aleatoria log-normale (in dB segue una Gaussiana N(0, σ²)). L'outage vale Pout = Q(M_dB / σ) = 0.5 · erfc(M_dB / (√2 · σ)).",
        "node": "Shadowing / Derivazione tramite funzione errore complementare",
        "note": "Lezione 04 3 marzo - 09 - Derivazione tramite funzione errore complementare"
      },
      {
        "id": "FC-06",
        "front": "Come si affronta il dimensionamento in presenza simultanea di Shadowing e Fast Fading?",
        "back": "Si somma il margine di fast fading a quello di shadowing in decibel (M_tot_dB ≈ M_FF_dB + M_Sh_dB), o si integra la distribuzione rapida di Rayleigh sulla variazione lenta log-normale.",
        "node": "Presenza simultanea di shadowing e fast fading",
        "note": "Lezione 04 3 marzo - 16 - Presenza simultanea di shadowing e fast fading"
      }
    ]
  },
  {
    "topic_id": "sync_lte",
    "topic_name": "Sincronizzazione e Canali Fisici LTE (PSS, SSS, PCI, CRS)",
    "cards": [
      {
        "id": "SYNC-01",
        "front": "Quali informazioni ottiene il terminale dalla rilevazione del segnale PSS (Primary Synchronization Signal)?",
        "back": "Sincronizzazione temporale di simbolo e di slot (0.5 ms), correzione dell'offset di frequenza e indice di settore N_ID^(2) ∈ {0, 1, 2} tra i 3 settori possibili.",
        "node": "PSS / Sincronizzazione di slot",
        "note": "Lezione 05 8 marzo - 31 - Sincronizzazione primaria e secondaria"
      },
      {
        "id": "SYNC-02",
        "front": "A cosa serve l'SSS (Secondary Synchronization Signal) e come risolve l'ambiguità?",
        "back": "Risolve l'ambiguità tra subframe 0 e subframe 5 all'interno della trama da 10 ms, fornisce l'indice del gruppo di celle N_ID^(1) ∈ {0, ..., 167} e il tipo di Cyclic Prefix.",
        "node": "SSS / Sincronizzazione di trama",
        "note": "Lezione 05 8 marzo - 31 - Sincronizzazione primaria e secondaria"
      },
      {
        "id": "SYNC-03",
        "front": "Come si calcola la Physical Cell Identity (PCI) e quanti valori può assumere in LTE?",
        "back": "PCI = 3 · N_ID^(1) + N_ID^(2). Può assumere 504 valori distinti (da 0 a 503) e costituisce la 'targa' dello strato fisico della cella.",
        "node": "PCI / Identità fisica di cella",
        "note": "Lezione 05 8 marzo - 32 - Physical Cell Identity"
      },
      {
        "id": "SYNC-04",
        "front": "In che modo il PCI determina la disposizione dei Cell-specific Reference Signals (CRS)?",
        "back": "Lo shift in frequenza delle sottoportanti pilota CRS dipende direttamente dal PCI tramite la formula v_shift = PCI mod 6. Questo evita interferenze costruttive sistematiche tra celle adiacenti.",
        "node": "Mappa dei CRS / Shift frequenziale",
        "note": "Lezione 07 15 marzo - 03 - Dai segnali di sincronizzazione al PBCH - PCI, riferimenti e SFN"
      },
      {
        "id": "SYNC-05",
        "front": "Perché è indispensabile conoscere la mappa dei CRS prima di decodificare il PBCH (MIB)?",
        "back": "Nel secondo slot del subframe 0, il canale di broadcast PBCH è interlacciato con i CRS. Il terminale deve sapere quali elementi sono piloti per escluderli dai dati e per stimare il canale coerente.",
        "node": "De-interlacciamento PBCH dai CRS",
        "note": "Lezione 07 15 marzo - 03 - Dai segnali di sincronizzazione al PBCH - PCI, riferimenti e SFN"
      },
      {
        "id": "SYNC-06",
        "front": "Quale informazione fondamentale apprende il terminale dal MIB letto sul PBCH?",
        "back": "La larghezza di banda complessiva della cella (da 6 a 100 Resource Block), il System Frame Number (SFN) e la configurazione del canale PHICH.",
        "node": "MIB / Banda di sistema",
        "note": "Lezione 07 15 marzo - 02 - PBCH e MIB - informazioni iniziali e banda del sistema"
      }
    ]
  },
  {
    "topic_id": "riuso_cellulare",
    "topic_name": "Riuso Cellulare, Cluster e Coordinate Oblique",
    "cards": [
      {
        "id": "RIUSO-01",
        "front": "Come si calcola la dimensione del cluster N a partire dalle coordinate oblique (u, v)?",
        "back": "N = u² + u·v + v², con u, v interi non negativi. I valori ammissibili sono N ∈ {1, 3, 4, 7, 9, 12, ...}.",
        "node": "Cluster e coordinate oblique",
        "note": "Lezione 02 24 febbraio - 04 - Coordinate oblique u e v e griglia dei centri"
      },
      {
        "id": "RIUSO-02",
        "front": "Qual è la relazione tra la distanza di riuso D, il raggio di cella R e la dimensione del cluster N?",
        "back": "D = R · √(3 · N). Il rapporto di riuso vale Q = D / R = √(3 · N).",
        "node": "Distanza di riuso D",
        "note": "Lezione 02 24 febbraio - 02 - Modello esagonale, cluster, raggio R e distanza D"
      },
      {
        "id": "RIUSO-03",
        "front": "Perché il rapporto segnale-interferenza SIR nel modello esagonale omogeneo è indipendente dal raggio R?",
        "back": "Sia la potenza del segnale utile C che la potenza degli interferenti I scalano proporzionalmente con la stessa potenza R^(-η). Nel rapporto C/I il termine R si elide, dipendendo unicamente dal cluster N ed η.",
        "node": "Indipendenza del SIR dal raggio",
        "note": "Lezione 02 24 febbraio - 12 - Derivazione del SIR e indipendenza dal raggio"
      },
      {
        "id": "RIUSO-04",
        "front": "Qual è il vantaggio e lo svantaggio della settorializzazione a 120° (3 settori)?",
        "back": "Vantaggio: riduce gli interferenti co-canale del primo anello da 6 a 2 (guadagno di circa 4.77 dB nel SIR). Svantaggio: suddivide la banda disponibile riducendo l'efficienza di aggregazione del traffico.",
        "node": "Settorializzazione a 3 settori",
        "note": "Lezione 02 24 febbraio - 14 - Settorializzazione - tre antenne e ripartizione della banda"
      }
    ]
  }
];
