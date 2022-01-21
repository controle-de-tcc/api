import { Router } from "express";
import { Advisor } from "@prisma/client";
import { AdvisorController } from "controllers/advisor";

const advisorRoutes = Router();

const controller = new AdvisorController();

const DEFAULT_ERROR_MSG = "Ocorreu um erro inesperado";

advisorRoutes.get("/", async (_, res) => {
	try {
		const advisors = await controller.list();
		res.status(200).json(advisors);
	} catch (err) {
		res.status(400).json({
			msg: DEFAULT_ERROR_MSG,
		});
	}
});

advisorRoutes.post<null, { msg: string } | Advisor, Advisor>(
	"/",
	async (req, res) => {
		try {
			const advisor = await controller.create(req.body);
			res.status(201).json(advisor);
		} catch (err) {
			res.status(400).json({
				msg: DEFAULT_ERROR_MSG,
			});
		}
	}
);

export { advisorRoutes };
