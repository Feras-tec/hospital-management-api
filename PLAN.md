# Hospital Management System API

## Projektidee

Das Projekt ist eine REST API zur Verwaltung von Patienten und Terminen in einem Krankenhaus.

Ein Patient kann mehrere Termine haben.
Jeder Termin gehört zu genau einem Patienten.

Die Daten werden dauerhaft in einer PostgreSQL-Datenbank gespeichert.

Zusätzlich wurde ein React-Frontend entwickelt, über das Patienten und Termine erstellt, angezeigt, bearbeitet und gelöscht werden können.

## Ziele

- Patienten verwalten
- Termine verwalten
- Patienten mit ihren Terminen verknüpfen
- CRUD-Operationen für Patienten und Termine bereitstellen
- Eingehende Daten validieren
- Die API gegen häufige Sicherheitsrisiken schützen
- Daten dauerhaft in einer Datenbank speichern
- Den Code modular und übersichtlich strukturieren
- REST API und React-Frontend miteinander verbinden

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

#### Request

```json
{
  "name": "Max Mustermann",
  "email": "max@example.com",
  "birthDate": "1990-05-15"
}
```

#### Response – 201 Created

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

#### Response – 200 OK

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

### 4. PATCH /patients/:id

Aktualisiert einen bestehenden Patienten.

Es müssen nur die Felder gesendet werden, die geändert werden sollen.

#### Request

```json
{
  "name": "Max Mustermann Updated"
}
```

#### Response – 200 OK

```json
{
  "id": 1,
  "name": "Max Mustermann Updated",
  "email": "max@example.com",
  "birthDate": "1990-05-15T00:00:00.000Z"
}
```

Mögliche Fehler:

- `400 Bad Request` – ungültige Patienten-ID oder ungültige Daten
- `404 Not Found` – Patient nicht gefunden
- `409 Conflict` – E-Mail-Adresse existiert bereits

---

### 5. DELETE /patients/:id

Löscht einen Patienten.

Ein Patient kann nur gelöscht werden, wenn keine Termine mit diesem Patienten verknüpft sind.

#### Response – 200 OK

```json
{
  "message": "Patient erfolgreich gelöscht"
}
```

Mögliche Fehler:

- `400 Bad Request` – ungültige Patienten-ID
- `404 Not Found` – Patient nicht gefunden
- `409 Conflict` – Patient besitzt noch Termine

Die `409 Conflict`-Prüfung verhindert, dass verknüpfte Termindaten unbeabsichtigt verloren gehen.

---

### 6. POST /appointments

Erstellt einen neuen Termin für einen Patienten.

#### Request

```json
{
  "date": "2026-09-25T10:00:00.000Z",
  "reason": "Kontrolluntersuchung",
  "patientId": 1
}
```

#### Response – 201 Created

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

### 7. GET /patients/:id/appointments

Gibt alle Termine eines bestimmten Patienten zurück.

Beispiel:

```text
GET /patients/1/appointments
```

#### Response – 200 OK

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

---

### 8. PATCH /appointments/:id

Aktualisiert einen bestehenden Termin.

Es müssen nur die Felder gesendet werden, die geändert werden sollen.

#### Request

```json
{
  "reason": "Nachkontrolle"
}
```

#### Response – 200 OK

```json
{
  "id": 1,
  "date": "2026-09-25T10:00:00.000Z",
  "reason": "Nachkontrolle",
  "patientId": 1
}
```

Mögliche Fehler:

- `400 Bad Request` – ungültige Termin-ID oder ungültige Daten
- `404 Not Found` – Termin oder Patient nicht gefunden

---

### 9. DELETE /appointments/:id

Löscht einen bestehenden Termin.

#### Response – 200 OK

```json
{
  "message": "Termin erfolgreich gelöscht"
}
```

Mögliche Fehler:

- `400 Bad Request` – ungültige Termin-ID
- `404 Not Found` – Termin nicht gefunden

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

`429 Too Many Requests`

### JSON Body Limit

Die Größe eingehender JSON-Daten ist auf 10 KB begrenzt.

Dadurch können sehr große Request-Bodies abgelehnt werden.

### Zod Validation

Eingehende Patienten- und Termindaten werden mit Zod validiert, bevor sie verarbeitet und in der Datenbank gespeichert werden.

Für PATCH-Requests werden partielle Schemas verwendet, damit nur die zu ändernden Felder gesendet werden müssen.

Ungültige Daten führen zu:

`400 Bad Request`

### ID Validation

Patienten- und Termin-IDs werden geprüft, bevor sie an Prisma übergeben werden.

Ungültige IDs führen zu:

`400 Bad Request`

### Error Handling

Die API besitzt einen zentralen Error Handler.

Interne Fehler werden mit:

`500 Internal Server Error`

beantwortet, ohne interne technische Details an den Client zu senden.

Unbekannte Routen führen zu:

`404 Not Found`

### Datenbank-Sicherheit und Datenintegrität

Die E-Mail-Adresse eines Patienten ist in der Datenbank eindeutig (`@unique`).

Bei einer bereits vorhandenen E-Mail-Adresse wird der Prisma-Fehler P2002 behandelt und die API antwortet mit:

`409 Conflict`

Vor dem Erstellen eines Termins wird geprüft, ob der zugehörige Patient existiert.

Beim Löschen eines Patienten wird zusätzlich geprüft, ob noch Termine mit diesem Patienten verknüpft sind. In diesem Fall wird der Löschvorgang mit `409 Conflict` abgelehnt.

## Frontend

Zusätzlich zur REST API wurde ein React-Frontend mit Vite erstellt.

Das Frontend ermöglicht:

- Patienten anzeigen
- Patienten erstellen
- Patienten bearbeiten
- Patienten löschen
- Termine eines Patienten anzeigen
- Termine erstellen
- Termine bearbeiten
- Termine löschen
- API-Requests und Responses in einer API-Konsole anzeigen
- HTTP-Statuscodes direkt in der Benutzeroberfläche anzeigen

### Frontend-Struktur

Das Frontend ist modular in wiederverwendbare React-Komponenten aufgeteilt:

- `PatientList` – zeigt Patienten und Aktionen an
- `AppointmentList` – zeigt Termine und Aktionen an
- `PatientModal` – Formular zum Erstellen und Bearbeiten eines Patienten
- `AppointmentModal` – Formular zum Erstellen und Bearbeiten eines Termins
- `ApiConsole` – zeigt Endpoint, HTTP-Methode, Status und API-Response

Das Frontend kommuniziert über HTTP mit der REST API.

## Verwendete Technologien

### Backend

- Node.js
- Express
- Prisma ORM
- PostgreSQL
- Zod
- Helmet
- CORS
- express-rate-limit

### Frontend

- React
- Vite
- Tailwind CSS
- daisyUI
- Motion

## Projektstruktur

Das Projekt ist modular aufgebaut.

Die Backend-Logik ist unter anderem in folgende Bereiche getrennt:

- Routes
- Controller
- Schemas
- Middleware
- Prisma / Datenbankzugriff

Das Frontend verwendet separate React-Komponenten für Listen, Formulare und die API-Konsole.
