import * as express from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	try {
		if (!req.headers.authorization)
			throw new Error("Credenciais inválidas");

		const token = req.headers.authorization.split(" ")[1];

		jwt.verify(token, process.env.JWT_SECRET as string);

		return next();
	} catch (err) {
		const error = err as Error;
		return res.status(401).json({
			msg:
				error.message === "jwt expired"
					? "Credenciais expiradas"
					: error.message,
		});
	}
};
