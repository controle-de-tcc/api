import express from "express";
import { routes } from "routes";
import cors from "cors";
import path from "path";

const api = express();

api.use(express.json());
api.use(express.urlencoded({ extended: true }));
api.use(express.static(path.basename(path.dirname("public"))));
api.use(cors());

api.use("/orientador", routes.advisor);
api.use("/projeto", routes.project);
api.use("/aluno", routes.student);
api.use("/sugestao", routes.suggestion);
api.use("/auth", routes.auth);

const PORT = process.env.PORT || 8000;

api.listen(PORT, () => {
	console.log(`listening on port ${PORT}`);
});
