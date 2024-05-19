import Attention from "../models/attention.model.js";

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
            });

            const savedAttention = await newAttention.save();
        }

        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const createAttentionByWeb = async (req, res) => {
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
        } = req.body;

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
                    "Ya existe una atención en la hora seleccionada",
                ],
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
        });

        const savedAttention = await newAttention.save();

        res.json(savedAttention);
    } catch (error) {
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
