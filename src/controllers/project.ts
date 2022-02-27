import { Project, Student } from "@prisma/client";
import { BaseController } from "./_baseController";
import { BaseOperations } from "./_baseOperations";

type ListProjectResponse = {
	id: Project["id"];
	titulo: Project["titulo"];
	aluno: Omit<Student, "senha">;
};

export type CreateProjectBody = Omit<Project, "id"> & {
	avaliadores: number[];
};

export class ProjectController
	extends BaseController
	implements BaseOperations<Project>
{
	public async create(body: CreateProjectBody): Promise<Project> {
		const project = await this.client.project.create({
			data: {
				titulo: body.titulo,
				mat_aluno: body.mat_aluno,
				siape_orientador: body.siape_orientador,
				avaliadores: {
					create: body.avaliadores.map((siape) => ({
						avaliador: { connect: { siape } },
					})),
				},
			},
		});
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
						created_at: true,
						updated_at: true,
					},
				},
				orientador: true,
				avaliadores: {
					select: {
						avaliador: true,
					},
				},
				created_at: true,
				updated_at: true,
			},
		});
		return projects;
	}
}
