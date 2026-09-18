// Importiere Prisma und das Appointment-Schema.
import prisma from "../lib/prisma.js";
import { appointmentSchema } from "../schemas/appointmentSchema.js";

// Erstellt einen neuen Termin.
export const createAppointment = async (req, res) => {
  // Validiere req.body mit dem appointmentSchema.
  const result = appointmentSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: "Ungültige Termindaten",
      details: result.error.issues,
    });
  }

  // Prüfe, ob der Patient existiert.
  const patient = await prisma.patient.findUnique({
    where: { id: result.data.patientId },
  });

  if (!patient) {
    return res.status(404).json({
      error: "Patient nicht gefunden",
    });
  }

  // Speichere den Termin in der Datenbank.
  const appointment = await prisma.appointment.create({
    data: result.data,
  });

  return res.status(201).json(appointment);
};
