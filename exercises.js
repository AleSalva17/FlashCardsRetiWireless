// Database degli Esercizi d'Esame Svolti e Guidati Passo-Passo
// Tratti dalle lezioni del Prof. Mauro Femminella (UniPG - Reti Wireless)

window.EXAM_EXERCISES = [
  {
    "id": "ex-02-fast-fading",
    "title": "Esercizio 2: Dimensionamento Cella con Solo Fast Fading",
    "lesson": "Lezione 04 (3 marzo)",
    "tags": ["fast_fading", "rayleigh", "margine_potenza", "raggio_cella"],
    "difficulty": 2,
    "problem_statement": "In un sistema cellulare con esponente di attenuazione η = 4, la potenza ricevuta a d0 = 100 m è Pr(100) = -20 dBm. Il ricevitore presenta una sensibilità Pth = -80 dBm. Si richiede un outage massimo al bordo cella Pout ≤ 1%. Si assuma trascurabile lo shadowing log-normale (presenza di solo fast fading di Rayleigh). Calcolare il margine di potenza M e il raggio di cella R.",
    "known_data": {
      "Esponente di attenuazione η": "4",
      "Potenza di riferimento Pr(100m)": "-20 dBm",
      "Sensibilità ricevitore Pth": "-80 dBm",
      "Outage massimo Pout": "1% (0.01)",
      "Shadowing": "Trascurato (solo Fast Fading Rayleigh)"
    },
    "unknowns": ["Margine lineare M", "Margine in decibel M_dB", "Raggio di copertura massimo R"],
    "steps": [
      {
        "step_num": 1,
        "phase": "1. Inquadramento Fisico del Canale",
        "front": "Cosa significa tecnicamente e probabilistico l'ipotesi di 'copertura con solo fast fading'?",
        "back": "Significa trascurare lo shadowing log-normale (assenza di ostacoli lenti variabili, σ = 0 dB). La potenza istantanea ricevuta oscilla rapidamente attorno alla media a causa del multipath ed è modellata da una distribuzione esponenziale decrescente (inviluppo di Rayleigh).",
        "formula": "Pr_ist ~ Esponenziale con media Pr_medio",
        "tip": "Non si usa la funzione erfc (riservata allo shadowing Gaussiano), ma l'integrale esponenziale esatto."
      },
      {
        "step_num": 2,
        "phase": "2. Equazione di Bilancio al Bordo Cella",
        "front": "Quale equazione fondamentale lega la potenza nominale al bordo cella Pr_medio(R) alla sensibilità e al margine M?",
        "back": "Al bordo cella (r = R) devono valere contemporaneamente:\n1) Pr_medio(R) = Pth + M_dB (la potenza media supera la soglia del margine richiesto)\n2) Pr_medio(R) = Pr(100) - 10·η·log10(R / 100) (legge di decadimento logaritmico)\nUguagliando: Pr(100) - 10·η·log10(R / 100) = Pth + M_dB.",
        "formula": "Pr(d0) - 10·η·log10(R/d0) = Pth + M_dB",
        "tip": "Per trovare il raggio R dobbiamo prima ricavare il valore numerico di M_dB dal vincolo di outage."
      },
      {
        "step_num": 3,
        "phase": "3. Impostazione della Probabilità di Outage",
        "front": "Come si esprime analiticamente la probabilità di outage Pout in presenza di fast fading in funzione del margine lineare M?",
        "back": "Per Rayleigh, la probabilità che la potenza istantanea scenda sotto la soglia Pth è: Pout = P(Pr ≤ Pth) = 1 - e^(-Pth / Pr_medio). Poiché il margine lineare è M = Pr_medio / Pth, si impone: Pout = 1 - e^(-1/M) ≤ 0.01 (1%).",
        "formula": "1 - e^(-1/M) ≤ 0.01 ⇒ e^(-1/M) ≥ 0.99",
        "tip": "M è qui un rapporto adimensionale lineare tra potenze (Watt/Watt)."
      },
      {
        "step_num": 4,
        "phase": "4. Calcolo Analitico del Margine Lineare M",
        "front": "Risolvi analiticamente la disequazione e^(-1/M) ≥ 0.99 per determinare il valore numerico del margine lineare M.",
        "back": "Applicando il logaritmo naturale ad ambo i membri: -1/M ≥ ln(0.99). Poiché ln(0.99) < 0, moltiplicando per -1 il verso si inverte: 1/M ≤ -ln(0.99). Quindi M ≥ -1 / ln(0.99) = -1 / (-0.0100503) ≈ 99.5.",
        "formula": "M ≥ -1 / ln(0.99) ≈ 99.5",
        "tip": "Servono quasi 100 volte più potenza media rispetto alla sensibilità per tollerare il fast fading all'1%!"
      },
      {
        "step_num": 5,
        "phase": "5. Conversione Obbligatoria del Margine in dB",
        "front": "Perché non possiamo usare direttamente M = 99.5 nell'equazione di bordo cella e come si converte in decibel?",
        "back": "M = 99.5 è un rapporto lineare (lineare moltiplica, non somma!). Le potenze nell'equazione di bilancio sono invece espresse in dBm. Dobbiamo convertirlo con: M_dB = 10·log10(M) = 10·log10(99.5) ≈ 19.98 dB ≈ 20 dB.",
        "formula": "M_dB = 10·log10(99.5) ≈ 20 dB",
        "tip": "All'esame: arrotondare M_dB a 20 dB è prassi approvata dal docente."
      },
      {
        "step_num": 6,
        "phase": "6. Sostituzione dei Dati nell'Equazione di Bilancio",
        "front": "Sostituisci i dati numerici noti (Pr(100)=-20 dBm, Pth=-80 dBm, η=4, M_dB=20 dB) nell'equazione del raggio.",
        "back": "Sostituendo:\n-20 - 10·(4)·log10(R / 100) = -80 + 20\n-20 - 40·log10(R / 100) = -60 dBm\nSpostando i termini: 40·log10(R / 100) = -20 - (-60) = 40 dB.",
        "formula": "40·log10(R / 100) = 40",
        "tip": "Il termine di attenuazione dal punto di riferimento vale esattamente 40 dB."
      },
      {
        "step_num": 7,
        "phase": "7. Calcolo Finale del Raggio di Cella R",
        "front": "Dall'equazione 40·log10(R / 100) = 40 ricava il raggio di copertura R in metri e in chilometri.",
        "back": "Dividendo per 40: log10(R / 100) = 1.\nPassando all'esponenziale in base 10: R / 100 = 10^1 = 10.\nQuindi: R = 100 · 10 = 1000 metri = 1 km.",
        "formula": "R = 100 · 10 = 1000 m = 1.0 km",
        "tip": "Risultato tondo e verificato esattamente dalle slide della Lezione 04."
      }
    ]
  },
  {
    "id": "ex-01-shadowing-sir",
    "title": "Esercizio 1: Dimensionamento con Shadowing, Tabella erfc e SIR",
    "lesson": "Lezione 04 (3 marzo)",
    "tags": ["shadowing", "erfc", "sir", "settorializzazione"],
    "difficulty": 2,
    "problem_statement": "In un sistema cellulare con celle trisettorializzate (Ni = 2 interferenti nel primo anello), la potenza ricevuta a d0 = 100 m è Pr(100) = -35 dBm, la sensibilità è Pth = -80 dBm, l'esponente di attenuazione vale η = 3.7. Lo shadowing è modellato con deviazione standard σ_dB = 5 dB e si richiede un outage massimo al bordo cella Pout ≤ 1.5%. La distanza di riuso vale D = 3836.9 m. Calcolare il margine M_dB con la tabella erfc, il raggio di cella R e il SIR risultante al bordo cella.",
    "known_data": {
      "Configurazione": "Celle trisettorializzate a 120° (Ni = 2)",
      "Potenza riferimento Pr(100m)": "-35 dBm",
      "Sensibilità Pth": "-80 dBm",
      "Esponente di attenuazione η": "3.7",
      "Deviazione shadowing σ_dB": "5 dB",
      "Outage massimo Pout": "1.5% (0.015)",
      "Distanza di riuso D": "3836.9 m"
    },
    "unknowns": ["Margine M_dB (con tabella erfc)", "Raggio R", "Rapporto SIR in dB"],
    "steps": [
      {
        "step_num": 1,
        "phase": "1. Analisi del SIR e Grandezza Mancante",
        "front": "Scrivi la formula del SIR per celle trisettorializzate in funzione di D ed R e individua cosa manca per calcolarlo.",
        "back": "SIR = (1 / Ni) · (D / R)^η. Abbiamo Ni = 2, D = 3836.9 m ed η = 3.7. Manca il raggio di cella R, che deve essere ricavato dal vincolo di copertura e outage al bordo cella.",
        "formula": "SIR = (1 / 2) · (3836.9 / R)^3.7",
        "tip": "Il vincolo di sensibilità e il vincolo di interferenza sono indipendenti: entrambi devono essere soddisfatti."
      },
      {
        "step_num": 2,
        "phase": "2. Impostazione dell'Outage con Shadowing",
        "front": "Come si formula analiticamente la condizione di outage Pout ≤ 1.5% in presenza di solo shadowing log-normale?",
        "back": "Poiché lo shadowing in decibel segue una Gaussiana N(0, σ^2), l'outage si esprime tramite la funzione complementare erfc: Pout = (1/2) · erfc(M_dB / (√2 · σ_dB)) ≤ 0.015. Moltiplicando per due: erfc(x) ≤ 0.03, con x = M_dB / (√2 · 5).",
        "formula": "erfc(x) ≤ 0.03, con x = M_dB / (5√2)",
        "tip": "La funzione erfc(x) è tabulata; cerchiamo il valore x tale che erfc(x) sia minore o uguale a 0.03."
      },
      {
        "step_num": 3,
        "phase": "3. Lettura Rigorosa della Tabella erfc",
        "front": "Se x = 1.53 dà erfc(1.53) ≈ 0.0305 e x = 1.54 dà erfc(1.54) ≈ 0.0294, quale valore di x va scelto e perché?",
        "back": "Va scelto x = 1.54! La condizione è una disuguaglianza erfc(x) ≤ 0.03: scegliere 1.53 porterebbe l'outage al 3.05%/2 = 1.525% > 1.5% violando il requisito di progetto. Si sceglie il valore cautelativo.",
        "formula": "x = 1.54 ⇒ erfc(1.54) ≈ 0.0294 ≤ 0.03",
        "tip": "All'esame non si prende il valore 'più vicino', ma quello che garantisce il rispetto del vincolo!"
      },
      {
        "step_num": 4,
        "phase": "4. Calcolo del Margine M_dB",
        "front": "Dalla relazione x = M_dB / (√2 · σ_dB) con x = 1.54 e σ_dB = 5 dB, calcola il margine di potenza in decibel.",
        "back": "M_dB = x · √2 · σ_dB = 1.54 · √2 · 5 = 1.54 · 1.4142 · 5 ≈ 10.89 dB. Nel corso e nello svolgimento si approssima a M_dB ≈ 11 dB.",
        "formula": "M_dB = 1.54 · √2 · 5 ≈ 10.89 dB ≈ 11 dB",
        "tip": "A differenza del fast fading, con lo shadowing il margine esce direttamente in dB!"
      },
      {
        "step_num": 5,
        "phase": "5. Equazione di Potenza al Bordo Cella",
        "front": "Uguaglia l'espressione nominale Pr_medio(R) alla potenza richiesta al bordo Pth + M_dB.",
        "back": "-35 - 10·(3.7)·log10(R / 100) = -80 + 11 = -69 dBm.\nQuindi: -35 - 37·log10(R / 100) = -69 dBm.\n37·log10(R / 100) = 69 - 35 = 34 dB.",
        "formula": "37·log10(R / 100) = 34",
        "tip": "Risolviamo per isolare il logaritmo."
      },
      {
        "step_num": 6,
        "phase": "6. Calcolo del Raggio R",
        "front": "Risolvi 37·log10(R / 100) = 34 e calcola il raggio di cella R in metri.",
        "back": "log10(R / 100) = 34 / 37 ≈ 0.9189.\nR / 100 = 10^0.9189 ≈ 8.297.\nR = 100 · 8.297 ≈ 829.7 metri (usando 10.89 dB esce R ≈ 821 m, accettati entrambi).",
        "formula": "R ≈ 821 ÷ 830 metri",
        "tip": "Il raggio è minore di 1 km a causa del decadimento più rapido (η = 3.7) e del margine di 11 dB."
      },
      {
        "step_num": 7,
        "phase": "7. Calcolo Finale del SIR",
        "front": "Con D = 3836.9 m, R ≈ 821 m, Ni = 2 ed η = 3.7, calcola il SIR lineare e in decibel.",
        "back": "D / R = 3836.9 / 821 ≈ 4.673.\nSIR_lineare = (1 / 2) · (4.673)^3.7 ≈ 0.5 · 304.5 ≈ 152.25.\nIn decibel: SIR_dB = 10·log10(152.25) ≈ 21.8 dB.",
        "formula": "SIR_dB = 10·log10(152.25) ≈ 21.8 dB",
        "tip": "Un SIR di quasi 22 dB garantisce ottima qualità di servizio e supera le soglie standard di 17-18 dB."
      }
    ]
  },
  {
    "id": "ex-03-capacita-km2",
    "title": "Esercizio 3: Capacità Teorica per Chilometro Quadrato e Geometria Esagonale",
    "lesson": "Lezione 04 (3 marzo)",
    "tags": ["capacita_area", "shannon", "geometria_esagono", "densita_capacita"],
    "difficulty": 2,
    "problem_statement": "Una stazione base con banda B = 15 MHz serve una cella esagonale omnidirezionale con raggio R = 600 m. Al bordo cella il rapporto SIR medio garantito è pari a 17 dB. Calcolare l'area della cella esagonale, la capacità teorica di Shannon della cella C_cella e la densità di capacità per chilometro quadrato ρ_C [Mbit/s / km²].",
    "known_data": {
      "Banda assegnata B": "15 MHz (15·10^6 Hz)",
      "Raggio della cella esagonale R": "600 m = 0.6 km",
      "Rapporto SIR al bordo": "17 dB",
      "Geometria": "Esagono regolare regolare con raggio R"
    },
    "unknowns": ["Area della cella esagonale Acella in km²", "Capacità di Shannon Ccella in Mbit/s", "Densità di capacità ρC in Mbit/s/km²"],
    "steps": [
      {
        "step_num": 1,
        "phase": "1. Geometria dell'Esagono e Calcolo dell'Area",
        "front": "Qual è la formula dell'area di una cella esagonale regolare di raggio (lato) R e quanto vale per R = 600 m?",
        "back": "L'esagono regolare è composto da 6 triangoli equilateri di lato R e altezza h = (√3/2)R. L'area totale vale: A_cella = 6 · (√3/4)·R^2 = (3√3 / 2)·R^2 ≈ 2.598 · R^2. Con R = 0.6 km: A_cella = 2.598 · (0.6)^2 = 2.598 · 0.36 ≈ 0.935 km².",
        "formula": "A_cella = (3√3 / 2) · R^2 ≈ 0.935 km²",
        "tip": "Esprimere sempre il raggio direttamente in km per ottenere l'area in km² senza errori di conversione!"
      },
      {
        "step_num": 2,
        "phase": "2. Conversione del SIR in Lineare",
        "front": "Come si converte il SIR = 17 dB in forma lineare per applicare il teorema di Shannon?",
        "back": "La formula di Shannon richiede il rapporto segnale/interferenza in potenza lineare (Watt/Watt): SIR_lineare = 10^(SIR_dB / 10) = 10^(17 / 10) = 10^1.7 ≈ 50.12.",
        "formula": "SIR_lineare = 10^1.7 ≈ 50.12",
        "tip": "Errore classico all'esame: inserire 17 direttamente in log2(1 + 17). Mai farlo!"
      },
      {
        "step_num": 3,
        "phase": "3. Calcolo della Capacità di Shannon C_cella",
        "front": "Calcola la capacità teorica C_cella con la formula di Shannon: C = B · log2(1 + SIR_lineare).",
        "back": "C_cella = 15·10^6 · log2(1 + 50.12) = 15·10^6 · log2(51.12).\nPoiché log2(51.12) = ln(51.12) / ln(2) ≈ 3.934 / 0.69315 ≈ 5.676 bit/simbolo.\nC_cella = 15 · 5.676 ≈ 85.14 Mbit/s.",
        "formula": "C_cella = 15 MHz · 5.676 bit/s/Hz ≈ 85.14 Mbit/s",
        "tip": "L'efficienza spettrale teorica al bordo è pari a circa 5.68 bit/s/Hz."
      },
      {
        "step_num": 4,
        "phase": "4. Calcolo della Densità Spaziale di Capacità ρ_C",
        "front": "Calcola la densità di capacità per chilometro quadrato ρ_C dividendo la capacità di cella per l'area.",
        "back": "ρ_C = C_cella / A_cella = 85.14 Mbit/s / 0.935 km² ≈ 91.06 Mbit/s / km².\nQuesto valore quantifica il traffico aggregato per unità di superficie che la tecnologia può smaltire in quell'area geografica.",
        "formula": "ρ_C = 85.14 / 0.935 ≈ 91.1 Mbit/s / km²",
        "tip": "Se si dimezza il raggio R da 600m a 300m, l'area si riduce di 4 volte e la capacità per km² quadruplica!"
      }
    ]
  },
  {
    "id": "ex-04-cluster-erlang",
    "title": "Esercizio 4: Dimensionamento Cluster, Canali e Traffico Erlang-B",
    "lesson": "Lezione 07 (15 marzo) e Lezione 10 (24 marzo)",
    "tags": ["cluster", "erlang_b", "canali_voce", "probabilita_blocco"],
    "difficulty": 2,
    "problem_statement": "Un operatore mobile dispone di una banda bidirezionale totale B = 12.5 MHz. Il sistema adotta canali duplex a 200 kHz (spaziatura GSM). Il vincolo di qualità impone un SIR minimo al bordo di γ = 18 dB con esponente di attenuazione η = 4 in celle omnidirezionali (Ni = 6). Determinare la dimensione teorica minima e la dimensione geometrica ammissibile del cluster N, il numero di canali assegnati a ciascuna cella, e il traffico smaltibile in Erlang con probabilità di blocco Pb = 2% (tramite tabella Erlang-B).",
    "known_data": {
      "Banda totale": "12.5 MHz",
      "Larghezza canale": "200 kHz duplex",
      "Soglia SIR target": "18 dB (63.1 in lineare)",
      "Interferenti primo anello": "Ni = 6 (omnidirezionale)",
      "Esponente η": "4",
      "Blocco Erlang-B Pb": "2% (0.02)"
    },
    "unknowns": ["Numero canali totali Ntot", "Cluster minimo teorico Nmin", "Cluster geometrico N ammissibile", "Canali per cella Ccella", "Traffico Erlang A"],
    "steps": [
      {
        "step_num": 1,
        "phase": "1. Calcolo dei Canali Totali Disponibili",
        "front": "Dati 12.5 MHz di banda complessiva e canali duplex a 200 kHz, quanti canali radio totali N_tot si ottengono?",
        "back": "N_tot = Banda_totale / Banda_canale = 12.5 MHz / 200 kHz = 12500 kHz / 200 kHz = 62.5 canali ⇒ 62 canali duplex totali allocabili nel sistema.",
        "formula": "N_tot = 12500 / 200 = 62 canali duplex",
        "tip": "Ciascun canale supporta contemporaneamente uplink e downlink (coppia di portanti FDD)."
      },
      {
        "step_num": 2,
        "phase": "2. Formula di Progetto del SIR per Celle Omnidirezionali",
        "front": "Qual è la formula del SIR al caso peggiore con Ni = 6 in funzione del cluster N ed η = 4?",
        "back": "SIR = (1 / Ni) · (3N)^(η / 2). Con Ni = 6 ed η = 4: SIR = (1 / 6) · (3N)^(4 / 2) = (1 / 6) · (3N)^2 = (9 · N^2) / 6 = (3/2) · N^2 = 1.5 · N^2.",
        "formula": "SIR = 1.5 · N^2",
        "tip": "Relazione quadratica pulitissima valida per η = 4 e antenne omnidirezionali!"
      },
      {
        "step_num": 3,
        "phase": "3. Calcolo del Cluster Teorico Minimo N_min",
        "front": "Convertendo 18 dB in lineare, imponi SIR ≥ γ e calcola il valore teorico minimo di N.",
        "back": "γ_lineare = 10^(18 / 10) = 10^1.8 ≈ 63.096.\nImponendo: 1.5 · N^2 ≥ 63.096 ⇒ N^2 ≥ 63.096 / 1.5 ≈ 42.064.\nQuindi N_min = √42.064 ≈ 6.48.",
        "formula": "N ≥ √42.064 ≈ 6.48",
        "tip": "N deve essere strettamente maggiore o uguale a 6.48, ma non può essere un numero reale qualsiasi!"
      },
      {
        "step_num": 4,
        "phase": "4. Scelta del Cluster Geometrico Ammissibile",
        "front": "Qual è la formula dei cluster esagonali ammissibili e quale valore di N si sceglie dopo N ≥ 6.48?",
        "back": "I cluster esagonali regolari devono rispettare N = u^2 + u·v + v^2 con u,v interi. I valori ammissibili sono: N ∈ {1, 3, 4, 7, 9, 12, ...}. Il primo valore ammissibile maggiore o uguale a 6.48 è N = 7 (ottenuto con u = 2, v = 1 oppure u = 1, v = 2).",
        "formula": "N = 2^2 + 2·1 + 1^2 = 4 + 2 + 1 = 7",
        "tip": "N=7 è il cluster classico e più famoso della storia della telefonia cellulare!"
      },
      {
        "step_num": 5,
        "phase": "5. Canali Allocati per Cella",
        "front": "Con N_tot = 62 canali totali e cluster N = 7, quanti canali sono assegnati a ciascuna cella?",
        "back": "C_cella = ⌊N_tot / N⌋ = ⌊62 / 7⌋ = 8 canali per cella (con 6 canali di resto non distribuiti uniformemente, o usati per segnalazione comune).",
        "formula": "C_cella = ⌊62 / 7⌋ = 8 canali/cella",
        "tip": "Ogni cella può servire al massimo 8 comunicazioni contemporanee."
      },
      {
        "step_num": 6,
        "phase": "6. Traffico Smaltibile con Formula Erlang-B",
        "front": "Con C = 8 canali e probabilità di blocco Pb = 2%, quanto traffico telefonico in Erlang può smaltire la cella?",
        "back": "Dalla tabella di Erlang-B per C = 8 canali e Pb = 0.02 (2%): il traffico offerto smaltibile è A ≈ 3.43 Erlang. Questo significa che la cella può sostenere in media 3.43 chiamate contemporanee nell'ora di picco garantendo che solo il 2% delle chiamate trovi occupato.",
        "formula": "A(C=8, Pb=2%) ≈ 3.43 Erlang",
        "tip": "Se usassimo celle trisettorializzate con lo stesso cluster, potremmo aumentare i canali per settore o ridurre N a 3 o 4!"
      }
    ]
  },
  {
    "id": "ex-05-lte-resource-blocks",
    "title": "Esercizio 5: Griglia LTE, Resource Block e Bitrate di Picco",
    "lesson": "Lezione 10 (24 marzo)",
    "tags": ["lte", "resource_block", "mimo", "bitrate_picco", "64qam"],
    "difficulty": 3,
    "problem_statement": "Un sistema LTE opera con banda di canale B = 20 MHz (allocazione di 100 Resource Block). Si consideri una trama FDD con durata 10 ms e normale prefisso ciclico (7 simboli OFDM per slot da 0.5 ms). Si assume modulazione 64-QAM (6 bit/simbolo), tasso di codifica di canale r = 3/4, antenna 2x2 MIMO (2 flussi spaziali indipendenti). Trascurando inizialmente l'overhead di segnalazione (CRS, PDCCH), calcolare il numero di Resource Element al secondo e il bitrate di picco dello strato fisico.",
    "known_data": {
      "Banda LTE": "20 MHz (100 Resource Block)",
      "Sottoportanti per RB": "12 (spaziatura Δf = 15 kHz ⇒ 180 kHz/RB)",
      "Simboli OFDM per slot (0.5 ms)": "7 simboli",
      "Modulazione": "64-QAM (qm = 6 bit/simbolo)",
      "Coding rate": "r = 3/4",
      "Configurazione MIMO": "2x2 (2 stream spaziali)"
    },
    "unknowns": ["Resource Elements per RB", "Bitrate teorico per singolo RB", "Bitrate di picco complessivo a 20 MHz"],
    "steps": [
      {
        "step_num": 1,
        "phase": "1. Struttura del Resource Block (RB)",
        "front": "Quanti Resource Elements (RE) compongono un singolo Resource Block in uno slot temporale di 0.5 ms e in un subframe di 1 ms?",
        "back": "In frequenza un RB ha 12 sottoportanti. In tempo, con CP normale, uno slot (0.5 ms) contiene 7 simboli OFDM. RE_slot = 12 · 7 = 84 RE per slot. In un subframe di 1 ms (pari a 2 slot consecutivi): RE_subframe = 12 · 14 = 168 RE.",
        "formula": "1 RB su 1 ms (TTI) = 12 · 14 = 168 Resource Elements",
        "tip": "Il Transmission Time Interval (TTI) base dello scheduler LTE dura esattamente 1 ms."
      },
      {
        "step_num": 2,
        "phase": "2. Bit Informativi per Simbolo (Modulazione e Codice)",
        "front": "Quanti bit utili di informazione trasporta ciascun Resource Element con modulazione 64-QAM e codice r = 3/4?",
        "back": "La modulazione 64-QAM mappa log2(64) = 6 bit per simbolo di canale. Con tasso di codifica r = 3/4 (3 bit utili ogni 4 bit trasmessi), i bit di informazione utile per simbolo sono: bit_utili = 6 · (3/4) = 4.5 bit/RE.",
        "formula": "Bit_utili/RE = 6 · (3/4) = 4.5 bit/simbolo",
        "tip": "In 256-QAM sarebbero 8 · (3/4) = 6 bit/simbolo."
      },
      {
        "step_num": 3,
        "phase": "3. Bitrate di un Singolo Resource Block su 1 ms",
        "front": "Calcola il bitrate grezzo generato da 1 Resource Block singolo su un subframe di 1 ms (flusso singolo SISO).",
        "back": "In 1 ms si trasmettono 168 RE. Bit per subframe = 168 RE · 4.5 bit/RE = 756 bit utili ogni 1 ms. Il bitrate SISO per 1 RB vale quindi: R_RB = 756 bit / 10^-3 s = 756 kbit/s = 0.756 Mbit/s.",
        "formula": "R_RB = 168 · 4.5 / 1 ms = 756 kbit/s per RB",
        "tip": "Se lo scheduler assegna 1 solo RB all'utente, questo ha circa 750 kbps."
      },
      {
        "step_num": 4,
        "phase": "4. Bitrate Aggregato a 20 MHz con 100 RB e 2x2 MIMO",
        "front": "Estendi il calcolo all'intera banda LTE di 20 MHz (100 RB) con antenna MIMO 2x2 (2 layer spaziali indipendenti).",
        "back": "Con 100 RB in parallelo: R_100RB = 100 · 0.756 Mbit/s = 75.6 Mbit/s. Con 2x2 Spatial Multiplexing MIMO (2 stream contemporanei indipendenti): R_picco = 2 · 75.6 Mbit/s = 151.2 Mbit/s ≈ 150 Mbit/s.",
        "formula": "R_picco = 100 RB · 756 kbps · 2 (MIMO) = 151.2 Mbit/s",
        "tip": "Questo è esattamente il famoso valore commerciale di targa di LTE Cat.4 a 150 Mbps!"
      }
    ]
  }
];
