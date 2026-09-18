// Importiere Prisma und das Patient-Schema.
import prisma from "../lib/prisma.js";
import { Prisma } from "@prisma/client";
import { patientSchema } from "../schemas/patientSchema.js";

// Erstellt einen neuen Patienten.
export const createPatient = async (req, res) => {
  // Validiere req.body mit dem patientSchema.
  const result = patientSchema.safeParse(req.body);

  // Wenn die Validierung fehlschlägt, sende Status 400.
  if (!result.success) {
    return res.status(400).json({
      error: "Ungültige Patientendaten",
      details: result.error.issues,
    });
  }

  try {
    // Speichere den Patienten in der Datenbank.
    const patient = await prisma.patient.create({
      data: result.data,
    });

    return res.status(201).json(patient);
  } catch (error) {
    // P2002 bedeutet: Ein eindeutiger Wert existiert bereits.
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return res.status(409).json({
        error: "E-Mail-Adresse existiert bereits",
      });
    }

    throw error;
  }
};
// Gibt alle Patienten zurück.
export const getPatients = async (req, res) => {
  const patients = await prisma.patient.findMany();

  return res.status(200).json(patients);
};
// Gibt einen bestimmten Patienten zurück.
export const getPatientById = async (req, res) => {
  const id = Number(req.params.id);

  // Prüfe, ob die ID eine gültige positive Zahl ist.
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      error: "Ungültige Patienten-ID",
    });
  }

  const patient = await prisma.patient.findUnique({
    where: { id },
  });

  if (!patient) {
    return res.status(404).json({
      error: "Patient nicht gefunden",
    });
  }

  return res.status(200).json(patient);
};
// Gibt alle Termine eines bestimmten Patienten zurück.
export const getPatientAppointments = async (req, res) => {
  const id = Number(req.params.id);

  // Prüfe, ob die ID eine gültige positive Zahl ist.
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      error: "Ungültige Patienten-ID",
    });
  }

  const patient = await prisma.patient.findUnique({
    where: { id },
    include: {
      appointments: true,
    },
  });

  if (!patient) {
    return res.status(404).json({
      error: "Patient nicht gefunden",
    });
  }

  return res.status(200).json(patient.appointments);
};
