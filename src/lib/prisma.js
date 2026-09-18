// Importiere den Prisma Client.
import { PrismaClient } from "@prisma/client";

// Erstelle eine Prisma-Client-Instanz.
const prisma = new PrismaClient();

// Exportiere Prisma für andere Module.
export default prisma;
