import { z } from "zod";

const validState = z.enum(
    ["pendiente", "pagado", "pagando", "cancelado", "bloqueado"],
    {
        required_error: [
            ["state", "Estado debe ser pendiente, pagado, pagando o cancelado"],
        ],
    }
);

const validPrevision = z.enum(["Fonasa", "Isapre"], {
    required_error: ["prevision", "Previsión incorrecta"],
});

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
    description: z
        .string({
            required_error: "Se requiere una descripción",
        })
        .max(500, {
            message: [
                "description",
                "Descripción debe tener un máximo de 500 caracteres",
            ],
        }),
});

export const createAttentionSchemaWeb = z.object({
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
    state: validState,
    blocked: z.boolean({
        required_error: [
            "blocked",
            "Se requiere saber si la hora esta bloqueada o no",
        ],
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
    web_client: z.object({
        rut: z
            .string({
                required_error: "Se requiere un RUT",
            })
            .max(50, {
                message: [
                    "rut",
                    "RUT debe contener un máximo de 50 caracteres",
                ],
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
                message: ["email", "Email muy corto"],
            }),
        phone: z
            .string({
                required_error: "Se requiere un teléfono",
            })
            .max(8, {
                message: ["phone", "Teléfono muy largo"],
            })
            .min(8, {
                message: ["phone", "Teléfono muy corto"],
            }),
        price: z
            .number({
                required_error: "Se requiere un precio",
            })
            .int({
                message: ["price", "Precio debe ser un valor entero"],
            })
            .gte(1, {
                message: ["price", "Precio debe ser mayor o igual a 1"],
            })
            .lte(999999, {
                message: ["price", "Día debe ser menos o igual a 999999"],
            }),
        prevision: validPrevision,
    }),
    description: z
        .string({
            required_error: "Se requiere una descripción",
        })
        .max(500, {
            message: [
                "description",
                "Descripción debe tener un máximo de 500 caracteres",
            ],
        }),
});

export const getAttentionsByDateSchema = z.object({
    startDay: z
        .number({
            required_error: "Se requiere un día de inicio",
        })
        .int({
            message: ["day", "Día debe ser un valor entero"],
        })
        .gte(1, {
            message: ["day", "Día debe ser mayor o igual a 1"],
        })
        .lte(31, {
            message: ["day", "Día debe ser menos o igual a 31"],
        }),

    endDay: z
        .number({
            required_error: "Se requiere un día final",
        })
        .int({
            message: ["day", "Día debe ser un valor entero"],
        })
        .gte(1, {
            message: ["day", "Día debe ser mayor o igual a 1"],
        })
        .lte(31, {
            message: ["day", "Día debe ser menos o igual a 31"],
        }),
    startMonth: z
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
    endMonth: z
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
    startYear: z
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
    endYear: z
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
});
