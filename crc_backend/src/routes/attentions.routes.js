import { Router } from "express";
import {
    getAttentions,
    getAttentionsByDate,
    getAttention,
    createAttention,
    createMultiplesAttentions,
    createAttentionByWeb,
    updateAttention,
    deleteAttention,
} from "../controllers/attentions.controller.js";
import { authRequired, authStaff } from "../middlewares/validateUtils.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import {
    createAttentionSchema,
    getAttentionsByDateSchema,
} from "../schemas/attention.schema.js";

const router = Router();

// Obtener todas las atenciones
router.get("/attentions", getAttentions);
// Obtener atenciones para una fecha en concreto
router.post(
    "/attentions_date",
    validateSchema(getAttentionsByDateSchema),
    getAttentionsByDate
);
// Obtener una atencion (En este caso es importante para poder obtener horas puntuales que interfieran tomar ciertas horas)
router.get("/attention/:_id", getAttention);
// Ingresar una atencion
router.post(
    "/attention",
    authRequired,
    authStaff,
    validateSchema(createAttentionSchema),
    createAttention
);
// Ingresar multiples atenciones
router.post(
    "/attentions_blocked",
    authRequired,
    authStaff,
    validateSchema(createAttentionSchema),
    createMultiplesAttentions
);

// Editar una atencion
router.put(
    "/attention/:_id",
    authRequired,
    authStaff,
    validateSchema(createAttentionSchema),
    updateAttention
);
//Eliminar una atencion
router.delete("/attention/:_id", authRequired, authStaff, deleteAttention);

// Ingresar una atencion por la pagina web y pagar

// Falta aplica el envio dle correo y efectuar el pago

/*****************************************************************/
// router.post(
//     "/attentionweb",
//     validateSchema(createAttentionSchema),
//     createAttentionByWeb
// );
/*****************************************************************/

export default router;
