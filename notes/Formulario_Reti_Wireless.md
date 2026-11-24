---
tipo: formulario
tags:
  - reti-wireless
  - formulario
  - esame
  - formule
  - esercizi
---

# Formulario Completo di Reti Wireless

> **Guida alla Consultazione Rapida**: Questo formulario raccoglie in modo organico e sistematico tutte le relazioni analitiche, formule matematiche, modelli di propagazione, parametri di standard e regole di dimensionamento del corso di **Reti Wireless** (UniPG, Prof. Mauro Femminella).
> 
> Per ciascuna formula sono indicati:
> 1. **Espressione matematica KaTeX** (e formule inverse per lo scritto).
> 2. **Definizione e unita di misura** dei parametri.
> 3. **Descrizione sintetica**: obiettivo, ipotesi di validita e condizioni di applicazione.
> 4. **Collegamento alla nota di spiegazione teorica**.
> 5. **Esercizi d'esame in cui viene utilizzata**.

---

## Indice delle Sezioni

1. [[#1. Propagazione Radio, Antenne e Modelli di Canale]]
2. [[#2. Geometria Cellulare, Riuso di Frequenza e SIR]]
3. [[#3. Fading, Variabilita del Canale, Outage e Margini di Dissolvenza]]
4. [[#4. Accesso Casuale: Protocolli ALOHA, Slotted ALOHA e PRACH LTE]]
5. [[#5. Sistemi Cellulari 4G LTE: Risorse Radio, Bitrate e Dimensionamento]]
6. [[#6. Reti Wireless LAN IEEE 802.11 e 802.11n: DCF, A-MPDU, Block Ack e TXOP]]
7. [[#7. Qualita di Servizio e Regolazione del Traffico (QoS e Traffic Shaping)]]
8. [[#8. Internet of Things e Web of Things: Efficienza Applicativa e Protocolli]]

---

## 1. Propagazione Radio, Antenne e Modelli di Canale

### 1.1 Relazione Fondamentale Onde Elettromagnetiche
$$c = \lambda \cdot f \implies \lambda = \frac{c}{f}$$

- **Parametri**:
  - $c$: velocita della luce nel vuoto/aria ($c \approx 3 \times 10^8\text{ m/s}$).
  - $f$: frequenza della portante radio [Hz].
  - $\lambda$: lunghezza d'onda [m].
- **A cosa serve**: conversione fondamentale tra frequenza di trasmissione e lunghezza d'onda per il calcolo delle antenne e dell'attenuazione di spazio libero.
- **Spiegazione Teorica**: [[Lezione 01 22 febbraio - 15 - Frequenza, lunghezza d’onda e banda passante|Lezione 01 22 febbraio - 15]]
- **Esercizi**: Usata preliminarmente in quasi tutti gli esercizi di radiopropagazione (es. Esercizio 4 marzo e Wi-Fi).

---

### 1.2 Densita di Potenza del Radiatore Isotropico
$$S_{\text{iso}} = \frac{P_t}{4\pi d^2}$$

- **Parametri**:
  - $S_{\text{iso}}$: densita di potenza superficiale isotropica [$\text{W/m}^2$].
  - $P_t$: potenza totale immessa nell'antenna trasmittente [W].
  - $d$: distanza dal trasmettitore [m].
- **A cosa serve**: quantifica la potenza irradiata uniformemente su una superficie sferica di raggio $d$ nell'ipotesi ideale di antenna omnidirezionale puntiforme.
- **Spiegazione Teorica**: [[Lezione 01 22 febbraio - 21 - Radiatore isotropico e densita di potenza|Lezione 01 22 febbraio - 21]]
- **Esercizi**: Base teorica per la derivazione dell'EIRP e di Friis.

---

### 1.3 Densita di Potenza Direzionale ed EIRP (Equivalent Isotropically Radiated Power)
$$S = \frac{P_t G_t}{4\pi d^2} = \frac{\text{EIRP}}{4\pi d^2}$$
$$\text{EIRP} = P_t \cdot G_t \implies \text{EIRP}_{\text{dBm}} = P_{t,\text{dBm}} + G_{t,\text{dBi}}$$

- **Parametri**:
  - $G_t$: guadagno d'antenna in trasmissione (adimensionale lineare).
  - $G_{t,\text{dBi}} = 10\log_{10}(G_t)$: guadagno in decibel rispetto all'isotropico.
  - $\text{EIRP}$: potenza isotropica equivalente irradiata [W o dBm].
- **A cosa serve**: modella l'effetto di focalizzazione dell'energia nello spazio da parte di un'antenna direttiva.
- **Spiegazione Teorica**: [[Lezione 01 22 febbraio - 22 - Guadagno, direttivita e orientamento dell’antenna|Lezione 01 22 febbraio - 22]], [[Lezione 01 22 febbraio - 24 - Densita direzionale, EIRP e area efficace di ricezione|Lezione 01 22 febbraio - 24]]
- **Esercizi**: Calcolo dei limiti normativi di potenza nelle trasmissioni Wi-Fi ed LTE.

---

### 1.4 Area Efficace di Ricezione di un'Antenna
$$A_e = \frac{\lambda^2}{4\pi} G_r$$

- **Parametri**:
  - $A_e$: apertura o area efficace dell'antenna ricevente [$\text{m}^2$].
  - $G_r$: guadagno dell'antenna in ricezione.
- **A cosa serve**: lega la potenza elettrica raccolta ai morsetti dell'antenna ($P_r = S \cdot A_e$) con la densita di potenza incidente $S$.
- **Spiegazione Teorica**: [[Lezione 01 22 febbraio - 24 - Densita direzionale, EIRP e area efficace di ricezione|Lezione 01 22 febbraio - 24]]

---

### 1.5 Formula di Trasmissione di Friis (Spazio Libero)
Forma lineare:
$$P_r = P_t G_t G_r \left( \frac{\lambda}{4\pi d} \right)^2$$

Forma logaritmica in dB:
$$P_{r,\text{dBm}} = P_{t,\text{dBm}} + G_{t,\text{dBi}} + G_{r,\text{dBi}} - 20\log_{10}\left(\frac{4\pi d}{\lambda}\right)$$

Attenuazione di spazio libero (Free Space Path Loss):
$$FSPL_{\text{dB}} = 20\log_{10}(d) + 20\log_{10}(f) + 20\log_{10}\left(\frac{4\pi}{c}\right)$$
Con $d$ in [km] e $f$ in [MHz]:
$$FSPL_{\text{dB}} \approx 32{,}44 + 20\log_{10}(d_{\text{km}}) + 20\log_{10}(f_{\text{MHz}})$$

- **Parametri**:
  - $P_r$: potenza ricevuta [W o dBm].
  - $P_t$: potenza trasmessa [W o dBm].
  - $d$: distanza tra trasmettitore e ricevitore [m].
- **A cosa serve**: calcolo della potenza ricevuta in condizioni ideali di visibilita ottica (LOS, *Line-of-Sight*) senza ostacoli entro l'ellissoide di Fresnel. L'attenuazione cresce quadraticamente con la distanza ($d^2$) e con la frequenza ($f^2$).
- **Spiegazione Teorica**: [[Lezione 01 22 febbraio - 25 - Formula di Friis - potenza ricevuta e significato dei fattori|Lezione 01 22 febbraio - 25]], [[Lezione 01 22 febbraio - 26 - Friis in funzione della frequenza e condizioni di spazio libero|Lezione 01 22 febbraio - 26]]
- **Esercizi**: Bilanci di collegamento (Link Budget) e dimensionamento della copertura.

---

### 1.6 Orizzonte Ottico e Radio
Orizzonte ottico singolo:
$$d_0 = \sqrt{2 R h}$$

Orizzonte radio complessivo tra due antenne su terra sferica:
$$d_{\text{horiz}} = \sqrt{2 R' h_t} + \sqrt{2 R' h_r} \approx 4{,}12 \left( \sqrt{h_t} + \sqrt{h_r} \right) \quad \text{[km]}$$

- **Parametri**:
  - $R \approx 6371\text{ km}$: raggio reale della Terra.
  - $R' = \frac{4}{3} R \approx 8495\text{ km}$: raggio terrestre equivalente (tiene conto della rifrazione atmosferica standard).
  - $h_t, h_r$: altezze delle antenne di trasmissione e ricezione espresse in [m].
  - $d_{\text{horiz}}$: distanza massima di visibilita radio espressa in [km].
- **A cosa serve**: determina la massima portata geografica teorica di un ponte radio prima che la curvatura terrestre occulti il segnale.
- **Spiegazione Teorica**: [[Lezione 01 22 febbraio - 27 - Orizzonte ottico - derivazione geometrica con Pitagora|Lezione 01 22 febbraio - 27]], [[Lezione 01 22 febbraio - 28 - Orizzonte radio e visibilita tra due antenne elevate|Lezione 01 22 febbraio - 28]]

---

### 1.7 Modello di Riflessione al Suolo a Due Raggi (Two-Ray Ground Model)
$$P_r \approx P_t G_t G_r \frac{h_t^2 h_r^2}{d^4}$$

- **Parametri**:
  - $h_t, h_r$: altezza dei piloni/antenne rispetto al suolo riflettente [m].
  - $d$: distanza di separazione orizzontale [m] ($d \gg h_t, h_r$).
- **A cosa serve**: descrive la propagazione a grande distanza in ambiente aperto, dove l'interferenza distruttiva tra raggio diretto e raggio riflesso dal suolo provoca una perdita di potenza con la **quarta potenza della distanza** ($d^4$), indipendente dalla frequenza della portante.
- **Spiegazione Teorica**: [[Lezione 01 22 febbraio - 29 - Modello a due raggi e decadimento con la quarta potenza|Lezione 01 22 febbraio - 29]]

---

### 1.8 Modello Semplificato di Attenuazione di Tratta (Log-Distance Path Loss)
$$P_r(d) = P_r(d_0) \left( \frac{d_0}{d} \right)^\eta$$
$$PL(d)_{\text{dB}} = PL(d_0)_{\text{dB}} + 10\eta \log_{10}\left( \frac{d}{d_0} \right)$$

- **Parametri**:
  - $\eta$: esponente di attenuazione del percorso (*Path Loss Exponent*). Valori tipici:
    - $\eta = 2$: spazio libero ideale.
    - $\eta = 2{,}7 \text{ -- } 3{,}5$: ambiente urbano macro-cellulare.
    - $\eta = 4 \text{ -- } 6$: ambiente urbano denso o indoor con ostacoli.
  - $d_0$: distanza di riferimento vicina (tipicamente $1\text{ m}$ per indoor, $100\text{ m}$ o $1\text{ km}$ per outdoor).
- **A cosa serve**: modello empirico standard di progetto per il calcolo della potenza media a distanza $d$.
- **Spiegazione Teorica**: [[Lezione 01 22 febbraio - 30 - Esponente di attenuazione eta e modello semplificato di progetto|Lezione 01 22 febbraio - 30]]
- **Esercizi**: [[Lezione 04 3 marzo - 17 - Esercizio - shadowing, raggio della cella e SIR|Lezione 04 3 marzo - 17]], [[Lezione 10 24 marzo - 04 - Esercizio 9 - Dimensionamento per traffico e copertura|Lezione 10 24 marzo - 04]].

---

## 2. Geometria Cellulare, Riuso di Frequenza e SIR

### 2.1 Formula del Cluster Ammissibile (Coordinate Oblique di Riuso)
$$N = u^2 + u \cdot v + v^2 \quad \text{con } u, v \in \mathbb{N}_0$$

- **Sequenza dei Cluster Ammissibili**:
  - Per $u=1, v=0 \implies N = 1$
  - Per $u=1, v=1 \implies N = 3$
  - Per $u=2, v=0 \implies N = 4$
  - Per $u=2, v=1 \implies N = 7$
  - Per $u=3, v=0 \implies N = 9$
  - Per $u=3, v=1 \implies N = 12$
  - Valori validi: $N \in \{1, 3, 4, 7, 9, 12, 13, 19, 21, \dots\}$
- **A cosa serve**: calcolo del numero di celle che compongono il gruppo elementare di frequenze (cluster) ripetibile indefinitamente sul piano esagonale senza adiacenze tra celle co-canale.
- **Spiegazione Teorica**: [[Lezione 02 24 febbraio - 05 - Proiezioni cartesiane e formula della distanza tra due celle|Lezione 02 24 febbraio - 05]], [[Lezione 02 24 febbraio - 06 - Dall’origine alla distanza di riuso e alla dimensione del cluster|Lezione 02 24 febbraio - 06]], [[Lezione 02 24 febbraio - 07 - Cluster ammissibili e scelta del primo valore utile|Lezione 02 24 febbraio - 07]]
- **Esercizi**: [[Lezione 04 3 marzo - 17 - Esercizio - shadowing, raggio della cella e SIR|Lezione 04 3 marzo - 17]].

---

### 2.2 Distanza di Riuso e Rapporto di Riuso Co-Canale ($q$)
$$D = R \sqrt{3N}$$
$$q = \frac{D}{R} = \sqrt{3N}$$

- **Parametri**:
  - $R$: raggio della cella esagonale (distanza centro-vertice) [m o km].
  - $D$: distanza tra i centri di due celle che usano le stesse frequenze co-canale [m o km].
  - $q$: parametro di riduzione dell'interferenza co-canale.
- **A cosa serve**: stabilisce la separazione geometrica minima necessaria per limitare le interferenze reciproche.
- **Spiegazione Teorica**: [[Lezione 02 24 febbraio - 02 - Modello esagonale, cluster, raggio R e distanza D|Lezione 02 24 febbraio - 02]], [[Lezione 02 24 febbraio - 06 - Dall’origine alla distanza di riuso e alla dimensione del cluster|Lezione 02 24 febbraio - 06]]

---

### 2.3 Capacita di Canale di Shannon-Hartley
$$C = B \log_2(1 + \text{SINR}) \quad \text{[bit/s]}$$
$$\text{SINR} = \frac{S}{I + N_0 B}$$

- **Parametri**:
  - $C$: velocita massima teorica di trasmissione priva di errori [bit/s].
  - $B$: larghezza di banda del canale [Hz].
  - $\text{SINR}$: rapporto segnale/interferenza-piu-rumore (lineare).
- **A cosa serve**: limite termodinamico e teorico di informazione per qualsiasi link wireless.
- **Spiegazione Teorica**: [[Lezione 02 24 febbraio - 08 - Rapporto segnale disturbo e limite di Shannon|Lezione 02 24 febbraio - 08]]
- **Esercizi**: [[Lezione 04 3 marzo - 19 - Esercizio - capacità teorica per chilometro quadrato|Lezione 04 3 marzo - 19]], [[Lezione 10 24 marzo - 05 - Esercizio 10 - MCS e bitrate media nella cella|Lezione 10 24 marzo - 05]].

---

### 2.4 Rapporto Segnale/Interferenza (SIR) — Modello Worst-Case Omnidirezionale
In regime limitato dall'interferenza (*Interference-Limited*, rumore termico trascurabile), considerando i 6 interferenti co-canale di primo livello al bordo cella:

$$\text{SIR} = \frac{P_r}{\sum_{i=1}^{6} I_i} \approx \frac{R^{-\eta}}{6 \cdot D^{-\eta}} = \frac{1}{6} \left( \frac{D}{R} \right)^\eta = \frac{1}{6} (3N)^{\eta/2}$$

Espressione in decibel:
$$\text{SIR}_{\text{dB}} = -10\log_{10}(6) + \frac{\eta}{2} 10\log_{10}(3N) \approx -7{,}78 + \frac{\eta}{2} 10\log_{10}(3N)$$

Formula inversa per dimensionare il cluster $N$:
$$(3N)^{\eta/2} \ge 6 \cdot 10^{\frac{\text{SIR}_{\text{target, dB}}}{10}} \implies N \ge \frac{1}{3} \left( 6 \cdot 10^{\frac{\text{SIR}_{\text{target, dB}}}{10}} \right)^{\frac{2}{\eta}}$$

- **Proprieta Fondamentale**: il SIR dipende unicamente dalla dimensione del cluster $N$ e dall'esponente di attenuazione $\eta$, ed e **totalmente indipendente dal raggio della cella $R$** (e dalla potenza di trasmissione $P_t$, purché omogenea).
- **Spiegazione Teorica**: [[Lezione 02 24 febbraio - 11 - Bordo cella e interferenti co-canale del primo livello|Lezione 02 24 febbraio - 11]], [[Lezione 02 24 febbraio - 12 - Derivazione del SIR e indipendenza dal raggio|Lezione 02 24 febbraio - 12]], [[Lezione 02 24 febbraio - 17 - Esempio numerico - SIR di 9 dB ed eta uguale a 4|Lezione 02 24 febbraio - 17]]
- **Esercizi**: [[Lezione 04 3 marzo - 17 - Esercizio - shadowing, raggio della cella e SIR|Lezione 04 3 marzo - 17]].

---

### 2.5 Guadagno di Settorializzazione d'Antenna
Ripartendo la stazione radiobase in settori tramite antenne direttive:

1. **Settorializzazione a $120^\circ$ (3 settori per sito)**:
   Gli interferenti che irradiano verso il ricevitore passano da 6 a soli 2:
   $$\text{SIR}_{120^\circ} \approx \frac{1}{2} (3N)^{\eta/2} \implies \text{Guadagno} = \frac{6}{2} = 3 \approx +4{,}77\text{ dB}$$

2. **Settorializzazione a $60^\circ$ (6 settori per sito)**:
   Gli interferenti di primo livello si riducono a 1 solo:
   $$\text{SIR}_{60^\circ} \approx 1 \cdot (3N)^{\eta/2} \implies \text{Guadagno} = \frac{6}{1} = 6 \approx +7{,}78\text{ dB}$$

- **A cosa serve**: consente di abbattere le interferenze mantenendo lo stesso cluster $N$, oppure di ridurre $N$ (aumentando la banda allocata a ciascuna cella) garantendo comunque il SIR di soglia richiesto.
- **Spiegazione Teorica**: [[Lezione 02 24 febbraio - 14 - Settorializzazione - tre antenne e ripartizione della banda|Lezione 02 24 febbraio - 14]], [[Lezione 02 24 febbraio - 16 - Interferenti di settore e miglioramento di 4,77 dB|Lezione 02 24 febbraio - 16]]
- **Esercizi**: [[Lezione 10 24 marzo - 02 - Esercizio 7 - Capacita LTE e settorializzazione|Lezione 10 24 marzo - 02]].

---

### 2.6 Area della Cella Esagonale e Densita di Capacita
$$A_{\text{esagono}} = \frac{3\sqrt{3}}{2} R^2 \approx 2{,}598 \cdot R^2$$

Densita di capacita teorica per unita di superficie:
$$C_{\text{area}} = \frac{C_{\text{cluster}}}{N \cdot A_{\text{esagono}}} = \frac{C_{\text{tot}}}{N \cdot 2{,}598 \cdot R^2} \quad \left[\frac{\text{bit/s}}{\text{km}^2}\right]$$

- **A cosa serve**: dimostra che dimezzando il raggio della cella ($R \to R/2$), l'area della singola cella si riduce di un fattore 4, quadruplicando la capacita complessiva erogabile sul territorio a parita di banda assegnata.
- **Spiegazione Teorica**: [[Lezione 02 24 febbraio - 03 - Distanza tra celle adiacenti e apotema dell’esagono|Lezione 02 24 febbraio - 03]], [[Lezione 02 24 febbraio - 20 - Capacita del singolo settore e capacita aggregata della stazione|Lezione 02 24 febbraio - 20]]
- **Esercizi**: [[Lezione 04 3 marzo - 19 - Esercizio - capacità teorica per chilometro quadrato|Lezione 04 3 marzo - 19]].

---

## 3. Fading, Variabilita del Canale, Outage e Margini di Dissolvenza

### 3.1 Fading Lento: Shadowing Log-Normale
La potenza ricevuta in decibel fluttua attorno al valore medio secondo una variabile casuale gaussiana:
$$P_{r,\text{dB}} \sim \mathcal{N}(\overline{P}_{r,\text{dB}}, \sigma_{\text{dB}}^2)$$

Probabilita di Outage (*interruzione del servizio per segnale sotto soglia $P_{\text{th}}$*):
$$P_{\text{out}} = P(P_r < P_{\text{th}}) = Q\left( \frac{\overline{P}_r - P_{\text{th}}}{\sigma} \right)$$

Margine di Shadowing (*Fade Margin* $M_s$):
$$M_s = \overline{P}_r - P_{\text{th}} = z_p \cdot \sigma \quad \text{[dB]}$$
Dove $z_p = Q^{-1}(P_{\text{out}})$ (ad esempio, per $P_{\text{out}} = 10\% \implies z_p \approx 1{,}28$; per $P_{\text{out}} = 1\% \implies z_p \approx 2{,}33$).

- **A cosa serve**: dimensionamento del margine di potenza addizionale da trasmettere affinché la copertura sia garantita con una percentuale prefissata (es. $90\%$ o $99\%$ del bordo cella).
- **Spiegazione Teorica**: Mappa [[Outage, margini e dimensionamento|Outage, margini e dimensionamento]], [[Lezione 01 22 febbraio - 14 - Distanza, shadowing e multipath - tre fenomeni distinti|Lezione 01 22 febbraio - 14]]
- **Esercizi**: [[Lezione 04 3 marzo - 17 - Esercizio - shadowing, raggio della cella e SIR|Lezione 04 3 marzo - 17]].

---

### 3.2 Fading Veloce: Distribuzione di Rayleigh
In assenza di linea di vista diretta (multipath diffuso puro), la potenza istantanea $p$ segue una distribuzione esponenziale:
$$f(p) = \frac{1}{\overline{p}} e^{-\frac{p}{\overline{p}}} \quad (p \ge 0)$$

Probabilita di Outage per solo fading Rayleigh:
$$P_{\text{out}} = P(p \le p_{\text{th}}) = \int_0^{p_{\text{th}}} f(p)\,dp = 1 - e^{-\frac{p_{\text{th}}}{\overline{p}}}$$

Per valori di outage piccoli ($p_{\text{th}} / \overline{p} \ll 1$), applicando lo sviluppo in serie di Taylor $1 - e^{-x} \approx x$:
$$P_{\text{out}} \approx \frac{p_{\text{th}}}{\overline{p}} \implies \frac{\overline{p}}{p_{\text{th}}} \approx \frac{1}{P_{\text{out}}}$$

Margine di Dissolvenza Rayleigh in decibel:
$$M_{\text{Rayleigh, dB}} = 10\log_{10}\left( \frac{\overline{p}}{p_{\text{th}}} \right) \approx -10\log_{10}(P_{\text{out}})$$
- Per $P_{\text{out}} = 10\% (0{,}1) \implies M_{\text{Rayleigh}} \approx 10\text{ dB}$.
- Per $P_{\text{out}} = 1\% (0{,}01) \implies M_{\text{Rayleigh}} \approx 20\text{ dB}$.
- Per $P_{\text{out}} = 0{,}1\% (0{,}001) \implies M_{\text{Rayleigh}} \approx 30\text{ dB}$.
- **Spiegazione Teorica**: Mappa [[Multipath, Rayleigh e shadowing|Multipath, Rayleigh e shadowing]]
- **Esercizi**: [[Lezione 04 3 marzo - 18 - Esercizio - dimensionamento con solo fast fading|Lezione 04 3 marzo - 18]].

---

## 4. Accesso Casuale: Protocolli ALOHA, Slotted ALOHA e PRACH LTE

### 4.1 Modello di Traffico Poissoniano
Probabilita di generare $k$ trasmissioni nell'intervallo $T$ con tasso medio $\lambda$:
$$P(k) = \frac{(\lambda T)^k}{k!} e^{-\lambda T}$$
Probabilita di zero arrivi (canale libero):
$$P(0) = e^{-\lambda T}$$

---

### 4.2 Protocollo Pure ALOHA (Non Slottizzato)
- Periodo di vulnerabilita: $V_p = 2 T_p$ ($T_p$ = durata della trama).
- Traffico offerto (nuovi pacchetti + ritrasmissioni): $G = g \cdot T_p$.

Throughput di Pure ALOHA:
$$S = G \cdot P(\text{successo}) = G \cdot e^{-2G}$$

Massima efficienza e punto di lavoro ottimale:
$$\frac{dS}{dG} = e^{-2G}(1 - 2G) = 0 \implies G^* = 0{,}5$$
$$S_{\max} = 0{,}5 \cdot e^{-1} = \frac{1}{2e} \approx 0{,}184 \quad (18{,}4\%)$$

Numero medio di tentativi per pacchetto con successo:
$$E[N] = e^{2G}$$
- **Spiegazione Teorica**: [[Lezione 03 1 marzo - 08 - Modello del traffico e processo di Poisson|Lezione 03 1 marzo - 08]], [[Lezione 03 1 marzo - 09 - Periodo di vulnerabilità di ALOHA|Lezione 03 1 marzo - 09]], [[Lezione 03 1 marzo - 11 - Probabilità di successo e throughput di ALOHA|Lezione 03 1 marzo - 11]], [[Lezione 03 1 marzo - 12 - Massima efficienza di ALOHA|Lezione 03 1 marzo - 12]]

---

### 4.3 Protocollo Slotted ALOHA (Slottizzato)
- Periodo di vulnerabilita: $V_p = T_p$ (le trasmissioni sono sincronizzate all'inizio dello slot).

Throughput di Slotted ALOHA:
$$S = G \cdot e^{-G}$$

Massima efficienza e punto di lavoro ottimale:
$$\frac{dS}{dG} = e^{-G}(1 - G) = 0 \implies G^* = 1{,}0$$
$$S_{\max} = 1{,}0 \cdot e^{-1} = \frac{1}{e} \approx 0{,}368 \quad (36{,}8\%)$$

Numero medio di tentativi:
$$E[N] = e^G$$
- **Spiegazione Teorica**: [[Lezione 03 1 marzo - 15 - Slotted ALOHA|Lezione 03 1 marzo - 15]], Mappa [[ALOHA e Slotted ALOHA|ALOHA e Slotted ALOHA]]

---

### 4.4 Modello di Canale PRACH in LTE (Canali Multipli Equivalent Slotted ALOHA)
Il canale di accesso casuale LTE (PRACH) mette a disposizione $N_p$ preamboli ortogonali per ciascuna occasione di accesso (tipicamente $N_p = 54$ o $64$).
Se $G$ e il traffico offerto totale per slot, il traffico gravante sul singolo preambolo e:
$$G_p = \frac{G}{N_p}$$

Probabilita di successo di una richiesta su un preambolo:
$$P_{\text{succ}} = e^{-G_p} = e^{-\frac{G}{N_p}}$$

Throughput complessivo del PRACH:
$$S = G \cdot e^{-\frac{G}{N_p}}$$

Massimo carico sostenibile e massimo throughput del canale PRACH:
$$G^* = N_p \implies S_{\max} = \frac{N_p}{e} \approx 0{,}368 \cdot N_p \quad \text{[accessi con successo/slot]}$$

Condizione di stabilita per non cadere nel ramo di sovraccarico (ramo instabile):
$$\lambda_{\text{richieste}} < S_{\max} = \frac{N_p}{e \cdot T_{\text{PRACH}}}$$
- **Spiegazione Teorica**: [[Lezione 07 15 marzo - 29 - Esercizio 6 PRACH - dati, obiettivo e modello|Lezione 07 15 marzo - 29]], [[Lezione 07 15 marzo - 31 - Esercizio PRACH - preamboli come canali equivalenti|Lezione 07 15 marzo - 31]]
- **Esercizi**: [[Lezione 07 15 marzo - 32 - Esercizio PRACH - tentativi medi e soluzione numerica|Lezione 07 15 marzo - 32]], [[Lezione 07 15 marzo - 33 - Variante PRACH - massimo ritmo prima del ramo di sovraccarico|Lezione 07 15 marzo - 33]], [[Lezione 07 15 marzo - 34 - Variante PRACH - probabilita di successo almeno del 60 per cento|Lezione 07 15 marzo - 34]].

---

## 5. Sistemi Cellulari 4G LTE: Risorse Radio, Bitrate e Dimensionamento

### 5.1 Griglia Tempo-Frequenza e Resource Block (RB) LTE
- Spaziatura tra sottoportanti: $\Delta f = 15\text{ kHz}$.
- Durata simbolo OFDM: $T_s = 66{,}7\,\mu\text{s} + T_{\text{CP}} \approx 71{,}4\,\mu\text{s}$ (Normal CP, 7 simboli per slot).
- Durata dello Slot: $T_{\text{slot}} = 0{,}5\text{ ms}$.
- Durata del Subframe (TTI, *Transmission Time Interval*): $T_{\text{subframe}} = 1\text{ ms} = 2\text{ slot}$.
- **Composizione di 1 Resource Block (RB)**:
  - In frequenza: $12\text{ sottoportanti} \times 15\text{ kHz} = 180\text{ kHz}$.
  - In tempo su 1 slot: $7\text{ simboli} \implies 12 \times 7 = 84\text{ Resource Elements (RE)}$.
  - In tempo su 1 subframe (1 TTI, coppia di RB): $12 \times 14 = 168\text{ RE}$.

Allocazione RB in base alla larghezza di banda del canale:

| Banda di Canale | $1{,}4\text{ MHz}$ | $3\text{ MHz}$ | $5\text{ MHz}$ | $10\text{ MHz}$ | $15\text{ MHz}$ | $20\text{ MHz}$ |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Numero di RB ($N_{\text{RB}}$)** | 6 | 15 | 25 | 50 | 75 | 100 |
| **Banda Trasmissiva Utile** | $1{,}08\text{ MHz}$ | $2{,}7\text{ MHz}$ | $4{,}5\text{ MHz}$ | $9{,}0\text{ MHz}$ | $13{,}5\text{ MHz}$ | $18{,}0\text{ MHz}$ |

- **Spiegazione Teorica**: [[Lezione 05 8 marzo - 27 - Griglia tempo-frequenza LTE|Lezione 05 8 marzo - 23]], Mappa [[OFDM, SC-FDMA e risorse radio|OFDM, SC-FDMA e risorse radio]]

---

### 5.2 Bitrate Medio e Spettrale per Cella LTE (Esercizio 10)
Se la cella e suddivisa in $K$ corone concentriche con diverse probabilita di presenza utente $p_k$ e bitrate medio $R_k$:
$$R_{\text{medio}} = \sum_{k=1}^K p_k \cdot R_k$$

Bitrate erogabile da 1 Resource Block con efficienza di modulazione $m$ (bit/simbolo), tasso di codifica $r_{\text{code}}$ e simboli dati netti $N_{\text{data}}$ per TTI:
$$R_{\text{RB}} = \frac{N_{\text{data}} \cdot m \cdot r_{\text{code}}}{1\text{ ms}} \quad \text{[bit/s]}$$
- **Esercizi**: [[Lezione 10 24 marzo - 05 - Esercizio 10 - MCS e bitrate media nella cella|Lezione 10 24 marzo - 05]].

---

### 5.3 Dimensionamento Interfaccia S5/S8 e Protocollo GTP-U (Esercizio 4)
Capacita necessaria sul link core di trasporto tra S-GW e P-GW:
$$C_{S5} = N_{\text{utenti}} \cdot \alpha \cdot R_{\text{utente}} \cdot \left( 1 + \frac{\text{Overhead}_{\text{GTP-U}}}{L_{\text{payload}}} \right)$$

- **Parametri**:
  - $\alpha$: fattore di attivita concorrente degli utenti (es. $0{,}1$ o $0{,}05$).
  - $R_{\text{utente}}$: bitrate medio concordato per utente attivo.
  - $\text{Overhead}_{\text{GTP-U}}$: incapsulamento IP esterno ($20\text{ B}$) + UDP ($8\text{ B}$) + GTP-U ($8\text{ B}$) = $36\text{ byte}$.
- **Esercizi**: [[Lezione 10 24 marzo - 01 - Esercizio 4 - Capacita S5 e bitrate per utente|Lezione 10 24 marzo - 01]].

---

### 5.4 Dimensionamento Cella: Copertura vs Capacita (Esercizio 9)
Il numero minimo di stazioni radiobase per servire un'area geografica $A_{\text{tot}}$ con densita di utenti $\rho$ e:
$$N_{\text{copertura}} = \left\lceil \frac{A_{\text{tot}}}{A_{\text{cella}}(R_{\max})} \right\rceil$$
$$N_{\text{capacita}} = \left\lceil \frac{A_{\text{tot}} \cdot \rho \cdot R_{\text{medio}}}{C_{\text{sito}}} \right\rceil$$
$$N_{\text{stazioni}} = \max(N_{\text{copertura}}, N_{\text{capacita}})$$

- **Criterio decisionale**:
  - In aree rurali: domina $N_{\text{copertura}}$ (il raggio e limitato dalla potenza ricevuta).
  - In aree urbane: domina $N_{\text{capacita}}$ (il raggio deve essere ridotto per densificare le celle).
- **Esercizi**: [[Lezione 10 24 marzo - 04 - Esercizio 9 - Dimensionamento per traffico e copertura|Lezione 10 24 marzo - 04]].

---

## 6. Reti Wireless LAN IEEE 802.11 e 802.11n: DCF, A-MPDU, Block Ack e TXOP

### 6.1 Meccanismo di Accesso Base CSMA/CA (DCF)
Tempo medio di trasmissione di una singola trama dati 802.11:
$$T_{\text{ciclo, base}} = \text{DIFS} + \overline{\text{BO}} + T_{\text{data}} + \text{SIFS} + T_{\text{ACK}}$$

- **Parametri Temporali Standard (802.11a/g/n a 2.4/5 GHz)**:
  - $\text{SIFS} = 10\,\mu\text{s}$ (o $16\,\mu\text{s}$ in 802.11a).
  - $\text{Slot Time} (\sigma) = 9\,\mu\text{s}$ (Short Slot) o $20\,\mu\text{s}$.
  - $\text{DIFS} = \text{SIFS} + 2 \cdot \sigma$.
  - Backoff medio al primo tentativo: $\overline{\text{BO}} = \frac{CW_{\min}}{2} \cdot \sigma$ (con $CW_{\min} = 15$).
- **Spiegazione Teorica**: [[Lezione 15 12 aprile - 01 - ACK nascosto Virtual Carrier Sensing e NAV|Lezione 15 12 aprile - 01]], Mappa [[WiFi 802.11 - standard topologie e accesso|WiFi 802.11 - standard topologie e accesso]]

---

### 6.2 Vincoli Strutturali di Aggregazione 802.11n (Esercizio 19 e 20)
L'aggregazione a livello MAC riunisce molteplici sottotrame MPDU in una singola A-MPDU fisica. Il numero di MPDU aggregabili $N_{\text{MPDU}}$ e soggetto a **due vincoli di standard inderogabili**:

1. **Vincolo del Block Ack Bitmap**:
   La trama compressa di riscontro (*Compressed Block Ack*) ha un campo bitmap di dimensione fissa a $64\text{ bit}$:
   $$N_{\text{MPDU}} \le 64$$

2. **Vincolo di Dimensione Massima dell'A-MPDU**:
   La lunghezza massima dell'aggregato fisico codificabile nel preambolo PLCP e $65\,535\text{ byte}$ ($64\text{ KB}$):
   $$L_{\text{A-MPDU}} = \sum_{i=1}^{N_{\text{MPDU}}} (L_{\text{delimiter}} + L_{\text{MPDU}, i}) \le 65\,535\text{ byte}$$
   Con sottotrame identiche di lunghezza $L_{\text{sub}}$ e delimitatore di $4\text{ byte}$:
   $$N_{\text{MPDU}} \le \left\lfloor \frac{65\,535}{L_{\text{sub}} + 4} \right\rfloor$$

Sintesi del vincolo combinato:
$$N_{\text{MPDU}} = \min\left( 64, \left\lfloor \frac{65\,535}{L_{\text{sub}} + 4} \right\rfloor \right)$$

- **Spiegazione Teorica**: [[Lezione 18 26 aprile - 01 - Efficienza del MAC ad alta velocita e principio di aggregazione|Lezione 18 26 aprile - 01]]
- **Esercizi**: [[Lezione 19 28 aprile - 10 - Esercizio d esame - 802.11n calcolo finestra Block Ack e limite aggregato|Lezione 19 28 aprile - 10]].

---

### 6.3 Vincolo del TXOP (Transmit Opportunity) e Calcolo delle Sottotrame (Esercizio 7)
Quando la stazione ottiene il canale con accesso QoS (EDCA), puo trasmettere fino al tempo limite $\text{TXOP}$ (es. $\text{TXOP} = 1{,}5\text{ ms} = 1500\,\mu\text{s}$ o $3{,}008\text{ ms}$).

Equazione temporale di bilancio entro il TXOP:
$$T_{\text{aggregato}} + \text{SIFS} + T_{\text{BlockAck}} \le \text{TXOP}$$

Durata della trasmissione fisica dell'A-MPDU alla velocita nominale PHY $R_{\text{PHY}}$:
$$T_{\text{aggregato}} = T_{\text{preamble}} + \left\lceil \frac{N_{\text{MPDU}} \cdot (L_{\text{sub}} + 4) \cdot 8 + N_{\text{service}} + N_{\text{tail}}}{N_{\text{DBPS}}} \right\rceil \cdot T_{\text{sym}}$$

Dove:
- $T_{\text{sym}} = 4\,\mu\text{s}$ (Long Guard Interval) oppure $3{,}6\,\mu\text{s}$ (Short GI).
- $N_{\text{DBPS}}$: bit di dati per simbolo OFDM ($N_{\text{DBPS}} = R_{\text{PHY}} \cdot T_{\text{sym}}$).

Numero massimo di sottotrame ammissibili nel TXOP:
$$N_{\text{MPDU}} = \min\left( 64, \; \left\lfloor \frac{65535}{L_{\text{sub}} + 4} \right\rfloor, \; \left\lfloor \frac{T_{\text{disponibile}}}{T_{\text{subtrama}}} \right\rfloor \right)$$

- **Spiegazione Teorica**: [[Lezione 18 26 aprile - 03 - Aggregazione A-MPDU RIFS e confronto tra i due schemi|Lezione 18 26 aprile - 03]]
- **Esercizi**: [[Lezione 20 3 maggio - 01 - Esercizio d esame 7 - 802.11n calcolo del throughput con TXOP A-MPDU e RIFS|Lezione 20 3 maggio - 01]], [[Lezione 20 3 maggio - 02 - Esercizio d esame 7 - Variante ad alta velocita 600 Mbps e frammentazione in A-MPDU multiple|Lezione 20 3 maggio - 02]].

---

### 6.4 Throughput Netto del Livello MAC con Aggregazione
$$\text{Throughput} = \frac{N_{\text{MPDU}} \cdot L_{\text{payload}} \cdot 8}{T_{\text{ciclo}}} \quad \text{[bit/s]}$$
$$T_{\text{ciclo}} = \text{AIFS} + \overline{\text{BO}} + T_{\text{A-MPDU}} + \text{SIFS} + T_{\text{BlockAck}}$$

- **Esercizi**: [[Lezione 20 3 maggio - 01 - Esercizio d esame 7 - 802.11n calcolo del throughput con TXOP A-MPDU e RIFS|Lezione 20 3 maggio - 01]].

---

## 7. Qualita di Servizio e Regolazione del Traffico (QoS e Traffic Shaping)

### 7.1 Algoritmo Token Bucket Filter (TBF)
Volume massimo di dati emessi in una finestra temporale $\Delta t$:
$$D_{\max}(\Delta t) = B + r_s \cdot \Delta t$$

- **Parametri**:
  - $B$: capacita massima del secchio (massima raffica o *burst size* ammissibile) [byte o bit].
  - $r_s$: velocita media di generazione dei gettoni / tasso di servizio sostenibile [byte/s o bit/s].
  - $\Delta t$: intervallo temporale di osservazione [s].

Durata massima della raffica alla velocita di picco di linea $R$ ($R > r_s$):
$$R \cdot T_{\text{burst}} = B + r_s \cdot T_{\text{burst}} \implies T_{\text{burst}} = \frac{B}{R - r_s}$$

Dimensione della coda di attesa associata alla latenza massima $\tau_{\text{lat}}$:
$$Q_{\max} = r_s \cdot \tau_{\text{lat}} \quad \text{[byte]}$$
- **A cosa serve**: regolazione del traffico nei router Linux (`tc qdisc add ... tbf`) per limitare la banda garantendo la tolleranza controllata alle trasmissioni a raffica.
- **Spiegazione Teorica**: [[Lezione 24 19 maggio - 04 - Regolazione del traffico nel kernel Linux - algoritmi Leaky Bucket e Token Bucket Filter|Lezione 24 19 maggio - 04]]
- **Laboratorio**: [[Lezione 24 19 maggio - 05 - Traffic Shaping pratico con tc tbf e test di strozzamento della banda|Lezione 24 19 maggio - 05]].

---

## 8. Internet of Things e Web of Things: Efficienza Applicativa e Protocolli

### 8.1 Efficienza Applicativa di Trasmissione (Esercizio d'Esame 21)
$$\eta = \frac{\text{Volume Payload Utile}}{\text{Traffico Totale Scambiato}} = \frac{L_{\text{payload}}}{L_{\text{payload}} + L_{\text{overhead}}}$$

Per una transazione HTTP (richiesta + risposta):
$$L_{\text{totale, HTTP}} = (L_{\text{req, header}} + L_{\text{req, body}}) + (L_{\text{resp, header}} + L_{\text{resp, body}})$$
$$\eta_{\text{HTTP}} = \frac{L_{\text{payload}}}{L_{\text{totale, HTTP}}}$$

- **Valori Tipici Misurati a Laboratorio**:
  - HTTP POST: $L_{\text{payload}} = 42\text{ B}$, $L_{\text{totale}} = 978\text{ B} \implies \eta_{\text{HTTP}} \approx 4{,}3\%$.
  - MQTT Publish QoS 0: $L_{\text{payload}} = 25\text{ B}$, $L_{\text{totale}} = 33\text{ B} \implies \eta_{\text{MQTT}} \approx 75{,}8\%$.
- **Spiegazione Teorica**: [[Lezione 24 19 maggio - 08 - Analisi quantitativa dell overhead HTTP vs MQTT e indicazioni d esame|Lezione 24 19 maggio - 08]]
- **Esercizi**: [[Lezione 21 5 maggio - 07 - Esercizio d esame - calcolo dell efficienza HTTP nel trasferimento dati IoT|Lezione 21 5 maggio - 07]].

---

### 8.2 Confronto di Efficienza: Polling Periodico vs Notifica Asincrona (Esercizio d'Esame 22)
Si consideri una finestra temporale di osservazione $T$, in cui il sensore genera $N_{\text{eventi}}$ campioni reali (frequenza eventi $f_{\text{evento}} = \frac{1}{T_{\text{evento}}}$):

1. **Modello a Notifica Asincrona (WebHook / Push Event)**:
   Il client invia dati unicamente al verificarsi dell'evento:
   $$\text{Traffico}_{\text{notifica}} = N_{\text{eventi}} \cdot (L_{\text{req}} + L_{\text{resp}})$$
   $$\eta_{\text{notifica}} = \frac{N_{\text{eventi}} \cdot L_{\text{payload}}}{N_{\text{eventi}} \cdot (L_{\text{req}} + L_{\text{resp}})} = \frac{L_{\text{payload}}}{L_{\text{req}} + L_{\text{resp}}} \quad (\text{costante } \approx 11\%)$$

2. **Modello a Polling Periodico (Interrogazione a intervallo $T_{\text{poll}}$)**:
   Il client invia un numero totale di interrogazioni pari a:
   $$N_{\text{poll}} = \left\lfloor \frac{T}{T_{\text{poll}}} \right\rfloor$$
   Di cui $N_{\text{eventi}}$ conterranno dati utili e $N_{\text{poll}} - N_{\text{eventi}}$ conterranno risposte vuote o nulle ($L_{\text{empty}}$):
   $$\text{Traffico}_{\text{polling}} = N_{\text{eventi}} \cdot (L_{\text{req}} + L_{\text{resp}}) + (N_{\text{poll}} - N_{\text{eventi}}) \cdot (L_{\text{req}} + L_{\text{resp, empty}})$$
   $$\eta_{\text{polling}} = \frac{N_{\text{eventi}} \cdot L_{\text{payload}}}{\text{Traffico}_{\text{polling}}} \ll \eta_{\text{notifica}}$$

- **Spiegazione Teorica**: [[Lezione 21 5 maggio - 04 - Pattern architetturali IoT - Gateway proxy Polling e meccanismo a Notifica WebHook|Lezione 21 5 maggio - 04]]
- **Esercizi**: [[Lezione 21 5 maggio - 08 - Esercizio d esame - confronto di efficienza tra Polling periodico e Notifica asincrona|Lezione 21 5 maggio - 08]].

---

## 9. Tabella di Corrispondenza Formule ed Esercizi d'Esame

La tabella seguente consente di individuare all'istante le formule richieste nei compiti d'esame scritti:

| Tipo Esercizio d'Esame | Formule Chiave Utilizzate | Note Esercizio Svolto | Note Teoria |
| :--- | :--- | :--- | :--- |
| **Dimensionamento Cella e SIR** | $N = u^2+uv+v^2$, $D=R\sqrt{3N}$, $\text{SIR} = \frac{1}{6}(3N)^{\eta/2}$ | [[Lezione 04 3 marzo - 17 - Esercizio - shadowing, raggio della cella e SIR|Lezione 04 3 marzo - 17]] | [[Lezione 02 24 febbraio - 12 - Derivazione del SIR e indipendenza dal raggio|Lezione 02 24 febbraio - 12]] |
| **Margine di Fade (Rayleigh e Shadowing)** | $M_s = z_p \sigma$, $P_{\text{out}} = 1 - e^{-p_{\text{th}}/\overline{p}}$, $M_{\text{Rayleigh}} \approx -10\log_{10}(P_{\text{out}})$ | [[Lezione 04 3 marzo - 18 - Esercizio - dimensionamento con solo fast fading|Lezione 04 3 marzo - 18]] | [[Outage, margini e dimensionamento|Outage, margini e dimensionamento]] |
| **Capacita d'Area e Raggio** | $A_{\text{esag}} = \frac{3\sqrt{3}}{2}R^2$, $C_{\text{area}} = \frac{C_{\text{tot}}}{N A_{\text{esag}}}$ | [[Lezione 04 3 marzo - 19 - Esercizio - capacità teorica per chilometro quadrato|Lezione 04 3 marzo - 19]] | [[Lezione 02 24 febbraio - 20 - Capacita del singolo settore e capacita aggregata della stazione|Lezione 02 24 febbraio - 20]] |
| **Canale PRACH LTE** | $G_p = G / N_p$, $P_{\text{succ}} = e^{-G/N_p}$, $S = G e^{-G/N_p}$, $S_{\max} = N_p / e$ | [[Lezione 07 15 marzo - 32 - Esercizio PRACH - tentativi medi e soluzione numerica|Lezione 07 15 marzo - 32]] | [[Lezione 07 15 marzo - 31 - Esercizio PRACH - preamboli come canali equivalenti|Lezione 07 15 marzo - 31]] |
| **Capacita S5/GTP-U Core LTE** | $C_{S5} = N_{\text{ut}} \cdot \alpha \cdot R_{\text{ut}} \cdot (1 + 36 / L_{\text{pay}})$ | [[Lezione 10 24 marzo - 01 - Esercizio 4 - Capacita S5 e bitrate per utente|Lezione 10 24 marzo - 01]] | [[Lezione 08 17 marzo - 01 - EPS bearer e separazione tra controllo e dati|Lezione 08 17 marzo - 01]] |
| **Copertura vs Capacita LTE** | $N_{\text{cop}} = \lceil A/A_{\text{cell}} \rceil$, $N_{\text{cap}} = \lceil A \rho R / C_{\text{sito}} \rceil$ | [[Lezione 10 24 marzo - 04 - Esercizio 9 - Dimensionamento per traffico e copertura|Lezione 10 24 marzo - 04]] | [[Lezione 02 24 febbraio - 20 - Capacita del singolo settore e capacita aggregata della stazione|Lezione 02 24 febbraio - 20]] |
| **802.11n Block Ack e A-MPDU** | $N_{\text{MPDU}} = \min(64, \lfloor 65535 / (L+4) \rfloor)$ | [[Lezione 19 28 aprile - 10 - Esercizio d esame - 802.11n calcolo finestra Block Ack e limite aggregato|Lezione 19 28 aprile - 10]] | [[Lezione 18 26 aprile - 01 - Efficienza del MAC ad alta velocita e principio di aggregazione|Lezione 18 26 aprile - 01]] |
| **802.11n TXOP e Throughput** | $T_{\text{agg}} + \text{SIFS} + T_{\text{BA}} \le \text{TXOP}$, $\text{Th} = \frac{N L 8}{T_{\text{ciclo}}}$ | [[Lezione 20 3 maggio - 01 - Esercizio d esame 7 - 802.11n calcolo del throughput con TXOP A-MPDU e RIFS|Lezione 20 3 maggio - 01]] | [[Lezione 18 26 aprile - 03 - Aggregazione A-MPDU RIFS e confronto tra i due schemi|Lezione 18 26 aprile - 03]] |
| **Efficienza HTTP IoT** | $\eta = \frac{L_{\text{pay}}}{L_{\text{req}} + L_{\text{resp}}}$ | [[Lezione 21 5 maggio - 07 - Esercizio d esame - calcolo dell efficienza HTTP nel trasferimento dati IoT|Lezione 21 5 maggio - 07]] | [[Lezione 21 5 maggio - 02 - Vantaggi e trade-off di HTTP nel colloquio Machine-to-Machine|Lezione 21 5 maggio - 02]] |
| **HTTP Polling vs Notifica** | $\eta_{\text{poll}} = \frac{N_{\text{ev}} L_{\text{pay}}}{\text{Traffico Totale}}$, $\eta_{\text{notifica}} \approx 11\%$ | [[Lezione 21 5 maggio - 08 - Esercizio d esame - confronto di efficienza tra Polling periodico e Notifica asincrona|Lezione 21 5 maggio - 08]] | [[Lezione 21 5 maggio - 04 - Pattern architetturali IoT - Gateway proxy Polling e meccanismo a Notifica WebHook|Lezione 21 5 maggio - 04]] |

---

## Navigazione Rapida
- 🏠 [[00 - Indice Reti Wireless|Torna all'Indice Generale]]
- 📊 [[Esercizi svolti|Mappa Concettuale degli Esercizi Svolti]]
- 📘 [[01 Lezione 22 febbraio|Inizia dalla Prima Lezione]]
