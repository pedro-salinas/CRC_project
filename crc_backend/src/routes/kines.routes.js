import { Router } from "express";
import {
    getKinesInfo,
    getKines,
    createKine,
    updateKine,
    deleteKine,
} from "../controllers/kines.controller.js";
import { authRequired, authStaff } from "../middlewares/validateUtils.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { createKineSchema } from "../schemas/kine.schema.js";

const router = Router();

// Obtener todos los nombres de los especialistas
router.get("/kines_info", getKinesInfo);
// Obtener todos los especialistas
router.get("/kines", authRequired, authStaff, getKines);
// Ingresar un especialista
router.post(
    "/kine",
    authRequired,
    authStaff,
    validateSchema(createKineSchema),
    createKine
);
// Editar un especialista
router.put(
    "/kine/:_id",
    authRequired,
    authStaff,
    validateSchema(createKineSchema),
    updateKine
);
//Eliminar un especialista
router.delete("/kine/:_id", authRequired, authStaff, deleteKine);

export default router;
