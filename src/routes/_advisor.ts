import { Router } from "express";
import { Advisor } from "@prisma/client";
import { AdvisorController } from "controllers/advisor";
import { DEFAULT_ERROR_MSG } from "lib/constants";
import { AuthController } from "controllers/auth";
import { authMiddleware } from "middleware/auth";

const advisorRoutes = Router();
advisorRoutes.use(authMiddleware);

const advisorController = new AdvisorController();
const authController = new AuthController();

advisorRoutes.get("/", async (_, res) => {
	try {
		const advisors = await advisorController.list();

		res.status(200).json(advisors);
	} catch (err) {
		res.status(400).json({
			msg: DEFAULT_ERROR_MSG,
		});
	}
});

advisorRoutes.post("/", async (req, res) => {
	try {
		const newUser = await authController.signup(req.body);

		res.status(201).json(newUser as Advisor);
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

advisorRoutes.delete("/", async (req, res) => {
	try {
		const { ids } = req.body;

		await advisorController.delete(ids);

		res.status(200).send();
	} catch (err) {
		console.log(err);
		res.status(400).json({
			msg: DEFAULT_ERROR_MSG,
		});
	}
});

export { advisorRoutes };
