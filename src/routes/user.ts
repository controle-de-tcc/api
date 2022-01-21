import { Router } from "express";
import { PrismaClient, Student } from "@prisma/client";

const userRouter = Router();
const client = new PrismaClient();

const ERROR_MSG = "Ocorreu um erro inesperado";

userRouter.get("/", async (_, res) => {
	try {
		const users = await client.student.findMany();
		res.status(200).json(users);
	} catch (err) {
		res.status(400).json({
			msg: ERROR_MSG,
		});
	}
});

userRouter.post<{ test: string }, { msg: string } | Student, Student>(
	"/",
	async (req, res) => {
		try {
			const user = await client.student.create({
				data: req.body,
			});
			res.status(200).json(user);
		} catch (err) {
			console.log(err);
			res.status(400).json({
				msg: ERROR_MSG,
			});
		}
	}
);

export { userRouter };
