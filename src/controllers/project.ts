import { Project, Student } from "@prisma/client";
import { BaseController } from "./_baseController";
import { BaseOperations } from "./_baseOperations";

type ListProjectResponse = {
	id: Project["id"];
	titulo: Project["titulo"];
	aluno: Omit<Student, "senha">;
};

export class ProjectController
	extends BaseController
	implements BaseOperations<Project>
{
	public async create(body: Omit<Project, "id">): Promise<Project> {
		const project = await this.client.project.create({ data: body });
		return project;
	}

	public async list(): Promise<Array<ListProjectResponse>> {
		const projects = await this.client.project.findMany({
			select: {
				id: true,
				titulo: true,
				aluno: {
					select: {
						matricula: true,
						nome: true,
						email: true,
					},
				},
			},
		});
		return projects;
	}
}
