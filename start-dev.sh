#!/bin/bash

# Farben für die Ausgabe
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Starte Entwicklungsumgebung...${NC}"

# Starte Mailhog
echo -e "${GREEN}Starte Mailhog...${NC}"
mailhog > /dev/null 2>&1 &
MAILHOG_PID=$!

# Starte Symfony Server
echo -e "${GREEN}Starte Symfony Server...${NC}"
symfony server:start -d

# Starte Frontend-Entwicklungsserver
echo -e "${GREEN}Starte Frontend-Entwicklungsserver...${NC}"
cd frontend
npm run dev > /dev/null 2>&1 &
FRONTEND_PID=$!
cd ..

# Starte Messenger Worker
echo -e "${GREEN}Starte Messenger Worker...${NC}"
symfony console messenger:consume async > /dev/null 2>&1 &
MESSENGER_PID=$!

# Warte kurz, damit die Server Zeit zum Starten haben
sleep 2

echo -e "${BLUE}Entwicklungsumgebung ist gestartet!${NC}"
echo -e "Symfony Server läuft auf: http://localhost:8000"
echo -e "Frontend läuft auf: http://localhost:5173"
echo -e "Mailhog läuft auf: http://localhost:1025 (SMTP) und http://localhost:8025 (Web UI)"

# Funktion zum Aufräumen beim Beenden des Skripts
cleanup() {
    echo -e "${BLUE}Beende Entwicklungsumgebung...${NC}"
    kill $MAILHOG_PID
    kill $FRONTEND_PID
    kill $MESSENGER_PID
    symfony server:stop
    exit 0
}

# Registriere die Cleanup-Funktion für SIGINT (Ctrl+C)
trap cleanup SIGINT

# Halte das Skript am Leben
echo -e "${BLUE}Drücke Ctrl+C zum Beenden${NC}"
while true; do
    sleep 1
done 