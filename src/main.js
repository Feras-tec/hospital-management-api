// Importiere Express und die Routes.
import express from "express";
import helmet from "helmet";
import cors from "cors";
import patientRoutes from "./routes/patientRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import { rateLimit } from "express-rate-limit";

// Erstelle die Express-App.
const app = express();

// Setzt wichtige HTTP-Sicherheitsheader.
app.use(helmet());

// Erlaubt kontrollierte Cross-Origin-Anfragen.
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

// Begrenzt die Anzahl der API-Anfragen.
const limiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 10,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    error: "Too many requests. Please try again later.",
  },
});

app.use("/patients", limiter);
app.use("/appointments", limiter);
// Definiere den Port.
const PORT = process.env.PORT || 3000;

// JSON-Daten aus Requests lesen.
app.use(express.json({ limit: "10kb" }));

// Test-Route.
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hospital Management API läuft",
  });
});

// Patient-Routes.
app.use("/patients", patientRoutes);

// Appointment-Routes.
app.use("/appointments", appointmentRoutes);

// Behandelt unbekannte Routen.
app.use((req, res) => {
  res.status(404).json({
    error: "Route nicht gefunden",
  });
});

// Zentraler Error Handler.
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    error: "Interner Serverfehler",
  });
});
// Starte den Server.
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
