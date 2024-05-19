import Program from "../models/program.model.js";
import Attention from "../models/attention.model.js";
import { ObjectId } from "mongodb";

export const getPrograms = async (req, res) => {
    try {
        const programs = await Program.find();
        res.json(programs);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const createProgram = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            on_sale_price,
            on_sale,
            visible,
            agenda,
        } = req.body;

        const newProgram = new Program({
            name,
            description,
            price,
            on_sale_price,
            on_sale,
            visible,
            agenda,
        });

        const savedProgram = await newProgram.save();
        res.json(savedProgram);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const updateProgram = async (req, res) => {
    try {
        const program = await Program.findByIdAndUpdate(
            req.params._id,
            req.body,
            {
                new: true,
            }
        );
        if (!program)
            return res.status(404).json({ message: "Programa no encontrado" });
        res.json(program);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const deleteProgram = async (req, res) => {
    try {
        const objectId = new ObjectId(req.params._id);
        const hasRelatedAttentions = await Attention.exists({
            program: objectId,
        });

        if (hasRelatedAttentions) {
            return res.status(400).json({
                message: [
                    "name",
                    "No se puede eliminar el programa porque está asociado a una o más atenciones",
                ],
            });
        }

        const program = await Program.findByIdAndDelete(req.params._id);
        if (!program)
            return res.status(404).json({ message: "Programa no encontrado" });
        return res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};
