import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET, URL_FRONTEND } from "../config.js";
import { sendConfirmEmail } from "../libs/mailer.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.json(users);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

export const getCurrentUser = async (req, res) => {
    try {
        const userFound = await User.findById(req.user._id);

        if (!userFound)
            return res.status(400).json({ message: "Usuario no encontrado" });

        return res.json(userFound);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

export const insertUser = async (req, res) => {
    try {
        console.log("hol soy goku");

        const { email, rut, name, password, phone, staff } = req.body;

        const hash = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            rut,
            name,
            password: hash,
            phone,
            is_staff: staff,
        });

        const userSaved = await newUser.save();

        const link = URL_FRONTEND + "/confirm?id=" + userSaved._id;

        const data = {
            name: userSaved.name,
            link: link,
            email: userSaved.email,
        };
        const sendMail = await sendConfirmEmail(data);

        return res.json(userSaved);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { email, rut, name, phone, password, is_staff, is_admin } =
            req.body;

        delete req.body.password2;

        if (req.body.password) {
            req.body.password = await bcrypt.hash(password, 10);
        } else {
            delete req.body.password;
        }

        const userFound = await User.findByIdAndUpdate(
            req.params._id,
            req.body,
            {
                new: true,
            }
        );

        if (!userFound)
            return res.status(404).json({ message: "Usuario no encontrado" });
        return res.json(userFound);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

export const updateCurrentUser = async (req, res) => {
    try {
        const { email, rut, name, password, phone, is_staff } = req.body;

        delete req.body.password2;

        if (req.body.password) {
            req.body.password = await bcrypt.hash(password, 10);
        } else {
            delete req.body.password;
        }

        const userFound = await User.findByIdAndUpdate(req.body._id, req.body, {
            new: true,
        });

        if (!userFound)
            return res.status(400).json({ message: "Usuario no encontrado" });

        return res.json(userFound);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params._id);
        if (!user) return res.status(404).json({ message: "User not found" });
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userFound = await User.findOne({ email });

        if (!userFound) {
            return res.status(400).json({
                message: ["email", "Correo electrónico no registrado"],
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            userFound.password
        );

        if (!passwordMatch) {
            return res.status(400).json({
                message: ["password", "Contraseña incorrecta"],
            });
        }

        const token = await createAccessToken({ _id: userFound._id });

        const time = Date.now();

        const user = await User.findByIdAndUpdate(
            userFound._id,
            { last_login: time },
            {
                new: true,
            }
        );

        res.cookie("token", token);
        return res.json(user);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("token", "", {
            expires: new Date(0),
        });
        return res.sendStatus(200);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

export const verifyToken = async (req, res) => {
    try {
        const { token } = req.cookies;

        if (!token) return res.status(401).json({ message: "No autorizado" });

        jwt.verify(token, TOKEN_SECRET, async (err, user) => {
            if (err) return res.status(401).json({ message: "No autorizado" });

            const userFound = await User.findById(user._id);

            if (!userFound)
                return res.status(401).json({ message: "No autorizado" });

            const token = await createAccessToken({ _id: userFound._id });

            res.cookie("token", token);
            return res.json(userFound);
        });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

export const confirmUser = async (req, res) => {
    try {
        const userFound = await User.findById(req.params._id);

        if (!userFound)
            return res.status(400).json({ message: "Usuario no encontrado" });

        if (userFound.last_login)
            return res
                .status(400)
                .json({ message: "Usuario ya confirmó su correo electrónico" });

        const time = Date.now();

        const user = await User.findByIdAndUpdate(
            userFound._id,
            { last_login: time },
            {
                new: true,
            }
        );

        return res.json(user);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

// Ingresar usuario por defecto No express, res no es necesario
export const defaultAdminUser = async (req, res) => {
    try {
        const rut = "11111111-1";

        const userFound = await User.findOne({ rut });

        if (!userFound) {
            const hash = await bcrypt.hash("123", 10);

            const newUser = new User({
                email: "admin@admin.admin",
                rut: "11111111-1",
                name: "Admin",
                password: hash,
                phone: "123456789",
                last_login: new Date(),
                is_staff: true,
                is_admin: true,
            });

            const userSaved = await newUser.save();

            console.log("Usuario admin agregado exitosamente");
        }
    } catch (error) {
        console.log(error);
    }
};
