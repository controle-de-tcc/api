import { Router } from "express";
import { ListProjectResponse, ProjectController } from "controllers/project";
import { DEFAULT_ERROR_MSG } from "lib/constants";
import { authMiddleware } from "middleware/auth";

const projectRoutes = Router();
projectRoutes.use(authMiddleware);

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

projectRoutes.post("/", async (req, res) => {
	try {
		const project = await controller.create(req.body);
		res.status(201).json(project);
	} catch (err) {
		res.status(400).json({
			msg: DEFAULT_ERROR_MSG,
		});
	}
});

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

projectRoutes.get("/por-aluno/:mat_aluno", async (req, res) => {
	try {
		const { mat_aluno } = req.params;
		const project = await controller.getByStudent(Number(mat_aluno));
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
});

projectRoutes.delete("/", async (req, res) => {
	try {
		const { ids } = req.body;
		await controller.delete(ids);
		res.status(200).send();
	} catch (err) {
		console.log(err);
		res.status(400).json({
			msg: DEFAULT_ERROR_MSG,
		});
	}
});

export { projectRoutes };
