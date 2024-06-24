import { z } from "zod";

export const createProfileSchema = z.object({
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
    variables: z
        .array(z.string(), {
            required_error: ["variables", "Se requiere un nombre"],
        })
        .min(1, {
            message: ["variables", "Debe haber al menos 1 variable"],
        })
        .max(10, {
            message: ["variables", "Solo 10 variables como máximo"],
        }),
});
