import { Student } from "@prisma/client";
import { BaseController } from "./_baseController";
import { BaseOperations } from "./_baseOperations";

export class StudentController
	extends BaseController
	implements BaseOperations<Student>
{
	public async create(body: Student): Promise<Student> {
		const student = await this.client.student.create({
			data: body,
		});
		return student;
	}

	public async list(): Promise<Student[]> {
		const students = await this.client.student.findMany();
		return students;
	}
}
