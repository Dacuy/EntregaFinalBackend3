import { usersService } from "../services/index.js";
import { createHash, passwordValidation } from "../utils/index.js";
import jwt from 'jsonwebtoken';
import UserDTO from '../dto/User.js';

const register = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        if (!first_name || !last_name || !email || !password) return res.status(400).send({ status: "error", error: "Incomplete values" });
        const exists = await usersService.getUserByEmail(email);
        if (exists) return res.status(400).send({ status: "error", error: "User already exists" });
        const hashedPassword = await createHash(password);
        const user = {
            first_name,
            last_name,
            email,
            password: hashedPassword
        };
        const result = await usersService.create(user);
        res.send({ status: "success", payload: result._id });
    } catch (error) {}
};

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send({ status: "error", error: "Campos incompletos" });
    const user = await usersService.getUserByEmail(email);
    if (!user) return res.status(404).send({ status: "error", error: "El usuario no existe" });
    const isValidPassword = await passwordValidation(user, password);
    if (!isValidPassword) return res.status(400).send({ status: "error", error: "Contraseña incorrecta" });
    const userDto = UserDTO.getUserTokenFrom(user);
    const token = jwt.sign(userDto, 'secretito', { expiresIn: "1h" });
    res.cookie('coderCookie', token, { maxAge: 3600000 }).send({ status: "success", message: "Iniciaste Sesión" });
};

const current = async (req, res) => {
    const cookie = req.cookies['coderCookie'];
    const user = jwt.verify(cookie, 'secretito');
    if (user) res.send({ status: "success", payload: user });
};

const unprotectedLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send({ status: "error", error: "Campos incompletos" });
    const user = await usersService.getUserByEmail(email);
    if (!user) return res.status(404).send({ status: "error", error: "User doesn't exist" });
    const isValidPassword = await passwordValidation(user, password);
    if (!isValidPassword) return res.status(400).send({ status: "error", error: "Contraseña incorrecta" });
    const token = jwt.sign(user, 'secretito', { expiresIn: "1h" });
    res.cookie('unprotectedCookie', token, { maxAge: 3600000 }).send({ status: "success", message: "Sesión iniciada" });
};

const unprotectedCurrent = async (req, res) => {
    const cookie = req.cookies['unprotectedCookie'];
    const user = jwt.verify(cookie, 'secretito');
    if (user) res.send({ status: "success", payload: user });
};

export default {
    current,
    login,
    register,
    unprotectedLogin,
    unprotectedCurrent
};
