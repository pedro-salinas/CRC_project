import Kine from "../models/kine.model.js";
import Attention from "../models/attention.model.js";
import { ObjectId } from "mongodb";

export const getKinesInfo = async (req, res) => {
    try {
        const kines = await Kine.find().select("_id name specialty");
        return res.json(kines);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

export const getKines = async (req, res) => {
    try {
        const kines = await Kine.find();
        return res.json(kines);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

export const createKine = async (req, res) => {
    try {
        const { name, color, specialty } = req.body;

        const newKine = new Kine({
            name,
            color,
            specialty,
        });

        const savedKine = await newKine.save();
        return res.json(savedKine);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

export const updateKine = async (req, res) => {
    try {
        const kine = await Kine.findByIdAndUpdate(req.params._id, req.body, {
            new: true,
        });
        if (!kine)
            return res
                .status(404)
                .json({ message: "Profesional no encontrado" });
        return res.json(kine);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

export const deleteKine = async (req, res) => {
    try {
        const objectId = new ObjectId(req.params._id);
        const hasRelatedAttentions = await Attention.exists({
            kine: objectId,
        });

        if (hasRelatedAttentions) {
            return res.status(400).json({
                message: [
                    "name",
                    "No se puede eliminar el profesional porque está asociado a una o más atenciones",
                ],
            });
        }

        const kine = await Kine.findByIdAndDelete(req.params._id);

        if (!kine)
            return res
                .status(404)
                .json({ message: "Profesional no encontrado" });
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};
