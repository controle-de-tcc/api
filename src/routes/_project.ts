import { Router } from "express";
import fs from "fs";
import crypto from "crypto";
import { ListProjectResponse, ProjectController } from "controllers/project";
import { DEFAULT_ERROR_MSG } from "lib/constants";
import multer from "multer";

const projectRoutes = Router();

const upload = multer({ storage: multer.memoryStorage() });

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

projectRoutes.post<{ id_projeto: string }>(
	"/:id_projeto/nova-versao",
	upload.single("arquivo"),
	async (req, res) => {
		try {
			if (!req.file) {
				return res.status(400).json({
					msg: "Arquivo não enviado",
				});
			}

			const file_path = crypto.randomUUID() + ".pdf";
			fs.writeFileSync(`public/documents/${file_path}`, req.file.buffer);

			const project = await controller.createVersion(
				Number(req.params.id_projeto),
				file_path
			);
			res.status(201).json(project);
		} catch (err) {
			console.log(err);
			res.status(400).json({
				msg: DEFAULT_ERROR_MSG,
			});
		}
	}
);

projectRoutes.get("/por-versao/:id_versao", async (req, res) => {
	try {
		const { id_versao } = req.params;
		const project = await controller.getByVersion(Number(id_versao));
		if (project === null) {
			return res.status(404).json({
				msg: "Versão não encontrada",
			});
		}
		res.status(200).json(project);
	} catch (err) {
		res.status(400).json({
			msg: DEFAULT_ERROR_MSG,
		});
	}
});

// versao/5/nova-sugestao

projectRoutes.post<{ id_versao: string }>(
	"/versao/:id_versao/nova-sugestao",
	upload.single("arquivo"),
	async (req, res) => {
		try {
			if (!req.file) {
				return res.status(400).json({
					msg: "Arquivo não enviado",
				});
			}

			const file_path = crypto.randomUUID() + ".pdf";
			fs.writeFileSync(`public/documents/${file_path}`, req.file.buffer);

			const obj = {
				siape_professor: Number(
					req.body.siape_professor
				) /* Do form data so vem string */,
				texto: req.body.texto,
				arquivo: file_path,
			};

			await controller.createSuggestion(
				Number(req.params.id_versao),
				obj
			);
			res.status(201).send();
		} catch (err) {
			console.log(err);
			res.status(400).json({
				msg: DEFAULT_ERROR_MSG,
			});
		}
	}
);

export { projectRoutes };
