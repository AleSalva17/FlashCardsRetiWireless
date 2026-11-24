# Guida WebApp Mobile & Telegram: Flashcards Reti Wireless

Questa versione è una **Web Application autonoma al 100% (PWA)**:
- **Zero server da mantenere o pagare** (funziona interamente nel browser con HTML5/CSS/JavaScript).
- **100% Offline** (usa Service Worker e `localStorage` su qualsiasi smartphone).
- **Compatibile nativamente con iPhone (iOS), Android e Telegram Mini Apps**.
- Supporta **Swipe col dito** (scorri a destra/sinistra per cambiare card, tocca per girare) e vibrazione aptica (su Telegram e Android).

---

## 📱 OPZIONE 1: Uso Diretto su iPhone e Android (Offline PWA)

### Su iPhone (Safari):
1. Metti i file online (vedi sotto) oppure apri il file sul dispositivo.
2. In Safari, tocca l'icona di condivisione (**il quadrato con la freccia verso l'alto** in basso al centro).
3. Scorri e tocca **"Aggiungi alla schermata Home"**.
4. L'app verrà installata come un'app vera e propria: si aprirà a schermo intero senza barre del browser e funzionerà anche in aereo senza connessione internet!

### Su Android (Chrome):
1. Apri la pagina in Chrome.
2. Tocca i tre puntini in alto a destra e seleziona **"Aggiungi a schermata Home"** o **"Installa app"**.

---

## ✈️ OPZIONE 2: Aprirlo come Mini App dentro Telegram (Gratis in 2 Minuti)

Telegram consente di trasformare qualunque pagina web in una **Telegram Mini App** che si apre come popup elegante dentro una chat.

1. **Ospita i file gratuitamente** (ad esempio con **GitHub Pages**, **Netlify Drop** o **Vercel** - vedi capitolo successivo). Supponiamo che il tuo URL sia `https://tuonome.github.io/flashcards/`.
2. Apri Telegram e cerca il bot ufficiale **`@BotFather`**.
3. Invia il comando:
   ```text
   /newapp
   ```
4. Seleziona il tuo bot (se non ne hai uno, fai prima `/newbot` e dagli un nome).
5. Inserisci:
   - Titolo: *Flashcards Reti Wireless*
   - Descrizione breve: *Esercitazione flashcard interattiva*
   - Immagine / GIF facoltativa (o salta con `/empty`).
   - **URL della Web App**: inserisci il link HTTPS del tuo sito (es. `https://tuonome.github.io/flashcards/index.html`).
   - Short name: `flashcards`
6. Fatto! BotFather ti darà un link del tipo:
   `t.me/tuobot/flashcards`
7. Quando clicchi quel link o crei un bottone in qualsiasi chat:
   - Si apre una finestra fluida dentro Telegram;
   - La WebApp rileva automaticamente Telegram, attiva il feedback aptico con vibrazione quando giri le carte e adatta i colori del tema!

---

## 🌐 OPZIONE 3: Mettere l'App Online Gratis a Costo Zero (in 30 secondi)

Poiché l'app è solo statica (`index.html`, `topics.js`, `manifest.json`, `sw.js`), non hai bisogno di server o database. Ecco i metodi più veloci e gratuiti:

### Metodo A: Netlify Drop (Senza nemmeno registrarsi o usare Git)
1. Vai su [app.netlify.com/drop](https://app.netlify.com/drop)
2. Trascina l'intera cartella `FlashcardsWebApp` nel riquadro del browser.
3. In 5 secondi ti genera un link HTTPS pubblico gratuito (es. `https://stupendous-reticellulari.netlify.app`).

### Metodo B: GitHub Pages (Permanente e Gratuito)
1. Crea un repository gratuito su GitHub (es. `reti-wireless-flashcards`).
2. Carica i file di `FlashcardsWebApp`.
3. Vai in **Settings** -> **Pages** -> seleziona ramo `main` e cartella `/root`.
4. In 1 minuto il tuo sito sarà attivo all'indirizzo `https://tuousername.github.io/reti-wireless-flashcards/`.

---

## 📥 Come Aggiungere Nuove Domande su Mobile

Oltre ad aggiornare il file `topics.js`, sull'app mobile trovi il pulsante **`+ Importa JSON`** nella schermata iniziale:
- Puoi inviarti un file `.json` su WhatsApp o Telegram, salvarlo nei download del telefono e importarlo con 1 tap nell'app!
- L'app lo memorizza nel telefono e lo aggiunge alla lista degli argomenti disponibili.


---

## 🔄 OPZIONE 4: Sincronizzazione di Progressi e Note (Telegram & GitHub)

Puoi sincronizzare le card sbagliate ("Da Ripassare") e i tuoi argomenti personalizzati tra PC, iPhone e Android in due modi completamente gratuiti:

### Metodo 1: Tramite Telegram (Automatico al 100%)
Se apri la WebApp da Telegram:
- **Telegram CloudStorage**: Salva i tuoi progressi direttamente sui server cloud di Telegram associati al tuo account. Aprendo l'app da Telegram Desktop su PC, da iPhone o da Android ritrovi **sempre gli stessi dati e argomenti da ripassare**.
- **Invia Report in Chat**: Al termine dell'esercitazione, trovi il pulsante azzurro **"💬 Invia Report alla Chat Telegram"**: premendolo, il resoconto con l'elenco delle note Obsidian errate viene inviato come messaggio formattato direttamente al tuo bot!
- *(Opzionale)* Eseguendo lo script Python `python bot_telegram.py` sul tuo PC, il bot salverà anche i report ricevuti come file Markdown dentro la cartella `reports_telegram/`.

### Metodo 2: Tramite GitHub Gist (Senza Server)
Nel menu dell'app trovi il pulsante **`☁️ Sync`**:
1. Crea un Personal Access Token su GitHub gratuito (da `github.com/settings/tokens` con permesso `gist`).
2. Incolla il token nel campo dedicato nell'app (il Gist ID viene creato automaticamente al primo invio).
3. Premi **"⬆️ Carica su GitHub"** dopo aver studiato, oppure **"⬇️ Scarica da GitHub"** sull'altro dispositivo: le tue card da ripassare e i topic personalizzati saranno sincronizzati all'istante ovunque!
