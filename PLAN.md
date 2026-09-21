# Hospital Management System API

## Projektidee

Das Projekt ist eine REST API zur Verwaltung von Patienten und Terminen in einem Krankenhaus.

Ein Patient kann mehrere Termine haben.
Jeder Termin gehört zu einem Patienten.

Die Daten werden dauerhaft in einer Datenbank gespeichert.

## Ziele

- Patienten verwalten
- Termine verwalten
- Patienten mit ihren Terminen verknüpfen
- Eingehende Daten validieren
- Die API gegen häufige Sicherheitsrisiken schützen
- Daten dauerhaft in einer Datenbank speichern
- Den Code modular und übersichtlich strukturieren

## ERD – Entity Relationship Diagram

### Patient

- id (Primary Key)
- name
- email
- birthDate

### Appointment

- id (Primary Key)
- date
- reason
- patientId (Foreign Key)

### Beziehung

Ein Patient kann mehrere Termine haben.
Jeder Termin gehört zu genau einem Patienten.

Patient 1 : N Appointment

Patient.id wird mit Appointment.patientId verknüpft.

### ERD-Darstellung

```text
Patient
----------------
id          PK
name
email
birthDate
      |
      | 1
      |
      | N
Appointment
----------------
id          PK
date
reason
patientId   FK
```

## API-Endpunkte

### 1. POST /patients

Erstellt einen neuen Patienten.

#### Patient Request

```json
{
  "name": "Max Mustermann",
  "email": "max@example.com",
  "birthDate": "1990-05-15"
}
```

#### Patient Response – 201 Created

```json
{
  "id": 1,
  "name": "Max Mustermann",
  "email": "max@example.com",
  "birthDate": "1990-05-15T00:00:00.000Z"
}
```

Mögliche Fehler:

- `400 Bad Request` – ungültige Patientendaten
- `409 Conflict` – E-Mail-Adresse existiert bereits

---

### 2. GET /patients

Gibt alle Patienten zurück.

#### Patientenliste Response – 200 OK

```json
[
  {
    "id": 1,
    "name": "Max Mustermann",
    "email": "max@example.com",
    "birthDate": "1990-05-15T00:00:00.000Z"
  }
]
```

---

### 3. GET /patients/:id

Gibt einen bestimmten Patienten zurück.

Beispiel:

```text
GET /patients/1
```

Mögliche Responses:

- `200 OK` – Patient gefunden
- `400 Bad Request` – ungültige Patienten-ID
- `404 Not Found` – Patient nicht gefunden

---

### 4. POST /appointments

Erstellt einen neuen Termin für einen Patienten.

#### Appointment Request

```json
{
  "date": "2026-09-25T10:00:00.000Z",
  "reason": "Kontrolluntersuchung",
  "patientId": 1
}
```

#### Appointment Response – 201 Created

```json
{
  "id": 1,
  "date": "2026-09-25T10:00:00.000Z",
  "reason": "Kontrolluntersuchung",
  "patientId": 1
}
```

Mögliche Fehler:

- `400 Bad Request` – ungültige Termindaten
- `404 Not Found` – Patient nicht gefunden

---

### 5. GET /patients/:id/appointments

Gibt alle Termine eines bestimmten Patienten zurück.

Beispiel:

```text
GET /patients/1/appointments
```

#### Appointment-Liste Response – 200 OK

```json
[
  {
    "id": 1,
    "date": "2026-09-25T10:00:00.000Z",
    "reason": "Kontrolluntersuchung",
    "patientId": 1
  }
]
```

Mögliche Fehler:

- `400 Bad Request` – ungültige Patienten-ID
- `404 Not Found` – Patient nicht gefunden

## Sicherheitsmaßnahmen

Die API verwendet mehrere Sicherheitsmaßnahmen.

### Helmet

Helmet setzt verschiedene HTTP-Sicherheitsheader.

Dadurch wird die API unter anderem gegen bestimmte browserbasierte Angriffe besser geschützt.

### CORS

CORS kontrolliert, welche Origins auf die API zugreifen dürfen.

Erlaubter Origin:

`http://localhost:5173`

Damit wird der Zugriff durch andere Browser-Origins eingeschränkt.

### Rate Limiting

Die Anzahl der Requests wird begrenzt.

Aktuelle Einstellung:

- maximal 10 Requests
- innerhalb von 60 Sekunden

Bei zu vielen Requests antwortet die API mit:

429 Too Many Requests

### JSON Body Limit

Die Größe eingehender JSON-Daten ist auf 10 KB begrenzt.

Dadurch können sehr große Request-Bodies abgelehnt werden.

### Zod Validation

Eingehende Patienten- und Termindaten werden mit Zod validiert, bevor sie verarbeitet und in der Datenbank gespeichert werden.

Ungültige Daten führen zu:

400 Bad Request

### ID Validation

Patienten-IDs werden geprüft, bevor sie an Prisma übergeben werden.

Ungültige IDs wie `/patients/abc` führen zu:

400 Bad Request

### Error Handling

Die API besitzt einen zentralen Error Handler.

Interne Fehler werden mit:

500 Internal Server Error

beantwortet, ohne interne technische Details an den Client zu senden.

Unbekannte Routen führen zu:

404 Not Found

### Datenbank-Sicherheit und Datenintegrität

Die E-Mail-Adresse eines Patienten ist in der Datenbank eindeutig (`@unique`).

Bei einer bereits vorhandenen E-Mail-Adresse wird der Prisma-Fehler P2002 behandelt und die API antwortet mit:

409 Conflict

Außerdem wird vor dem Erstellen eines Termins geprüft, ob der zugehörige Patient existiert.

## Frontend

Zusätzlich zur REST API wurde ein React-Frontend mit Vite erstellt.

Das Frontend ermöglicht:

- Patienten anzeigen
- neue Patienten erstellen
- Termine eines Patienten anzeigen
- neue Termine erstellen
- API-Requests und Responses in einer API-Konsole anzeigen

### Frontend-Struktur

Das Frontend ist modular in wiederverwendbare React-Komponenten aufgeteilt:

- `PatientList` – zeigt die Patientenliste
- `AppointmentList` – zeigt die Termine eines Patienten
- `PatientModal` – Formular zum Erstellen eines Patienten
- `AppointmentModal` – Formular zum Erstellen eines Termins
- `ApiConsole` – zeigt Endpoint, HTTP-Status und API-Response

Das Frontend kommuniziert über HTTP mit der REST API.
