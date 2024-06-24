import { Router } from "express";
import {
    getProfiles,
    createProfile,
    updateProfile,
    deleteProfile,
} from "../controllers/profiles.controller.js";
import { authRequired, authStaff } from "../middlewares/validateUtils.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { createProfileSchema } from "../schemas/profile.schema.js";

const router = Router();

// Obtener todos los perfiles
router.get("/profiles", authRequired, authStaff, getProfiles);
// Ingresar un perfil
router.post(
    "/profile",
    authRequired,
    authStaff,
    validateSchema(createProfileSchema),
    createProfile
);
// Editar un perfil
router.put(
    "/profile/:_id",
    authRequired,
    authStaff,
    validateSchema(createProfileSchema),
    updateProfile
);
//Eliminar un perfil
router.delete("/profile/:_id", authRequired, authStaff, deleteProfile);

export default router;
