import { Advisor, Student } from "@prisma/client";
import { AdvisorController } from "./advisor";
import { StudentController } from "./student";
import { BaseController } from "./_baseController";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { LoginRequest, LoginResponse, UserRoles } from "types/auth";

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
		const user_type = isStudent ? UserRoles.Student : UserRoles.Professor;
		const token = jwt.sign(
			{
				id,
				user_type,
				tipo_professor:
					"tipo_professor" in user ? user.tipo_professor : null,
			},
			String(process.env.JWT_SECRET),
			{
				expiresIn: "1w",
			}
		);

		const userObj = {
			...user,
			is_active: true,
		} as any;
		delete userObj.senha;

		return {
			token,
			user_type,
			user: userObj,
		};
	}
}
