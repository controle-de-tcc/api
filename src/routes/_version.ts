import { Router } from "express";
import fs from "fs";
import crypto from "crypto";
import multer from "multer";
import { VersionController } from "controllers/version";
import { DEFAULT_ERROR_MSG } from "lib/constants";
import { authMiddleware } from "middleware/auth";

const versionRoutes = Router();
versionRoutes.use(authMiddleware);

const upload = multer({ storage: multer.memoryStorage() });

const controller = new VersionController();

versionRoutes.get("/:id_versao", async (req, res) => {
	try {
		const { id_versao } = req.params;

		const versions = await controller.get(Number(id_versao));

		res.status(200).json(versions);
	} catch (err) {
		res.status(400).json({
			msg: DEFAULT_ERROR_MSG,
		});
	}
});

versionRoutes.post(
	"/:id_projeto",
	upload.single("arquivo"),
	async (req, res) => {
		try {
			if (!req.file) {
				return res.status(400).json({
					msg: "Arquivo não enviado",
				});
			}

			const { id_projeto } = req.params;

			const file_path = crypto.randomUUID() + ".pdf";
			fs.writeFileSync(`public/documents/${file_path}`, req.file.buffer);

			const version = await controller.create(
				Number(id_projeto),
				file_path
			);
			res.status(201).json(version);
		} catch (err) {
			res.status(400).json({
				msg: DEFAULT_ERROR_MSG,
			});
		}
	}
);

versionRoutes.delete("/", async (req, res) => {
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

export { versionRoutes };
