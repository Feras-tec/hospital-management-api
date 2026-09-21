// Importiere Express und die Patient-Controller.
import express from "express";

import {
  createPatient,
  getPatients,
  getPatientById,
  getPatientAppointments,
  updatePatient,
  deletePatient,
} from "../controllers/patientController.js";

// Erstelle einen Router.
const router = express.Router();

// POST /patients - Erstellt einen neuen Patienten.
router.post("/", createPatient);

// GET /patients - Gibt alle Patienten zurück.
router.get("/", getPatients);

// GET /patients/:id/appointments - Gibt alle Termine eines Patienten zurück.
router.get("/:id/appointments", getPatientAppointments);

// GET /patients/:id - Gibt einen bestimmten Patienten zurück.
router.get("/:id", getPatientById);
// PATCH /patients/:id - Aktualisiert einen Patienten.
router.patch("/:id", updatePatient);
// DELETE /patients/:id - Löscht einen Patienten.
router.delete("/:id", deletePatient);

// Exportiere den Router.
export default router;
