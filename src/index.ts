import express from "express";
import { userRouter } from "./routes/user";

const api = express();
api.use(express.json());

api.use("/user", userRouter);

const PORT = process.env.PORT || 8000;

api.listen(PORT, () => {
	console.log("listening on port 8000");
});
