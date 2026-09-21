// Importiere Zod.
import { z } from "zod";

// Schema für neue Patientendaten.
export const patientSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  birthDate: z.coerce.date(),
});
// Schema für die Aktualisierung eines Patienten.
// Bei PATCH sind alle Felder optional.
export const patientUpdateSchema = patientSchema.partial();
