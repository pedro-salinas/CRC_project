import { Router } from "express";
import {
    getKines,
    createKine,
    updateKine,
    deleteKine,
} from "../controllers/kines.controller.js";
import { authRequired, authStaff } from "../middlewares/validateUtils.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { createKineSchema } from "../schemas/kine.schema.js";

const router = Router();

// Obtener todos los kines
router.get("/kines", authRequired, authStaff, getKines);
// Ingresar un kine
router.post(
    "/kine",
    authRequired,
    authStaff,
    validateSchema(createKineSchema),
    createKine
);
// Editar un kine
router.put(
    "/kine/:_id",
    authRequired,
    authStaff,
    validateSchema(createKineSchema),
    updateKine
);
//Eliminar un kine
router.delete("/kine/:_id", authRequired, authStaff, deleteKine);

export default router;
