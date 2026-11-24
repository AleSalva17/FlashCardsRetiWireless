"""
Telegram Bot per Flashcards Reti Wireless (Zero dipendenze esterne)
Utilizza solo la libreria standard di Python (urllib, json, os).

Funzionalità:
1. Risponde al comando /start inviando il pulsante WebApp per aprire le flashcard direttamente in chat.
2. Riceve automaticamente i report delle sessioni quando premi "Invia Report alla Chat Telegram" nell'app.
3. Salva i report nella cartella reports e ti risponde in chat con il riepilogo delle note da ripassare.
"""

import os
import sys
import json
import time
import urllib.request
import urllib.parse
from datetime import datetime

# Inserisci il token fornito da @BotFather su Telegram
BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "INSERISCI_QUI_IL_TUO_TOKEN_DI_BOTFATHER")
WEBAPP_URL = os.environ.get("WEBAPP_URL", "https://tuonome.github.io/flashcards/")  # Il tuo link HTTPS

API_BASE = f"https://api.telegram.org/bot{BOT_TOKEN}"

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
REPORTS_DIR = os.path.join(BASE_DIR, "reports_telegram")
os.makedirs(REPORTS_DIR, exist_ok=True)

def api_call(method, params=None):
    url = f"{API_BASE}/{method}"
    data = None
    headers = {"Content-Type": "application/json"}
    if params:
        data = json.dumps(params).encode("utf-8")
    req = urllib.request.Request(url, data=data, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=30) as response:
            return json.loads(response.read().decode("utf-8"))
    except Exception as e:
        print(f"Errore API Telegram ({method}): {e}")
        return None

def send_message(chat_id, text, reply_markup=None):
    params = {
        "chat_id": chat_id,
        "text": text,
        "parse_mode": "Markdown"
    }
    if reply_markup:
        params["reply_markup"] = reply_markup
    return api_call("sendMessage", params)

def main():
    if BOT_TOKEN == "INSERISCI_QUI_IL_TUO_TOKEN_DI_BOTFATHER":
        print("="*65)
        print(" ATTENZIONE: Inserisci il tuo Bot Token di Telegram in bot_telegram.py")
        print(" Per ottenerlo gratis in 30 secondi:")
        print(" 1. Apri Telegram e cerca @BotFather")
        print(" 2. Invia /newbot e segui le istruzioni")
        print(" 3. Copia il token qui o impostalo come variabile TELEGRAM_BOT_TOKEN")
        print("="*65)
        return

    print("Bot Telegram avviato e in ascolto... Premi CTRL+C per terminare.")
    offset = 0

    while True:
        try:
            updates = api_call("getUpdates", {"offset": offset, "timeout": 20})
            if updates and updates.get("ok"):
                for u in updates.get("result", []):
                    offset = u["update_id"] + 1
                    msg = u.get("message")
                    if not msg:
                        continue
                    
                    chat_id = msg["chat"]["id"]
                    text = msg.get("text", "")
                    web_app_data = msg.get("web_app_data")

                    # 1. Se riceve un report dalla WebApp
                    if web_app_data:
                        report_content = web_app_data.get("data", "")
                        now = datetime.now()
                        filename = f"report_tg_{now.strftime('%Y%m%d_%H%M%S')}.md"
                        filepath = os.path.join(REPORTS_DIR, filename)

                        with open(filepath, "w", encoding="utf-8") as f:
                            f.write(report_content)

                        reply = (
                            "📊 *Report di Studio Ricevuto e Salvato!*\n\n"
                            f"{report_content}\n\n"
                            f"💾 *Salvato localmente in*: `{filename}`"
                        )
                        send_message(chat_id, reply)
                        continue

                    # 2. Comando /start o /flashcards
                    if text.startswith("/start") or text.startswith("/flashcards"):
                        keyboard = {
                            "inline_keyboard": [
                                [
                                  {
                                    "text": "⚡ Apri Flashcards Reti Wireless",
                                    "web_app": {"url": WEBAPP_URL}
                                  }
                                ]
                            ]
                        }
                        welcome_text = (
                            "👋 *Ciao! Benvenuto nelle Flashcards di Reti Wireless!*\n\n"
                            "Tocca il pulsante qui sotto per avviare l'esercitazione interattiva.\n"
                            "I tuoi progressi e le note da ripassare vengono sincronizzati automaticamente!"
                        )
                        send_message(chat_id, welcome_text, reply_markup=keyboard)
                    else:
                        send_message(chat_id, "Invia /flashcards per aprire l'app interattiva!")

            time.sleep(1)
        except KeyboardInterrupt:
            print("\nBot arrestato.")
            break
        except Exception as e:
            print(f"Errore loop: {e}")
            time.sleep(2)

if __name__ == "__main__":
    main()
