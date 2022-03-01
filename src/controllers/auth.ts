import { Advisor, Student } from "@prisma/client";
import { AdvisorController } from "./advisor";
import { StudentController } from "./student";
import { BaseController } from "./_baseController";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { LoginRequest, LoginResponse } from "types/auth";

const studentController = new StudentController();
const advisorController = new AdvisorController();

export class AuthController extends BaseController {
	public async signup(body: Student | Advisor): Promise<Student | Advisor> {
		const user =
			(await studentController.get(body.email)) ||
			(await advisorController.get(body.email));

		if (user) {
			throw new Error("409"); // Usuário já existe
		}

		const hashedPassword = await bcrypt.hash(body.senha, 10);
		body.senha = hashedPassword;

		const isStudent = "matricula" in body;
		const newUser = isStudent
			? await studentController.create(body)
			: await advisorController.create(body);

		return newUser;
	}

	public async login(body: LoginRequest): Promise<LoginResponse> {
		const { email, senha } = body;

		const user =
			(await studentController.get(email)) ||
			(await advisorController.get(email));

		if (!user) {
			throw new Error("404");
		}

		if (!(await bcrypt.compare(senha, user.senha))) {
			throw new Error("401");
		}

		const isStudent = "matricula" in user;
		const id = isStudent ? user.matricula : user.siape;
		const token = jwt.sign({ id }, String(process.env.JWT_SECRET), {
			expiresIn: "1w",
		});

		const userObj = {
			...user,
			is_active: true,
		};
		delete (userObj as any).senha;

		return {
			token,
			userType: isStudent ? "student" : "advisor",
			user: userObj,
		};
	}
}
