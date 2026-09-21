# Hospital Management System

Eine Full-Stack-Anwendung zur Verwaltung von Patienten und Terminen in einem Krankenhaus.

Das Projekt wurde mit Node.js, Express, PostgreSQL, Prisma und React entwickelt.

## Funktionen

- Patienten erstellen, anzeigen, bearbeiten und löschen
- Termine erstellen, anzeigen, bearbeiten und löschen
- Termine Patienten zuordnen
- One-to-Many-Beziehung zwischen Patient und Appointment
- Validierung eingehender Daten mit Zod
- Persistente Datenspeicherung mit PostgreSQL
- Datenbankzugriff mit Prisma ORM
- Modulare Projektstruktur
- Zentrale Fehlerbehandlung
- Sicherheitsmaßnahmen für die REST API
- React-Frontend zur Verwaltung der Daten
- API-Test-Konsole zur Anzeige von Requests, Statuscodes und Responses

## Technologien

### Backend

- Node.js
- Express
- PostgreSQL
- Prisma ORM
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

## Datenmodell

### Patient

- id
- name
- email
- birthDate

### Appointment

- id
- date
- reason
- patientId

### Beziehung

Ein Patient kann mehrere Termine haben.

Jeder Termin gehört zu genau einem Patienten.

```text
Patient 1 : N Appointment
```

`Patient.id` wird über `Appointment.patientId` mit einem Termin verknüpft.

## API-Endpunkte

| Methode | Endpoint                     | Beschreibung                             |
| ------- | ---------------------------- | ---------------------------------------- |
| POST    | `/patients`                  | Erstellt einen Patienten                 |
| GET     | `/patients`                  | Gibt alle Patienten zurück               |
| GET     | `/patients/:id`              | Gibt einen bestimmten Patienten zurück   |
| PATCH   | `/patients/:id`              | Aktualisiert einen Patienten             |
| DELETE  | `/patients/:id`              | Löscht einen Patienten                   |
| POST    | `/appointments`              | Erstellt einen Termin                    |
| GET     | `/patients/:id/appointments` | Gibt alle Termine eines Patienten zurück |
| PATCH   | `/appointments/:id`          | Aktualisiert einen Termin                |
| DELETE  | `/appointments/:id`          | Löscht einen Termin                      |

## HTTP-Statuscodes

Die API verwendet unter anderem folgende Statuscodes:

- `200 OK` – Request erfolgreich
- `201 Created` – Ressource erfolgreich erstellt
- `400 Bad Request` – ungültige Daten oder ID
- `404 Not Found` – Ressource nicht gefunden
- `409 Conflict` – Konflikt mit bestehenden Daten
- `429 Too Many Requests` – Rate Limit überschritten
- `500 Internal Server Error` – interner Serverfehler

## Datenintegrität

Die E-Mail-Adresse eines Patienten ist eindeutig.

Bei einer bereits vorhandenen E-Mail-Adresse antwortet die API mit:

```text
409 Conflict
```

Vor dem Erstellen eines Termins wird geprüft, ob der zugehörige Patient existiert.

Ein Patient mit vorhandenen Terminen kann nicht gelöscht werden. In diesem Fall antwortet die API mit:

```text
409 Conflict
```

Dadurch werden verknüpfte Termindaten vor unbeabsichtigtem Löschen geschützt.

## Sicherheit

Die API verwendet mehrere Sicherheitsmaßnahmen:

- Helmet für HTTP-Sicherheitsheader
- CORS zur Kontrolle erlaubter Origins
- Rate Limiting gegen zu viele Requests
- JSON Body Limit von 10 KB
- Zod zur Validierung eingehender Daten
- Validierung von Patienten- und Termin-IDs
- Zentraler Error Handler
- 404 Handler für unbekannte Routen

Das aktuelle Rate Limit beträgt maximal 10 Requests innerhalb von 60 Sekunden.

Der erlaubte Frontend-Origin ist:

```text
http://localhost:5173
```

## Backend-Struktur

```text
src/
├── controllers/
│   ├── appointmentController.js
│   └── patientController.js
├── lib/
│   └── prisma.js
├── middleware/
│   └── rateLimiter.js
├── routes/
│   ├── appointmentRoutes.js
│   └── patientRoutes.js
├── schemas/
│   ├── appointmentSchema.js
│   └── patientSchema.js
└── main.js

prisma/
├── migrations/
└── schema.prisma
```

## Frontend

Zusätzlich zur REST API enthält das Projekt ein React-Frontend zur Verwaltung von Patienten und Terminen.

### Frontend-Funktionen

- Patienten anzeigen
- Patienten hinzufügen
- Patienten bearbeiten
- Patienten löschen
- Termine eines Patienten anzeigen
- Termine hinzufügen
- Termine bearbeiten
- Termine löschen
- API-Requests und Responses anzeigen
- HTTP-Statuscodes anzeigen

### Frontend-Komponenten

```text
frontend/src/
├── components/
│   ├── ApiConsole.jsx
│   ├── AppointmentList.jsx
│   ├── AppointmentModal.jsx
│   ├── PatientList.jsx
│   └── PatientModal.jsx
├── App.jsx
└── main.jsx
```

Die Komponenten sind modular aufgebaut.

`PatientModal` wird sowohl zum Erstellen als auch zum Bearbeiten von Patienten verwendet.

`AppointmentModal` wird sowohl zum Erstellen als auch zum Bearbeiten von Terminen verwendet.

Das Frontend kommuniziert über HTTP mit der REST API.

## CRUD

### Patient

```text
Create  → POST   /patients
Read    → GET    /patients
Update  → PATCH  /patients/:id
Delete  → DELETE /patients/:id
```

### Appointment

```text
Create  → POST   /appointments
Read    → GET    /patients/:id/appointments
Update  → PATCH  /appointments/:id
Delete  → DELETE /appointments/:id
```

## Planung

Eine ausführliche Beschreibung des ERD, der Endpunkte, Request-/Response-Formate und Sicherheitsmaßnahmen befindet sich in `PLAN.md`.
