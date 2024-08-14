import { Router } from "express";
import {
    getUsers,
    insertUser,
    updateUser,
    deleteUser,
    getCurrentUser,
    login,
    logout,
    updateCurrentUser,
    verifyToken,
    confirmUser,
} from "../controllers/users.controller.js";
import {
    authRequired,
    authRut,
    authStaff,
    authAdmin,
    confirmEmail,
} from "../middlewares/validateUtils.js";
import { normalizeRut, normalizeEmail } from "../middlewares/normalizeUtils.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import {
    registerSchema,
    loginSchema,
    updateSchema,
} from "../schemas/user.schema.js";

const router = Router();

// Funcionalidades tipo CRUD, eliminación no implementada (no tiene sentido eliminar usuarios)

// Obtener todos los usuarios
router.get("/users", authRequired, authStaff, getUsers);
// // Obtener un usuario
// router.get("/user/:_id", authRequired, authStaff, getUser);
// Ingresar (registrar) un usuario
router.post(
    "/user",
    authRequired,
    validateSchema(registerSchema),
    normalizeRut,
    authRut,
    normalizeEmail,
    insertUser
);
// Editar un usuario
router.put(
    "/user/:_id",
    validateSchema(updateSchema),
    normalizeRut,
    authRut,
    normalizeEmail,
    authRequired,
    authAdmin,
    updateUser
);

// Editar usuario actual
router.put(
    "/user",
    validateSchema(updateSchema),
    normalizeRut,
    authRut,
    normalizeEmail,
    authRequired,
    updateCurrentUser
);
// // Eliminar un usuario
router.delete("/user/:_id", authRequired, authAdmin, deleteUser);

// Funcionalidades de usabilidad

// Obtener usuario actual
router.get("/user", authRequired, getCurrentUser);

// Login de usuario
router.post(
    "/login",
    validateSchema(loginSchema),
    normalizeEmail,
    confirmEmail,
    login
);

// Logout de usuario
router.get("/logout", logout);

// Verificar token
router.get("/verify", verifyToken);

// Confirmar correo
router.get("/confirm/:_id", confirmUser);

export default router;
