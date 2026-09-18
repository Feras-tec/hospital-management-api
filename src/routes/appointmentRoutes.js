// Importiere Express und den Appointment-Controller.
import express from "express";
import { createAppointment } from "../controllers/appointmentController.js";

// Erstelle einen Router.
const router = express.Router();

// POST /appointments - Erstellt einen neuen Termin.
router.post("/", createAppointment);

export default router;
