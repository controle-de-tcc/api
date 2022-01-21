import { Router } from "express";
import { Project } from "@prisma/client";
import { ProjectController } from "controllers/project";
import { DEFAULT_ERROR_MSG } from "lib/constants";

const projectRoutes = Router();

const controller = new ProjectController();

projectRoutes.get("/", async (_, res) => {
	try {
		const projects = await controller.list();
		res.status(200).json(projects);
	} catch (err) {
		res.status(400).json({
			msg: DEFAULT_ERROR_MSG,
		});
	}
});

projectRoutes.post<null, { msg: string } | Project, Project>(
	"/",
	async (req, res) => {
		try {
			const project = await controller.create(req.body);
			res.status(201).json(project);
		} catch (err) {
			res.status(400).json({
				msg: DEFAULT_ERROR_MSG,
			});
		}
	}
);

export { projectRoutes };