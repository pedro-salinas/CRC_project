import Client from "../models/client.model.js";
import Attention from "../models/attention.model.js";
import { ObjectId } from "mongodb";

export const getClients = async (req, res) => {
    try {
        const clients = await Client.find();
        return res.json(clients);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

export const createClient = async (req, res) => {
    try {
        const { name, rut, email, phone } = req.body;

        const existingClient = await Client.findOne({ rut });

        const newClient = new Client({
            name,
            rut,
            email,
            phone,
        });

        const savedClient = await newClient.save();
        return res.json(savedClient);
    } catch (error) {
        return res
            .status(500)
            .json({ message: error, clientID: existingClient._id });
    }
};

export const updateClient = async (req, res) => {
    try {
        const client = await Client.findByIdAndUpdate(
            req.params._id,
            req.body,
            {
                new: true,
            }
        );
        if (!client)
            return res.status(404).json({ message: "Cliente no encontrado" });
        return res.json(client);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

export const deleteClient = async (req, res) => {
    try {
        const objectId = new ObjectId(req.params._id);
        const hasRelatedAttentions = await Attention.exists({
            client: objectId,
        });

        if (hasRelatedAttentions) {
            return res.status(400).json({
                message: [
                    "name",
                    "No se puede eliminar el paciente porque está asociado a una o más atenciones",
                ],
            });
        }

        const client = await Client.findByIdAndDelete(req.params._id);

        if (!client)
            return res.status(404).json({ message: "Cliente no encontrado" });
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};
