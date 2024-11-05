import { z } from "zod";

const validSpecialty = z.enum(["Kinesiología", "Nutrición", "Psicología"], {
    required_error: ["specialty", "Especialidad incorrecta"],
});

export const createProgramSchema = z.object({
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
    price: z
        .number({
            required_error: "Se requiere un precio",
        })
        .int({
            message: ["price", "Precio debe ser un valor entero"],
        })
        .positive({
            message: ["price", "Precio debe ser un valor positivo"],
        }),
    on_sale_price: z
        .number({
            required_error: "Se requiere precio de oferta",
        })
        .int({
            message: [
                "on_sale_price",
                "El precio de oferta debe ser un valor entero",
            ],
        })
        .positive({
            message: [
                "on_sale_price",
                "El precio de oferta debe ser un valor positivo",
            ],
        }),
    on_sale: z.boolean({
        required_error: "Se requiere saber si está en oferta o no",
    }),
    visible: z.boolean({
        required_error:
            "Se requiere saber si está visible en la pagina web o no",
    }),
    agenda: z.boolean({
        required_error: "Se requiere saber si esta disponible para agendar",
    }),
    specialty: validSpecialty,
});
