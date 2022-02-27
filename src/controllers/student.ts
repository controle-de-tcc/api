import { Student } from "@prisma/client";
import { BaseController } from "./_baseController";

export type ListStudentResponse = {
	matricula: number;
	nome: string;
	email: string;
	created_at: Date;
	updated_at: Date;
};

const listStudentQuerySelect = {
	matricula: true,
	nome: true,
	email: true,
	created_at: true,
	updated_at: true,
};

export class StudentController extends BaseController {
	public async create(body: Student): Promise<Student> {
		const student = await this.client.student.create({
			data: body,
		});
		return student;
	}

	public async list(): Promise<Array<ListStudentResponse>> {
		const students = await this.client.student.findMany({
			select: listStudentQuerySelect,
		});
		return students;
	}

	public async get(
		email: string
	): Promise<(ListStudentResponse & { senha: string }) | null> {
		const student = await this.client.student.findUnique({
			where: { email },
			select: {
				...listStudentQuerySelect,
				senha: true,
			},
		});
		return student;
	}
}
