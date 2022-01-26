import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as yup from "yup";
import { StudentController } from "controllers/student";
import { AdvisorController } from "controllers/advisor";
import { DEFAULT_ERROR_MSG } from "lib/constants";
import {
	LoginRequest,
	LoginResponse,
	SignupRequest,
	SignupResponse,
} from "types/auth";

const authRoutes = Router();

const studentController = new StudentController();
const advisorController = new AdvisorController();

authRoutes.post<null, LoginResponse | { msg: string }, LoginRequest>(
	"/login",
	async (req, res) => {
		try {
			const { email, senha } = req.body;

			const user =
				(await studentController.get(email)) ||
				(await advisorController.get(email));

			if (!user) {
				return res.status(404).json({ msg: "Usuário não encontrado" });
			}
			if (user.senha !== senha) {
				return res.status(401).json({ msg: "Senha incorreta" });
			}

			const isStudent = "matricula" in user;
			const id = isStudent ? user.matricula : user.siape;
			const token = jwt.sign({ id }, String(process.env.JWT_SECRET), {
				expiresIn: "1w",
			});

			res.json({
				token,
				userType: isStudent ? "student" : "advisor",
				user,
			});
		} catch (err) {
			res.status(400).json({
				msg: DEFAULT_ERROR_MSG,
			});
		}
	}
);

authRoutes.post<null, SignupResponse | { msg: string }, SignupRequest>(
	"/cadastro",
	async (req, res) => {
		try {
			await yup
				.string()
				.email()
				.validate(req.body.email)
				.catch(() => {
					return res.status(400).json({ msg: "Email inválido" });
				});

			const user =
				(await studentController.get(req.body.email)) ||
				(await advisorController.get(req.body.email));

			if (user) {
				return res.status(409).json({ msg: "Usuário já existe" });
			}

			const { body } = req;
			const isStudent = "matricula" in body;
			const newUser = isStudent
				? await studentController.create(body)
				: await advisorController.create(body);
			res.status(201).json({
				user: newUser,
			});
		} catch (err) {
			res.status(400).json({
				msg: DEFAULT_ERROR_MSG,
			});
		}
	}
);

export { authRoutes };
