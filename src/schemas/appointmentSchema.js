// Importiere Zod.
import { z } from "zod";

// Schema für neue Termindaten.
export const appointmentSchema = z.object({
  date: z.coerce.date(),
  reason: z.string().min(3),
  patientId: z.number().int().positive(),
});
