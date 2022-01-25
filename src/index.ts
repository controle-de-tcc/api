import express from "express";
import { routes } from "routes";

const api = express();
api.use(express.json());

api.use("/orientador", routes.advisor);
api.use("/trabalho", routes.project);
api.use("/aluno", routes.student);
api.use("/versao", routes.version)
api.use("/sugestao", routes.suggestion)

const PORT = process.env.PORT || 8000;

api.listen(PORT, () => {
	console.log("listening on port 8000");
});
