import { Router } from "express";
import { Student } from "@prisma/client";
import { StudentController } from "controllers/student";
import { DEFAULT_ERROR_MSG } from "lib/constants";
import { AuthController } from "controllers/auth";
import { authMiddleware } from "middleware/auth";
import { advisorMiddleware } from "middleware/advisor";

const studentRoutes = Router();
studentRoutes.use(authMiddleware);

const studentController = new StudentController();
const authController = new AuthController();

studentRoutes.get("/", async (_, res) => {
	try {
		const students = await studentController.list();

		res.status(200).json(students);
	} catch (err) {
		res.status(400).json({
			msg: DEFAULT_ERROR_MSG,
		});
	}
});

studentRoutes.post("/", advisorMiddleware, async (req, res) => {
	try {
		const newUser = await authController.signup(req.body);

		res.status(201).json(newUser as Student);
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

studentRoutes.delete("/", advisorMiddleware, async (req, res) => {
	try {
		const { ids } = req.body;

		await studentController.delete(ids);

		res.status(200).send();
	} catch (err) {
		console.log(err);
		res.status(400).json({
			msg: DEFAULT_ERROR_MSG,
		});
	}
});

export { studentRoutes };
