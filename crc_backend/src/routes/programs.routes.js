import { Router } from "express";
import {
    getPrograms,
    createProgram,
    updateProgram,
    deleteProgram,
} from "../controllers/programs.controller.js";
import { authRequired, authStaff } from "../middlewares/validateUtils.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { createProgramSchema } from "../schemas/program.schema.js";

const router = Router();

// Obtener todos los programas
router.get("/programs", getPrograms);
// Ingresar un programa
router.post(
    "/program",
    authRequired,
    authStaff,
    validateSchema(createProgramSchema),
    createProgram
);
// Editar un programa
router.put(
    "/program/:_id",
    authRequired,
    authStaff,
    validateSchema(createProgramSchema),
    updateProgram
);
//Eliminar un programa
router.delete("/program/:_id", authRequired, authStaff, deleteProgram);

export default router;
