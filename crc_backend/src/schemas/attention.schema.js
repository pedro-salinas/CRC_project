import { z } from "zod";

const validState = z.enum(
    ["pendiente", "pagado", "pagando", "cancelado", "bloqueado"],
    {
        required_error:
            "Estado debe ser pendiente, pagado, pagando o cancelado",
    }
);

export const createAttentionSchema = z.object({
    hour: z
        .number({
            required_error: "Se requiere una hora",
        })
        .int({
            message: ["hour", "Hora debe ser una valor entero"],
        })
        .gte(0, {
            message: ["hour", "Hora debe ser igual o mayor a 0"],
        })
        .lte(23, {
            message: ["hour", "Hora debe ser menor o igual 23"],
        }),
    day: z
        .number({
            required_error: "Se requiere un día",
        })
        .int({
            message: ["day", "Día debe ser un valor entero"],
        })
        .gte(1, {
            message: ["day", "Day must be greater o equal to 1"],
        })
        .lte(31, {
            message: ["day", "Día debe ser menos o igual a 31"],
        }),
    month: z
        .number({
            required_error: "Se requiere un mes",
        })
        .int({
            message: ["month", "Mes debe ser un valor entero"],
        })
        .gte(1, {
            message: ["month", "Mes debe ser un valor mayor o igual a 1"],
        })
        .lte(12, {
            message: ["month", "Mes debe ser un valor menos o igual a 12"],
        }),
    year: z
        .number({
            required_error: "Se equiere un año",
        })
        .int({
            message: ["year", "Año debe ser un valor entero"],
        })
        .gte(0, {
            message: ["year", "Año debe ser un valor mayor o igual a 0"],
        })
        .lte(9999, {
            message: ["year", "Año debe ser un valor menor o igual a 9999"],
        }),
    program: z
        .string({
            required_error: "Se requiere un programa",
        })
        .max(100, {
            message: [
                "program",
                "Programa debe contener un máximo de 100 caracteres",
            ],
        })
        .min(5, {
            message: [
                "program",
                "Programa debe contener un mínimo de 5 caracteres",
            ],
        }),
    kine: z
        .string({
            required_error: "Se requiere un kinesiólogo",
        })
        .max(100, {
            message: [
                "kine",
                "Kinesiólogo debe contener un máximo de 100 caracteres",
            ],
        })
        .min(5, {
            message: [
                "kine",
                "Kinesiólogo debe contener un mínimo de 5 caracteres",
            ],
        }),
    client: z
        .string({
            required_error: "Se requiere un cliente",
        })
        .max(100, {
            message: [
                "client",
                "Cliente debe contener un máximo de 100 caracteres",
            ],
        })
        .min(5, {
            message: [
                "client",
                "Cliente debe contener un mínimo de 5 caracteres",
            ],
        }),
    state: validState,
    blocked: z.boolean({
        required_error: [
            "blocked",
            "Se requiere saber si la hora esta bloqueada o no",
        ],
    }),
});

export const updateAttentionSchema = z.object({
    program: z
        .string({
            required_error: "Se requiere un programa",
        })
        .max(100, {
            message: [
                "program",
                "Programa debe contener un máximo de 100 caracteres",
            ],
        })
        .min(5, {
            message: [
                "program",
                "Programa debe contener un mínimo de 5 caracteres",
            ],
        }),
    kine: z
        .string({
            required_error: "Se requiere un kinesiólogo",
        })
        .max(100, {
            message: [
                "kine",
                "Kinesiólogo debe contener un máximo de 100 caracteres",
            ],
        })
        .min(5, {
            message: [
                "kine",
                "Kinesiólogo debe contener un mínimo de 5 caracteres",
            ],
        }),
    client: z
        .string({
            required_error: "Se requiere un cliente",
        })
        .max(100, {
            message: [
                "client",
                "Cliente debe contener un máximo de 100 caracteres",
            ],
        })
        .min(5, {
            message: [
                "client",
                "Cliente debe contener un mínimo de 5 caracteres",
            ],
        }),
    state: validState,
});
