import { Router } from "express";
import { Project } from "@prisma/client";
import {
	CreateProjectBody,
	ListProjectResponse,
	ProjectController,
} from "controllers/project";
import { DEFAULT_ERROR_MSG } from "lib/constants";

const projectRoutes = Router();

const controller = new ProjectController();

projectRoutes.get<null, { msg: string } | Array<ListProjectResponse>>(
	"/",
	async (_, res) => {
		try {
			const projects = await controller.list();
			res.status(200).json(projects);
		} catch (err) {
			res.status(400).json({
				msg: DEFAULT_ERROR_MSG,
			});
		}
	}
);

projectRoutes.post<null, { msg: string } | Project, CreateProjectBody>(
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

projectRoutes.get<
	{ siape: string },
	{ msg: string } | Array<ListProjectResponse>
>("/por-avaliador/:siape", async (req, res) => {
	try {
		const { siape } = req.params;
		const projects = await controller.listByReviewer(Number(siape));
		res.status(200).json(projects);
	} catch (err) {
		res.status(400).json({
			msg: DEFAULT_ERROR_MSG,
		});
	}
});

projectRoutes.get<{ matricula: string }, { msg: string } | ListProjectResponse>(
	"/por-aluno/:matricula",
	async (req, res) => {
		try {
			const { matricula } = req.params;
			const project = await controller.getByStudent(Number(matricula));
			if (project === null) {
				return res.status(404).json({
					msg: "Projeto não encontrado",
				});
			}
			res.status(200).json(project);
		} catch (err) {
			res.status(400).json({
				msg: DEFAULT_ERROR_MSG,
			});
		}
	}
);

export { projectRoutes };
