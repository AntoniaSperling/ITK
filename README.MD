# Progressive Web Apps - Aktuelle Trends der IKT 2023

Dieses Projekt ist eine progessive Web Application, welche Bilder in einer Datenbank speichert. Man kann eine Erweiterung für die Web-App installieren und sie auch offline nutzen.



## Download 

Um die Anwendung nutzen zu können, ist es zunächst notwendig den Code über github herunterzuladen.

Um das Paket herunterzuladen, klicken Sie auf die grüne Schaltfläche auf der '<> Code' steht und drücken Sie danach auf das 'Download ZIP' Feld, um die Datei auf ihren Rechner herunterzuladen.
Nach dem Sie den Ordner entpackt haben, durch Rechtsklick 'Ordner entpacken', öffnen Sie das Terminal und navigieren Sie sich zu dem entpackten Ordner.

## Installation

Um unsere Anwendung nutzen zu können, muss folgendes installiert werden. Zum einen ist zwingend notwendig, dass [Node.js](https://nodejs.org/en/) vorhanden ist. Des weitern wird eine Datenbank
benötig. In diesem Projekt wird eine [MongoDB](https://www.mongodb.com/) verwendet.
Am besten öffnen Sie das Projekt in der Entwicklungsumgebung Ihrer Wahl. Dann gehen Sie in einmal in den Ordner backend und führen im Terminal folgenden Befehl aus

```
npm install
```
Den gleichen Befehl führen Sie auch im frontend Ordner aus. Dann sind alle benötigenden Module und Abhängigkeiten bei Ihnen installiert.

## Verbindung zur Datenbank
MongoDB (Cloud Atlas)

.env-Datei erstellen. Beispiel:

DB_CONNECTION = mongodb+srv://ikt-pwa.0elr1ih.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority 
DB_NAME = foto-pwa
COLLECTION = posts
PORT = 3000

## Start der Anwendung

Um das Backend zu starten, muss man im Ordner 'backend' den folgenden Befehl in einem Terminal ausführen 
```
npm run watch
```
Das Frontend wird in einem extra Terminal im Ordner 'frontend' mit dem nachfolgenden Befehl gestartet
```
npm start
```
