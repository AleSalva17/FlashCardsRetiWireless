// Formulario Completo di Reti Wireless - UniPG (Prof. Mauro Femminella)
// Totale Formule: 31

window.FORMULAS_DATA = [
  {
    "id": "f_1_1",
    "sec": 1,
    "code": "1.1",
    "title": "Relazione Fondamentale Onde Elettromagnetiche",
    "category": "1. Propagazione Radio ed Antenne",
    "math": "c = \\lambda \\cdot f \\implies \\lambda = \\frac{c}{f}",
    "parameters": [
      "$c$: velocita della luce nel vuoto/aria ($c \\approx 3 \\times 10^8\\text{ m/s}$).",
      "$f$: frequenza della portante radio [Hz].",
      "$\\lambda$: lunghezza d'onda [m]."
    ],
    "purpose": "conversione fondamentale tra frequenza di trasmissione e lunghezza d'onda per il calcolo delle antenne e dell'attenuazione di spazio libero.",
    "theory": "Lezione 01 22 febbraio - 15",
    "exercises": "Usata preliminarmente in quasi tutti gli esercizi di radiopropagazione (es. Esercizio 4 marzo e Wi-Fi)."
  },
  {
    "id": "f_1_2",
    "sec": 1,
    "code": "1.2",
    "title": "Densita di Potenza del Radiatore Isotropico",
    "category": "1. Propagazione Radio ed Antenne",
    "math": "S_{\\text{iso}} = \\frac{P_t}{4\\pi d^2}",
    "parameters": [
      "$S_{\\text{iso}}$: densita di potenza superficiale isotropica [$\\text{W/m}^2$].",
      "$P_t$: potenza totale immessa nell'antenna trasmittente [W].",
      "$d$: distanza dal trasmettitore [m]."
    ],
    "purpose": "quantifica la potenza irradiata uniformemente su una superficie sferica di raggio $d$ nell'ipotesi ideale di antenna omnidirezionale puntiforme.",
    "theory": "Lezione 01 22 febbraio - 21",
    "exercises": "Base teorica per la derivazione dell'EIRP e di Friis."
  },
  {
    "id": "f_1_3",
    "sec": 1,
    "code": "1.3",
    "title": "Densita di Potenza Direzionale ed EIRP (Equivalent Isotropically Radiated Power)",
    "category": "1. Propagazione Radio ed Antenne",
    "math": "S = \\frac{P_t G_t}{4\\pi d^2} = \\frac{\\text{EIRP}}{4\\pi d^2}\n\\text{EIRP} = P_t \\cdot G_t \\implies \\text{EIRP}_{\\text{dBm}} = P_{t,\\text{dBm}} + G_{t,\\text{dBi}}",
    "parameters": [
      "$G_t$: guadagno d'antenna in trasmissione (adimensionale lineare).",
      "$G_{t,\\text{dBi}} = 10\\log_{10}(G_t)$: guadagno in decibel rispetto all'isotropico.",
      "$\\text{EIRP}$: potenza isotropica equivalente irradiata [W o dBm]."
    ],
    "purpose": "modella l'effetto di focalizzazione dell'energia nello spazio da parte di un'antenna direttiva.",
    "theory": "Lezione 01 22 febbraio - 22, Lezione 01 22 febbraio - 24",
    "exercises": "Calcolo dei limiti normativi di potenza nelle trasmissioni Wi-Fi ed LTE."
  },
  {
    "id": "f_1_4",
    "sec": 1,
    "code": "1.4",
    "title": "Area Efficace di Ricezione di un'Antenna",
    "category": "1. Propagazione Radio ed Antenne",
    "math": "A_e = \\frac{\\lambda^2}{4\\pi} G_r",
    "parameters": [
      "$A_e$: apertura o area efficace dell'antenna ricevente [$\\text{m}^2$].",
      "$G_r$: guadagno dell'antenna in ricezione."
    ],
    "purpose": "lega la potenza elettrica raccolta ai morsetti dell'antenna ($P_r = S \\cdot A_e$) con la densita di potenza incidente $S$.",
    "theory": "Lezione 01 22 febbraio - 24\n\n---",
    "exercises": ""
  },
  {
    "id": "f_1_5",
    "sec": 1,
    "code": "1.5",
    "title": "Formula di Trasmissione di Friis (Spazio Libero)",
    "category": "1. Propagazione Radio ed Antenne",
    "math": "P_r = P_t G_t G_r \\left( \\frac{\\lambda}{4\\pi d} \\right)^2\nP_{r,\\text{dBm}} = P_{t,\\text{dBm}} + G_{t,\\text{dBi}} + G_{r,\\text{dBi}} - 20\\log_{10}\\left(\\frac{4\\pi d}{\\lambda}\\right)\nFSPL_{\\text{dB}} = 20\\log_{10}(d) + 20\\log_{10}(f) + 20\\log_{10}\\left(\\frac{4\\pi}{c}\\right)\nFSPL_{\\text{dB}} \\approx 32{,}44 + 20\\log_{10}(d_{\\text{km}}) + 20\\log_{10}(f_{\\text{MHz}})",
    "parameters": [
      "$P_r$: potenza ricevuta [W o dBm].",
      "$P_t$: potenza trasmessa [W o dBm].",
      "$d$: distanza tra trasmettitore e ricevitore [m]."
    ],
    "purpose": "calcolo della potenza ricevuta in condizioni ideali di visibilita ottica (LOS, *Line-of-Sight*) senza ostacoli entro l'ellissoide di Fresnel. L'attenuazione cresce quadraticamente con la distanza ($d^2$) e con la frequenza ($f^2$).",
    "theory": "Lezione 01 22 febbraio - 25, Lezione 01 22 febbraio - 26",
    "exercises": "Bilanci di collegamento (Link Budget) e dimensionamento della copertura."
  },
  {
    "id": "f_1_6",
    "sec": 1,
    "code": "1.6",
    "title": "Orizzonte Ottico e Radio",
    "category": "1. Propagazione Radio ed Antenne",
    "math": "d_0 = \\sqrt{2 R h}\nd_{\\text{horiz}} = \\sqrt{2 R' h_t} + \\sqrt{2 R' h_r} \\approx 4{,}12 \\left( \\sqrt{h_t} + \\sqrt{h_r} \\right) \\quad \\text{[km]}",
    "parameters": [
      "$R \\approx 6371\\text{ km}$: raggio reale della Terra.",
      "$R' = \\frac{4}{3} R \\approx 8495\\text{ km}$: raggio terrestre equivalente (tiene conto della rifrazione atmosferica standard).",
      "$h_t, h_r$: altezze delle antenne di trasmissione e ricezione espresse in [m].",
      "$d_{\\text{horiz}}$: distanza massima di visibilita radio espressa in [km]."
    ],
    "purpose": "determina la massima portata geografica teorica di un ponte radio prima che la curvatura terrestre occulti il segnale.",
    "theory": "Lezione 01 22 febbraio - 27, Lezione 01 22 febbraio - 28\n\n---",
    "exercises": ""
  },
  {
    "id": "f_1_7",
    "sec": 1,
    "code": "1.7",
    "title": "Modello di Riflessione al Suolo a Due Raggi (Two-Ray Ground Model)",
    "category": "1. Propagazione Radio ed Antenne",
    "math": "P_r \\approx P_t G_t G_r \\frac{h_t^2 h_r^2}{d^4}",
    "parameters": [
      "$h_t, h_r$: altezza dei piloni/antenne rispetto al suolo riflettente [m].",
      "$d$: distanza di separazione orizzontale [m] ($d \\gg h_t, h_r$)."
    ],
    "purpose": "descrive la propagazione a grande distanza in ambiente aperto, dove l'interferenza distruttiva tra raggio diretto e raggio riflesso dal suolo provoca una perdita di potenza con la **quarta potenza della distanza** ($d^4$), indipendente dalla frequenza della portante.",
    "theory": "Lezione 01 22 febbraio - 29\n\n---",
    "exercises": ""
  },
  {
    "id": "f_1_8",
    "sec": 1,
    "code": "1.8",
    "title": "Modello Semplificato di Attenuazione di Tratta (Log-Distance Path Loss)",
    "category": "1. Propagazione Radio ed Antenne",
    "math": "P_r(d) = P_r(d_0) \\left( \\frac{d_0}{d} \\right)^\\eta\nPL(d)_{\\text{dB}} = PL(d_0)_{\\text{dB}} + 10\\eta \\log_{10}\\left( \\frac{d}{d_0} \\right)",
    "parameters": [
      "$\\eta$: esponente di attenuazione del percorso (*Path Loss Exponent*). Valori tipici:",
      "$\\eta = 2$: spazio libero ideale.",
      "$\\eta = 2{,}7 \\text{ -- } 3{,}5$: ambiente urbano macro-cellulare.",
      "$\\eta = 4 \\text{ -- } 6$: ambiente urbano denso o indoor con ostacoli.",
      "$d_0$: distanza di riferimento vicina (tipicamente $1\\text{ m}$ per indoor, $100\\text{ m}$ o $1\\text{ km}$ per outdoor)."
    ],
    "purpose": "modello empirico standard di progetto per il calcolo della potenza media a distanza $d$.",
    "theory": "Lezione 01 22 febbraio - 30",
    "exercises": "Lezione 04 3 marzo - 17, Lezione 10 24 marzo - 04."
  },
  {
    "id": "f_2_1",
    "sec": 2,
    "code": "2.1",
    "title": "Formula del Cluster Ammissibile (Coordinate Oblique di Riuso)",
    "category": "2. Geometria Cellulare e SIR",
    "math": "N = u^2 + u \\cdot v + v^2 \\quad \\text{con } u, v \\in \\mathbb{N}_0",
    "parameters": [],
    "purpose": "calcolo del numero di celle che compongono il gruppo elementare di frequenze (cluster) ripetibile indefinitamente sul piano esagonale senza adiacenze tra celle co-canale.",
    "theory": "Lezione 02 24 febbraio - 05, Lezione 02 24 febbraio - 06, Lezione 02 24 febbraio - 07",
    "exercises": "Lezione 04 3 marzo - 17."
  },
  {
    "id": "f_2_2",
    "sec": 2,
    "code": "2.2",
    "title": "Distanza di Riuso e Rapporto di Riuso Co-Canale ($q$)",
    "category": "2. Geometria Cellulare e SIR",
    "math": "D = R \\sqrt{3N}\nq = \\frac{D}{R} = \\sqrt{3N}",
    "parameters": [
      "$R$: raggio della cella esagonale (distanza centro-vertice) [m o km].",
      "$D$: distanza tra i centri di due celle che usano le stesse frequenze co-canale [m o km].",
      "$q$: parametro di riduzione dell'interferenza co-canale."
    ],
    "purpose": "stabilisce la separazione geometrica minima necessaria per limitare le interferenze reciproche.",
    "theory": "Lezione 02 24 febbraio - 02, Lezione 02 24 febbraio - 06\n\n---",
    "exercises": ""
  },
  {
    "id": "f_2_3",
    "sec": 2,
    "code": "2.3",
    "title": "Capacita di Canale di Shannon-Hartley",
    "category": "2. Geometria Cellulare e SIR",
    "math": "C = B \\log_2(1 + \\text{SINR}) \\quad \\text{[bit/s]}\n\\text{SINR} = \\frac{S}{I + N_0 B}",
    "parameters": [
      "$C$: velocita massima teorica di trasmissione priva di errori [bit/s].",
      "$B$: larghezza di banda del canale [Hz].",
      "$\\text{SINR}$: rapporto segnale/interferenza-piu-rumore (lineare)."
    ],
    "purpose": "limite termodinamico e teorico di informazione per qualsiasi link wireless.",
    "theory": "Lezione 02 24 febbraio - 08",
    "exercises": "Lezione 04 3 marzo - 19, Lezione 10 24 marzo - 05."
  },
  {
    "id": "f_2_4",
    "sec": 2,
    "code": "2.4",
    "title": "Rapporto Segnale/Interferenza (SIR) — Modello Worst-Case Omnidirezionale",
    "category": "2. Geometria Cellulare e SIR",
    "math": "\\text{SIR} = \\frac{P_r}{\\sum_{i=1}^{6} I_i} \\approx \\frac{R^{-\\eta}}{6 \\cdot D^{-\\eta}} = \\frac{1}{6} \\left( \\frac{D}{R} \\right)^\\eta = \\frac{1}{6} (3N)^{\\eta/2}\n\\text{SIR}_{\\text{dB}} = -10\\log_{10}(6) + \\frac{\\eta}{2} 10\\log_{10}(3N) \\approx -7{,}78 + \\frac{\\eta}{2} 10\\log_{10}(3N)\n(3N)^{\\eta/2} \\ge 6 \\cdot 10^{\\frac{\\text{SIR}_{\\text{target, dB}}}{10}} \\implies N \\ge \\frac{1}{3} \\left( 6 \\cdot 10^{\\frac{\\text{SIR}_{\\text{target, dB}}}{10}} \\right)^{\\frac{2}{\\eta}}",
    "parameters": [],
    "purpose": "",
    "theory": "Lezione 02 24 febbraio - 11, Lezione 02 24 febbraio - 12, Lezione 02 24 febbraio - 17",
    "exercises": "Lezione 04 3 marzo - 17."
  },
  {
    "id": "f_2_5",
    "sec": 2,
    "code": "2.5",
    "title": "Guadagno di Settorializzazione d'Antenna",
    "category": "2. Geometria Cellulare e SIR",
    "math": "\\text{SIR}_{120^\\circ} \\approx \\frac{1}{2} (3N)^{\\eta/2} \\implies \\text{Guadagno} = \\frac{6}{2} = 3 \\approx +4{,}77\\text{ dB}\n\\text{SIR}_{60^\\circ} \\approx 1 \\cdot (3N)^{\\eta/2} \\implies \\text{Guadagno} = \\frac{6}{1} = 6 \\approx +7{,}78\\text{ dB}",
    "parameters": [],
    "purpose": "consente di abbattere le interferenze mantenendo lo stesso cluster $N$, oppure di ridurre $N$ (aumentando la banda allocata a ciascuna cella) garantendo comunque il SIR di soglia richiesto.",
    "theory": "Lezione 02 24 febbraio - 14, Lezione 02 24 febbraio - 16",
    "exercises": "Lezione 10 24 marzo - 02."
  },
  {
    "id": "f_2_6",
    "sec": 2,
    "code": "2.6",
    "title": "Area della Cella Esagonale e Densita di Capacita",
    "category": "2. Geometria Cellulare e SIR",
    "math": "A_{\\text{esagono}} = \\frac{3\\sqrt{3}}{2} R^2 \\approx 2{,}598 \\cdot R^2\nC_{\\text{area}} = \\frac{C_{\\text{cluster}}}{N \\cdot A_{\\text{esagono}}} = \\frac{C_{\\text{tot}}}{N \\cdot 2{,}598 \\cdot R^2} \\quad \\left[\\frac{\\text{bit/s}}{\\text{km}^2}\\right]",
    "parameters": [],
    "purpose": "dimostra che dimezzando il raggio della cella ($R \\to R/2$), l'area della singola cella si riduce di un fattore 4, quadruplicando la capacita complessiva erogabile sul territorio a parita di banda assegnata.",
    "theory": "Lezione 02 24 febbraio - 03, Lezione 02 24 febbraio - 20",
    "exercises": "Lezione 04 3 marzo - 19."
  },
  {
    "id": "f_3_1",
    "sec": 3,
    "code": "3.1",
    "title": "Fading Lento: Shadowing Log-Normale",
    "category": "3. Fading, Outage e Margini",
    "math": "P_{r,\\text{dB}} \\sim \\mathcal{N}(\\overline{P}_{r,\\text{dB}}, \\sigma_{\\text{dB}}^2)\nP_{\\text{out}} = P(P_r < P_{\\text{th}}) = Q\\left( \\frac{\\overline{P}_r - P_{\\text{th}}}{\\sigma} \\right)\nM_s = \\overline{P}_r - P_{\\text{th}} = z_p \\cdot \\sigma \\quad \\text{[dB]}",
    "parameters": [],
    "purpose": "dimensionamento del margine di potenza addizionale da trasmettere affinché la copertura sia garantita con una percentuale prefissata (es. $90\\%$ o $99\\%$ del bordo cella).",
    "theory": "Mappa Outage, margini e dimensionamento, Lezione 01 22 febbraio - 14",
    "exercises": "Lezione 04 3 marzo - 17."
  },
  {
    "id": "f_3_2",
    "sec": 3,
    "code": "3.2",
    "title": "Fading Veloce: Distribuzione di Rayleigh",
    "category": "3. Fading, Outage e Margini",
    "math": "f(p) = \\frac{1}{\\overline{p}} e^{-\\frac{p}{\\overline{p}}} \\quad (p \\ge 0)\nP_{\\text{out}} = P(p \\le p_{\\text{th}}) = \\int_0^{p_{\\text{th}}} f(p)\\,dp = 1 - e^{-\\frac{p_{\\text{th}}}{\\overline{p}}}\nP_{\\text{out}} \\approx \\frac{p_{\\text{th}}}{\\overline{p}} \\implies \\frac{\\overline{p}}{p_{\\text{th}}} \\approx \\frac{1}{P_{\\text{out}}}\nM_{\\text{Rayleigh, dB}} = 10\\log_{10}\\left( \\frac{\\overline{p}}{p_{\\text{th}}} \\right) \\approx -10\\log_{10}(P_{\\text{out}})",
    "parameters": [],
    "purpose": "",
    "theory": "Mappa Multipath, Rayleigh e shadowing",
    "exercises": "Lezione 04 3 marzo - 18."
  },
  {
    "id": "f_4_1",
    "sec": 4,
    "code": "4.1",
    "title": "Modello di Traffico Poissoniano",
    "category": "4. Accesso Casuale ALOHA e PRACH",
    "math": "P(k) = \\frac{(\\lambda T)^k}{k!} e^{-\\lambda T}\nP(0) = e^{-\\lambda T}",
    "parameters": [],
    "purpose": "",
    "theory": "",
    "exercises": ""
  },
  {
    "id": "f_4_2",
    "sec": 4,
    "code": "4.2",
    "title": "Protocollo Pure ALOHA (Non Slottizzato)",
    "category": "4. Accesso Casuale ALOHA e PRACH",
    "math": "S = G \\cdot P(\\text{successo}) = G \\cdot e^{-2G}\n\\frac{dS}{dG} = e^{-2G}(1 - 2G) = 0 \\implies G^* = 0{,}5\nS_{\\max} = 0{,}5 \\cdot e^{-1} = \\frac{1}{2e} \\approx 0{,}184 \\quad (18{,}4\\%)\nE[N] = e^{2G}",
    "parameters": [],
    "purpose": "",
    "theory": "Lezione 03 1 marzo - 08, Lezione 03 1 marzo - 09, Lezione 03 1 marzo - 11, Lezione 03 1 marzo - 12\n\n---",
    "exercises": ""
  },
  {
    "id": "f_4_3",
    "sec": 4,
    "code": "4.3",
    "title": "Protocollo Slotted ALOHA (Slottizzato)",
    "category": "4. Accesso Casuale ALOHA e PRACH",
    "math": "S = G \\cdot e^{-G}\n\\frac{dS}{dG} = e^{-G}(1 - G) = 0 \\implies G^* = 1{,}0\nS_{\\max} = 1{,}0 \\cdot e^{-1} = \\frac{1}{e} \\approx 0{,}368 \\quad (36{,}8\\%)\nE[N] = e^G",
    "parameters": [],
    "purpose": "",
    "theory": "Lezione 03 1 marzo - 15, Mappa ALOHA e Slotted ALOHA\n\n---",
    "exercises": ""
  },
  {
    "id": "f_4_4",
    "sec": 4,
    "code": "4.4",
    "title": "Modello di Canale PRACH in LTE (Canali Multipli Equivalent Slotted ALOHA)",
    "category": "4. Accesso Casuale ALOHA e PRACH",
    "math": "G_p = \\frac{G}{N_p}\nP_{\\text{succ}} = e^{-G_p} = e^{-\\frac{G}{N_p}}\nS = G \\cdot e^{-\\frac{G}{N_p}}\nG^* = N_p \\implies S_{\\max} = \\frac{N_p}{e} \\approx 0{,}368 \\cdot N_p \\quad \\text{[accessi con successo/slot]}\n\\lambda_{\\text{richieste}} < S_{\\max} = \\frac{N_p}{e \\cdot T_{\\text{PRACH}}}",
    "parameters": [],
    "purpose": "",
    "theory": "Lezione 07 15 marzo - 29, Lezione 07 15 marzo - 31",
    "exercises": "Lezione 07 15 marzo - 32, Lezione 07 15 marzo - 33, Lezione 07 15 marzo - 34."
  },
  {
    "id": "f_5_1",
    "sec": 5,
    "code": "5.1",
    "title": "Griglia Tempo-Frequenza e Resource Block (RB) LTE",
    "category": "5. Sistemi 4G LTE e Risorse",
    "math": "",
    "parameters": [],
    "purpose": "",
    "theory": "Lezione 05 8 marzo - 23, Mappa OFDM, SC-FDMA e risorse radio\n\n---",
    "exercises": ""
  },
  {
    "id": "f_5_2",
    "sec": 5,
    "code": "5.2",
    "title": "Bitrate Medio e Spettrale per Cella LTE (Esercizio 10)",
    "category": "5. Sistemi 4G LTE e Risorse",
    "math": "R_{\\text{medio}} = \\sum_{k=1}^K p_k \\cdot R_k\nR_{\\text{RB}} = \\frac{N_{\\text{data}} \\cdot m \\cdot r_{\\text{code}}}{1\\text{ ms}} \\quad \\text{[bit/s]}",
    "parameters": [],
    "purpose": "",
    "theory": "",
    "exercises": "Lezione 10 24 marzo - 05."
  },
  {
    "id": "f_5_3",
    "sec": 5,
    "code": "5.3",
    "title": "Dimensionamento Interfaccia S5/S8 e Protocollo GTP-U (Esercizio 4)",
    "category": "5. Sistemi 4G LTE e Risorse",
    "math": "C_{S5} = N_{\\text{utenti}} \\cdot \\alpha \\cdot R_{\\text{utente}} \\cdot \\left( 1 + \\frac{\\text{Overhead}_{\\text{GTP-U}}}{L_{\\text{payload}}} \\right)",
    "parameters": [
      "$\\alpha$: fattore di attivita concorrente degli utenti (es. $0{,}1$ o $0{,}05$).",
      "$R_{\\text{utente}}$: bitrate medio concordato per utente attivo.",
      "$\\text{Overhead}_{\\text{GTP-U}}$: incapsulamento IP esterno ($20\\text{ B}$) + UDP ($8\\text{ B}$) + GTP-U ($8\\text{ B}$) = $36\\text{ byte}$."
    ],
    "purpose": "",
    "theory": "",
    "exercises": "Lezione 10 24 marzo - 01."
  },
  {
    "id": "f_5_4",
    "sec": 5,
    "code": "5.4",
    "title": "Dimensionamento Cella: Copertura vs Capacita (Esercizio 9)",
    "category": "5. Sistemi 4G LTE e Risorse",
    "math": "N_{\\text{copertura}} = \\left\\lceil \\frac{A_{\\text{tot}}}{A_{\\text{cella}}(R_{\\max})} \\right\\rceil\nN_{\\text{capacita}} = \\left\\lceil \\frac{A_{\\text{tot}} \\cdot \\rho \\cdot R_{\\text{medio}}}{C_{\\text{sito}}} \\right\\rceil\nN_{\\text{stazioni}} = \\max(N_{\\text{copertura}}, N_{\\text{capacita}})",
    "parameters": [],
    "purpose": "",
    "theory": "",
    "exercises": "Lezione 10 24 marzo - 04."
  },
  {
    "id": "f_6_1",
    "sec": 6,
    "code": "6.1",
    "title": "Meccanismo di Accesso Base CSMA/CA (DCF)",
    "category": "6. Wireless LAN Wi-Fi (802.11)",
    "math": "T_{\\text{ciclo, base}} = \\text{DIFS} + \\overline{\\text{BO}} + T_{\\text{data}} + \\text{SIFS} + T_{\\text{ACK}}",
    "parameters": [],
    "purpose": "",
    "theory": "Lezione 15 12 aprile - 01, Mappa WiFi 802.11 - standard topologie e accesso\n\n---",
    "exercises": ""
  },
  {
    "id": "f_6_2",
    "sec": 6,
    "code": "6.2",
    "title": "Vincoli Strutturali di Aggregazione 802.11n (Esercizio 19 e 20)",
    "category": "6. Wireless LAN Wi-Fi (802.11)",
    "math": "N_{\\text{MPDU}} \\le 64\nL_{\\text{A-MPDU}} = \\sum_{i=1}^{N_{\\text{MPDU}}} (L_{\\text{delimiter}} + L_{\\text{MPDU}, i}) \\le 65\\,535\\text{ byte}\nN_{\\text{MPDU}} \\le \\left\\lfloor \\frac{65\\,535}{L_{\\text{sub}} + 4} \\right\\rfloor\nN_{\\text{MPDU}} = \\min\\left( 64, \\left\\lfloor \\frac{65\\,535}{L_{\\text{sub}} + 4} \\right\\rfloor \\right)",
    "parameters": [],
    "purpose": "",
    "theory": "Lezione 18 26 aprile - 01",
    "exercises": "Lezione 19 28 aprile - 10."
  },
  {
    "id": "f_6_3",
    "sec": 6,
    "code": "6.3",
    "title": "Vincolo del TXOP (Transmit Opportunity) e Calcolo delle Sottotrame (Esercizio 7)",
    "category": "6. Wireless LAN Wi-Fi (802.11)",
    "math": "T_{\\text{aggregato}} + \\text{SIFS} + T_{\\text{BlockAck}} \\le \\text{TXOP}\nT_{\\text{aggregato}} = T_{\\text{preamble}} + \\left\\lceil \\frac{N_{\\text{MPDU}} \\cdot (L_{\\text{sub}} + 4) \\cdot 8 + N_{\\text{service}} + N_{\\text{tail}}}{N_{\\text{DBPS}}} \\right\\rceil \\cdot T_{\\text{sym}}\nN_{\\text{MPDU}} = \\min\\left( 64, \\; \\left\\lfloor \\frac{65535}{L_{\\text{sub}} + 4} \\right\\rfloor, \\; \\left\\lfloor \\frac{T_{\\text{disponibile}}}{T_{\\text{subtrama}}} \\right\\rfloor \\right)",
    "parameters": [],
    "purpose": "",
    "theory": "Lezione 18 26 aprile - 03",
    "exercises": "Lezione 20 3 maggio - 01, Lezione 20 3 maggio - 02."
  },
  {
    "id": "f_6_4",
    "sec": 6,
    "code": "6.4",
    "title": "Throughput Netto del Livello MAC con Aggregazione",
    "category": "6. Wireless LAN Wi-Fi (802.11)",
    "math": "\\text{Throughput} = \\frac{N_{\\text{MPDU}} \\cdot L_{\\text{payload}} \\cdot 8}{T_{\\text{ciclo}}} \\quad \\text{[bit/s]}\nT_{\\text{ciclo}} = \\text{AIFS} + \\overline{\\text{BO}} + T_{\\text{A-MPDU}} + \\text{SIFS} + T_{\\text{BlockAck}}",
    "parameters": [],
    "purpose": "",
    "theory": "",
    "exercises": "Lezione 20 3 maggio - 01."
  },
  {
    "id": "f_7_1",
    "sec": 7,
    "code": "7.1",
    "title": "Algoritmo Token Bucket Filter (TBF)",
    "category": "7. Qualità di Servizio (QoS)",
    "math": "D_{\\max}(\\Delta t) = B + r_s \\cdot \\Delta t\nR \\cdot T_{\\text{burst}} = B + r_s \\cdot T_{\\text{burst}} \\implies T_{\\text{burst}} = \\frac{B}{R - r_s}\nQ_{\\max} = r_s \\cdot \\tau_{\\text{lat}} \\quad \\text{[byte]}",
    "parameters": [
      "$B$: capacita massima del secchio (massima raffica o *burst size* ammissibile) [byte o bit].",
      "$r_s$: velocita media di generazione dei gettoni / tasso di servizio sostenibile [byte/s o bit/s].",
      "$\\Delta t$: intervallo temporale di osservazione [s]."
    ],
    "purpose": "regolazione del traffico nei router Linux (`tc qdisc add ... tbf`) per limitare la banda garantendo la tolleranza controllata alle trasmissioni a raffica.",
    "theory": "Lezione 24 19 maggio - 04",
    "exercises": ""
  },
  {
    "id": "f_8_1",
    "sec": 8,
    "code": "8.1",
    "title": "Efficienza Applicativa di Trasmissione (Esercizio d'Esame 21)",
    "category": "8. IoT e Protocolli Web",
    "math": "\\eta = \\frac{\\text{Volume Payload Utile}}{\\text{Traffico Totale Scambiato}} = \\frac{L_{\\text{payload}}}{L_{\\text{payload}} + L_{\\text{overhead}}}\nL_{\\text{totale, HTTP}} = (L_{\\text{req, header}} + L_{\\text{req, body}}) + (L_{\\text{resp, header}} + L_{\\text{resp, body}})\n\\eta_{\\text{HTTP}} = \\frac{L_{\\text{payload}}}{L_{\\text{totale, HTTP}}}",
    "parameters": [],
    "purpose": "",
    "theory": "Lezione 24 19 maggio - 08",
    "exercises": "Lezione 21 5 maggio - 07."
  },
  {
    "id": "f_8_2",
    "sec": 8,
    "code": "8.2",
    "title": "Confronto di Efficienza: Polling Periodico vs Notifica Asincrona (Esercizio d'Esame 22)",
    "category": "8. IoT e Protocolli Web",
    "math": "\\text{Traffico}_{\\text{notifica}} = N_{\\text{eventi}} \\cdot (L_{\\text{req}} + L_{\\text{resp}})\n\\eta_{\\text{notifica}} = \\frac{N_{\\text{eventi}} \\cdot L_{\\text{payload}}}{N_{\\text{eventi}} \\cdot (L_{\\text{req}} + L_{\\text{resp}})} = \\frac{L_{\\text{payload}}}{L_{\\text{req}} + L_{\\text{resp}}} \\quad (\\text{costante } \\approx 11\\%)\nN_{\\text{poll}} = \\left\\lfloor \\frac{T}{T_{\\text{poll}}} \\right\\rfloor\n\\text{Traffico}_{\\text{polling}} = N_{\\text{eventi}} \\cdot (L_{\\text{req}} + L_{\\text{resp}}) + (N_{\\text{poll}} - N_{\\text{eventi}}) \\cdot (L_{\\text{req}} + L_{\\text{resp, empty}})\n\\eta_{\\text{polling}} = \\frac{N_{\\text{eventi}} \\cdot L_{\\text{payload}}}{\\text{Traffico}_{\\text{polling}}} \\ll \\eta_{\\text{notifica}}",
    "parameters": [],
    "purpose": "",
    "theory": "Lezione 21 5 maggio - 04",
    "exercises": "Lezione 21 5 maggio - 08."
  }
];
