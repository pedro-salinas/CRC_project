import Attention from "../models/attention.model.js";
import Client from "../models/client.model.js";
import { sendAttentionEmail } from "../libs/mailer.js";
// import { sendWhatsAppMessage } from "../libs/wsp.js";

function formatHourAndDate(hour, day, month, year) {
    const textHour = `${String(hour).padStart(2, "0")}:00 hrs`;
    const textDate = `${String(day).padStart(2, "0")}/${String(month).padStart(
        2,
        "0"
    )}/${year}`;

    return { textHour, textDate };
}

export const getAttentions = async (req, res) => {
    try {
        const attentions = await Attention.find().populate([
            "program",
            "kine",
            "client",
        ]);
        res.json(attentions);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const getAttentionsByDate = async (req, res) => {
    try {
        const { startYear, endYear, startMonth, endMonth, startDay, endDay } =
            req.body;

        const query = {
            $and: [
                { year: { $gte: startYear, $lte: endYear } },
                { month: { $gte: startMonth, $lte: endMonth } },
                { day: { $gte: startDay, $lte: endDay } },
            ],
        };

        // Ajustar el rango para cubrir la lógica correctamente:
        // Si el rango de años incluye años completos, los meses y días no deben restringir esos años completos
        if (startYear === endYear) {
            // Dentro del mismo año
            if (startMonth === endMonth) {
                // Dentro del mismo mes
                query.year = startYear;
                query.month = startMonth;
                query.day = { $gte: startDay, $lte: endDay };
            } else {
                // Meses diferentes dentro del mismo año
                query.year = startYear;
                query.$and = [
                    {
                        $or: [
                            { month: { $gte: startMonth } },
                            { month: { $lte: endMonth } },
                        ],
                    },
                    {
                        $or: [
                            { day: { $gte: startDay } },
                            { day: { $lte: endDay } },
                        ],
                    },
                ];
            }
        } else {
            // Años diferentes
            query.$and = [
                {
                    $or: [
                        { year: { $eq: startYear } },
                        { year: { $eq: endYear } },
                        { year: { $gte: startYear, $lte: endYear } },
                    ],
                },
                {
                    $or: [
                        { month: { $gte: startMonth } },
                        { month: { $lte: endMonth } },
                    ],
                },
                {
                    $or: [
                        { day: { $gte: startDay } },
                        { day: { $lte: endDay } },
                    ],
                },
            ];
        }

        const attentions = await Attention.find(query).populate([
            "program",
            "kine",
            "client",
        ]);

        console.log(attentions);

        res.json(attentions);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const getAttention = async (req, res) => {
    try {
        const attention = await Attention.findById(req.params._id).populate([
            "program",
            "kine",
            "client",
        ]);
        if (!attention)
            return res.status(404).json({ message: "Atención no encontrada" });
        res.json(attention);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const createAttention = async (req, res) => {
    try {
        const {
            hour,
            day,
            month,
            year,
            program,
            kine,
            client,
            buy_code,
            token,
            state,
            blocked,
            description,
        } = req.body;

        const existingAttention = await Attention.findOne({
            day,
            month,
            year,
            blocked: true,
        });

        if (existingAttention && !blocked) {
            return res.status(400).json({
                message: ["date", "Esta fecha se encuentra bloqueada"],
            });
        }

        const newAttention = new Attention({
            hour,
            day,
            month,
            year,
            program,
            kine,
            client,
            buy_code,
            token,
            state,
            blocked,
            description,
        });

        const savedAttention = await newAttention.save();
        res.json(savedAttention);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const createMultiplesAttentions = async (req, res) => {
    try {
        const {
            program,
            kine,
            client,
            buy_code,
            token,
            state,
            blocked,
            description,
            allDates,
        } = req.body;

        if (!allDates) {
            return res.status(400).json({
                message: ["repeats", "Algo salió mal con este valor"],
            });
        }

        for (const [day, month, year, hour] of allDates) {
            const existingAttention = await Attention.findOne({
                day,
                month,
                year,
                blocked: true,
            });

            if (existingAttention && !blocked) {
                return res.status(400).json({
                    message: [
                        "date",
                        "Se encontró un dia bloqueado al usar esta fecha",
                    ],
                });
            }
        }

        for (const [day, month, year, hour] of allDates) {
            const newAttention = new Attention({
                hour: hour,
                day: day,
                month: month,
                year: year,
                program,
                kine,
                client,
                buy_code,
                token,
                state,
                blocked,
                description,
            });

            const savedAttention = await newAttention.save();
        }

        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

// export const askAttentionWeb = async (req, res) => {
//     try {
//         const { rut } = req.params.rut;

//         const result = await Attention.findOne({
//             rut: rut,
//         });

//         if (result.web_client) {
//             res.sendStatus(403);
//         }

//         res.sendStatus(200);
//     } catch (error) {
//         res.status(500).json({ message: error });
//     }
// };

export const createAttentionByWeb = async (req, res) => {
    try {
        const {
            rut,
            email,
            hour,
            day,
            month,
            year,
            program,
            state,
            web_client,
            blocked,
            description,
            specialty,
        } = req.body;

        web_client.rut = rut;
        web_client.email = email;

        const result = await Attention.findOne({
            "web_client.rut": web_client.rut,
            kine: { $exists: false },
        });

        if (result) {
            return res.status(400).json({
                message: ["rut", "Ya existe una atención asociada a este RUT"],
            });
        }

        const result2 = await Attention.findOne({
            "web_client.email": web_client.email,
            kine: { $exists: false },
        });

        if (result2) {
            return res.status(400).json({
                message: [
                    "email",
                    "Ya existe una atención asociada a este correo",
                ],
            });
        }

        const result3 = await Attention.findOne({
            "web_client.phone": web_client.phone,
            kine: { $exists: false },
        });

        if (result3) {
            return res.status(400).json({
                message: [
                    "phone",
                    "Ya existe una atención asociada a este teléfono",
                ],
            });
        }

        const checkDate = await Attention.findOne({
            hour: req.body.hour,
            day: req.body.day,
            month: req.body.month,
            year: req.body.year,
        });

        if (checkDate) {
            return res.status(400).json({
                message: [
                    "hour",
                    "Ya existe una atención en la hora seleccionada, vuelva atras y seleccione otra",
                ],
            });
        }

        const { textHour, textDate } = formatHourAndDate(
            hour,
            day,
            month,
            year
        );

        const dataMail = {
            name: web_client.name,
            email: web_client.email,
            date: textDate,
            hour: textHour,
            specialty: specialty,
        };

        const sendMail = await sendAttentionEmail(dataMail);

        const dataWsp = {
            name: web_client.name,
            date: textDate,
            hour: textHour,
            specialty: specialty,
            phone: web_client.phone,
        };

        // const sendWsp = await sendWhatsAppMessage(dataWsp);

        const client = await Client.findOne({ rut: rut });

        const newAttention = new Attention({
            hour,
            day,
            month,
            year,
            program,
            state,
            web_client,
            blocked,
            description,
            client: client ? client._id : null,
        });

        const savedAttention = await newAttention.save();

        res.json(savedAttention);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
};

export const updateAttention = async (req, res) => {
    try {
        const attention = await Attention.findByIdAndUpdate(
            req.params._id,
            req.body,
            {
                new: true,
            }
        );
        if (!attention)
            return res.status(404).json({ message: "Atención no encontrada" });
        res.json(attention);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const deleteAttention = async (req, res) => {
    try {
        const attention = await Attention.findByIdAndDelete(req.params._id);
        if (!attention)
            return res.status(404).json({ message: "Atención no encontrada" });
        return res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};
