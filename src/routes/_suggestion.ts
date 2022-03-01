import { Router } from "express";
import fs from "fs";
import crypto from "crypto";
import multer from "multer";
import { DEFAULT_ERROR_MSG } from "lib/constants";
import { SuggestionController } from "controllers/suggestion";
import { authMiddleware } from "middleware/auth";

const suggestionRoutes = Router();
suggestionRoutes.use(authMiddleware);

const upload = multer({ storage: multer.memoryStorage() });

const controller = new SuggestionController();

suggestionRoutes.post(
	"/:id_versao",
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

			await controller.create(Number(req.params.id_versao), obj);

			res.status(201).send();
		} catch (err) {
			res.status(400).json({
				msg: DEFAULT_ERROR_MSG,
			});
		}
	}
);

suggestionRoutes.delete("/", async (req, res) => {
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

export { suggestionRoutes };
