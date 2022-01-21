import { Router } from "express";
import { Student } from "@prisma/client";
import { StudentController } from "controllers/student";

const studentRoutes = Router();

const controller = new StudentController();

const DEFAULT_ERROR_MSG = "Ocorreu um erro inesperado";

studentRoutes.get("/", async (_, res) => {
	try {
		const students = await controller.list();
		res.status(200).json(students);
	} catch (err) {
		res.status(400).json({
			msg: DEFAULT_ERROR_MSG,
		});
	}
});

studentRoutes.post<null, { msg: string } | Student, Student>(
	"/",
	async (req, res) => {
		try {
			const student = await controller.create(req.body);
			res.status(201).json(student);
		} catch (err) {
			res.status(400).json({
				msg: DEFAULT_ERROR_MSG,
			});
		}
	}
);

export { studentRoutes };
