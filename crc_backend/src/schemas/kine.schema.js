import { z } from "zod";

export const createKineSchema = z.object({
    name: z
        .string({
            required_error: ["name", "Se requiere un nombre"],
        })
        .max(100, {
            message: ["name", "Nombre muy largo"],
        })
        .min(5, {
            message: ["name", "Nombre muy corto"],
        }),
    color: z
        .string({
            required_error: ["color", "Se requiere un color"],
        })
        .max(50, {
            message: ["color", "Color debe contener como máximo 50 caracteres"],
        })
        .min(5, {
            message: ["color", "Color debe contener como mínimo 5 caracteres"],
        }),
});
