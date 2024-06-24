import { z } from "zod";

export const createClientSchema = z.object({
    rut: z
        .string({
            required_error: "Se requiere un RUT",
        })
        .max(50, {
            message: ["rut", "RUT debe contener un máximo de 50 caracteres"],
        })
        .min(5, {
            message: ["rut", "RUT debe contener un minimo de 5 caracteres"],
        }),
    name: z
        .string({
            required_error: "Se requiere un nombre",
        })
        .max(100, {
            message: ["name", "Nombre muy largo"],
        })
        .min(5, {
            message: ["name", "Nombre muy corto"],
        }),
    email: z
        .string({
            required_error: "Se requiere un email",
        })
        .email({
            message: ["email", "Email no válido"],
        })
        .max(100, {
            message: ["email", "Email muy largo"],
        })
        .min(5, {
            message: "Email muy corto",
        }),
    phone: z
        .string({
            required_error: "Se requiere un teléfono",
        })
        .max(11, {
            message: ["phone", "Teléfono muy largo"],
        })
        .min(9, {
            message: ["phone", "Teléfono muy corto"],
        }),
});
