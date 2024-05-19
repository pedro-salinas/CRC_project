import { Router } from "express";
import {
    getClients,
    createClient,
    updateClient,
    deleteClient,
} from "../controllers/clients.controller.js";
import {
    authRequired,
    authStaff,
    authRut,
} from "../middlewares/validateUtils.js";
import { normalizeRut, normalizeEmail } from "../middlewares/normalizeUtils.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { createClientSchema } from "../schemas/client.schema.js";

const router = Router();

// Obtener todos los clientes
router.get("/clients", authRequired, authStaff, getClients);
// Ingresar un cliente
router.post(
    "/client",
    authRequired,
    authStaff,
    authRut,
    normalizeRut,
    normalizeEmail,
    validateSchema(createClientSchema),
    createClient
);
// Editar un cliente
router.put(
    "/client/:_id",
    authRequired,
    authStaff,
    authRut,
    normalizeRut,
    normalizeEmail,
    validateSchema(createClientSchema),
    updateClient
);
//Eliminar un cliente
router.delete("/client/:_id", authRequired, authStaff, deleteClient);

export default router;
