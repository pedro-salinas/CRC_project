import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
import User from "../models/user.model.js";

export const authRequired = (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res
                .status(401)
                .json({ message: "No hay token, autorización denegada" });
        }

        jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
            if (err)
                return res.status(403).json({ message: "Token no válido" });

            req.user = decoded;

            next();
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const authRut = (req, res, next) => {
    try {
        let { rut } = req.body;

        if (!/^[0-9.]+[-]?[0-9kK]{1}/.test(rut)) {
            return res.status(400).json({ message: ["rut", "RUT incorrecto"] });
        }

        rut = rut.replace(/[\.\-]/gi, "");
        const dv = rut.slice(-1);
        const numero = rut.slice(0, -1);
        let i = 2;
        let suma = 0;

        [...numero].reverse().forEach((v) => {
            if (i === 8) {
                i = 2;
            }
            suma += parseInt(v, 10) * i;
            i++;
        });

        let dvr = 11 - (suma % 11);

        if (dvr === 11) {
            dvr = 0;
        }
        if (dvr === 10) {
            dvr = "K";
        }

        if (dvr == dv.toUpperCase()) {
            next();
        } else {
            return res.status(400).json({ message: ["rut", "RUT incorrecto"] });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const authStaff = async (req, res, next) => {
    try {
        if (req.user !== undefined) {
            const user = await User.findById(req.user._id);
            if (!user)
                return res
                    .status(404)
                    .json({ message: "Usuario no encontrado" });
            if (!user.is_staff)
                return res
                    .status(403)
                    .json({ message: "Usuario necesita ser staff" });

            next();
        } else {
            return res
                .status(403)
                .json({ message: "Se necesita iniciar sesión" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const authAdmin = async (req, res, next) => {
    try {
        if (req.user !== undefined) {
            const user = await User.findById(req.user._id);
            if (!user)
                return res
                    .status(404)
                    .json({ message: "Usuario no encontrado" });
            if (!user.is_admin)
                return res
                    .status(403)
                    .json({ message: "Usuario necesita ser admin" });

            next();
        } else {
            return res
                .status(403)
                .json({ message: "Se necesita iniciar sesión" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const confirmEmail = async (req, res, next) => {
    try {
        const { email } = req.body;

        const userFound = await User.findOne({ email });

        if (!userFound) {
            return res
                .status(400)
                .json({ message: ["email", "Usuario no encontrado"] });
        }

        if (userFound.last_login == null) {
            return res.status(403).json({
                message: [
                    "email",
                    "Necesitas verificar tu correo electrónico antes de iniciar sesión",
                ],
            });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
