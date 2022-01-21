import express from "express";
import { routes } from "routes";

const api = express();
api.use(express.json());

api.use("/student", routes.student);
api.use("/advisor", routes.advisor);

const PORT = process.env.PORT || 8000;

api.listen(PORT, () => {
	console.log("listening on port 8000");
});
