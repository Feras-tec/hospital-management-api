// Importiere Express und den Appointment-Controller.
import express from "express";
import {
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from "../controllers/appointmentController.js";

// Erstelle einen Router.
const router = express.Router();

// POST /appointments - Erstellt einen neuen Termin.
router.post("/", createAppointment);

// PATCH /appointments/:id - Aktualisiert einen Termin.
router.patch("/:id", updateAppointment);

// DELETE /appointments/:id - Löscht einen Termin.
router.delete("/:id", deleteAppointment);

export default router;
