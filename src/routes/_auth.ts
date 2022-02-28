import { Router } from "express";
import { DEFAULT_ERROR_MSG } from "lib/constants";
import {
	LoginRequest,
	LoginResponse,
	SignupRequest,
	SignupResponse,
} from "types/auth";
import { AuthController } from "controllers/auth";

const authRoutes = Router();

const authController = new AuthController();

authRoutes.post("/login", async (req, res) => {
	try {
		const loginData = await authController.login(req.body);

		res.status(200).json(loginData);
	} catch (err) {
		if ((err as Error).message === "401")
			return res.status(401).json({ msg: "Senha incorreta" });
		if ((err as Error).message === "404")
			return res.status(404).json({ msg: "Usuário não encontrado" });
		res.status(400).json({
			msg: DEFAULT_ERROR_MSG,
		});
	}
});

authRoutes.post("/cadastro", async (req, res) => {
	try {
		const newUser = await authController.signup(req.body);

		res.status(201).json({
			user: newUser,
		});
	} catch (err) {
		if ((err as Error).message === "409") {
			return res.status(409).json({
				msg: "Usuário já existe",
			});
		}
		res.status(400).json({
			msg: DEFAULT_ERROR_MSG,
		});
	}
});

export { authRoutes };
