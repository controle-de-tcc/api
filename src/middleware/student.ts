import * as express from "express";
import jwt from "jsonwebtoken";
import { UserRoles } from "types/auth";

export const studentMiddleware = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	try {
		const token = req.headers.authorization!.split(" ")[1];

		const decoded = jwt.decode(token, {
			json: true,
		});
		if (decoded === null || decoded.user_type !== UserRoles.Student) {
			throw new Error("Você não possui permissão para acessar essa rota");
		}

		return next();
	} catch (err) {
		const error = err as Error;
		return res.status(401).json({
			msg: error.message,
		});
	}
};
