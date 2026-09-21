# Hospital Management System API

Eine REST API zur Verwaltung von Patienten und Terminen in einem Krankenhaus.

Das Projekt wurde als Full-Stack-Mini-Projekt mit Node.js, Express, PostgreSQL, Prisma und React entwickelt.

## Funktionen

- Patienten erstellen und abrufen
- Termine erstellen und Patienten zuordnen
- One-to-Many-Beziehung zwischen Patient und Appointment
- Validierung eingehender Daten mit Zod
- Persistente Datenspeicherung mit PostgreSQL
- Datenbankzugriff mit Prisma ORM
- Modulare Projektstruktur
- Zentrale Fehlerbehandlung
- Sicherheitsmaßnahmen für die API

## Technologien

- Node.js
- Express
- PostgreSQL
- Prisma ORM
- Zod
- Helmet
- CORS
- express-rate-limit
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

## API-Endpunkte

| Methode | Endpoint                     | Beschreibung                             |
| ------- | ---------------------------- | ---------------------------------------- |
| POST    | `/patients`                  | Erstellt einen Patienten                 |
| GET     | `/patients`                  | Gibt alle Patienten zurück               |
| GET     | `/patients/:id`              | Gibt einen bestimmten Patienten zurück   |
| POST    | `/appointments`              | Erstellt einen Termin                    |
| GET     | `/patients/:id/appointments` | Gibt alle Termine eines Patienten zurück |

## Sicherheit

Die API verwendet mehrere Sicherheitsmaßnahmen:

- Helmet für HTTP-Sicherheitsheader
- CORS zur Kontrolle erlaubter Origins
- Rate Limiting gegen zu viele Requests
- JSON Body Limit von 10 KB
- Zod zur Validierung eingehender Daten
- Validierung von Patienten-IDs
- Zentraler Error Handler
- 404 Handler für unbekannte Routen

## Projektstruktur

```text
src/
├── controllers/
│   ├── appointmentController.js
│   └── patientController.js
├── lib/
│   └── prisma.js
├── middleware/
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

### Funktionen

- Patienten anzeigen
- neue Patienten erstellen
- Termine eines Patienten anzeigen
- neue Termine erstellen
- API-Requests und Responses anzeigen

### Komponenten

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

Das Frontend kommuniziert über HTTP mit der REST API.

## Planung

Eine ausführliche Beschreibung des ERD, der Endpunkte, Request-/Response-Formate und Sicherheitsmaßnahmen befindet sich in `PLAN.md`.
