import { z } from "zod";

export const registerSchema = z.object({
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
            message: ["email", "Email muy corto"],
        }),
    rut: z.string({
        required_error: "Se requiere un RUT",
    }),
    name: z
        .string({
            required_error: "Se requiere un nombre",
        })
        .max(100, {
            message: ["name", "Nombre muy largo"],
        })
        .min(2, {
            message: ["name", "Nombre muy corto"],
        }),
    password: z
        .string({
            required_error: "Se requiere una contraseña",
        })
        .max(20, {
            message: ["password", "Contraseña muy larga"],
        })
        .min(5, {
            message: ["password", "Contraseña muy corta"],
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
    is_staff: z.boolean({
        required_error: [
            "is_staff",
            "Se requiere saber si el usuario es staff",
        ],
    }),
});

// Necesario unica y exclusivamente para que no joda cuando la contraseña esta vacia
export const updateSchema = z.object({
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
            message: ["email", "Email muy corto"],
        }),
    rut: z.string({
        required_error: "Se requiere un RUT",
    }),
    name: z
        .string({
            required_error: "Se requiere un nombre",
        })
        .max(100, {
            message: ["name", "Nombre muy largo"],
        })
        .min(2, {
            message: ["name", "Nombre muy corto"],
        }),
    password: z
        .string({
            required_error: "Se requiere una contraseña",
        })
        .max(20, {
            message: ["password", "Contraseña muy larga"],
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
    is_staff: z.boolean({
        required_error: [
            "is_staff",
            "Se requiere saber si el usuario es staff",
        ],
    }),
});

export const loginSchema = z.object({
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
            message: ["email", "Email muy corto"],
        })
        .toLowerCase(),
});
