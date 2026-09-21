// Importiere Prisma und das Appointment-Schema.
import prisma from "../lib/prisma.js";
import {
  appointmentSchema,
  appointmentUpdateSchema,
} from "../schemas/appointmentSchema.js";

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
// Aktualisiert einen bestehenden Termin.
export const updateAppointment = async (req, res) => {
  const id = Number(req.params.id);

  // Prüfe, ob die ID eine gültige positive Zahl ist.
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      error: "Ungültige Termin-ID",
    });
  }

  // Validiere die zu aktualisierenden Daten.
  const result = appointmentUpdateSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: "Ungültige Termindaten",
      details: result.error.issues,
    });
  }

  // Prüfe, ob der Termin existiert.
  const appointment = await prisma.appointment.findUnique({
    where: { id },
  });

  if (!appointment) {
    return res.status(404).json({
      error: "Termin nicht gefunden",
    });
  }

  // Wenn patientId geändert wird, prüfe den neuen Patienten.
  if (result.data.patientId !== undefined) {
    const patient = await prisma.patient.findUnique({
      where: { id: result.data.patientId },
    });

    if (!patient) {
      return res.status(404).json({
        error: "Patient nicht gefunden",
      });
    }
  }

  const updatedAppointment = await prisma.appointment.update({
    where: { id },
    data: result.data,
  });

  return res.status(200).json(updatedAppointment);
};
// Löscht einen bestehenden Termin.
export const deleteAppointment = async (req, res) => {
  const id = Number(req.params.id);

  // Prüfe, ob die ID eine gültige positive Zahl ist.
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      error: "Ungültige Termin-ID",
    });
  }

  // Prüfe, ob der Termin existiert.
  const appointment = await prisma.appointment.findUnique({
    where: { id },
  });

  if (!appointment) {
    return res.status(404).json({
      error: "Termin nicht gefunden",
    });
  }

  await prisma.appointment.delete({
    where: { id },
  });

  return res.status(200).json({
    message: "Termin erfolgreich gelöscht",
  });
};
