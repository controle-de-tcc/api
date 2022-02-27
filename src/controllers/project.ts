import { Project, Student } from "@prisma/client";
import { listAdvisorQuerySelect } from "./advisor";
import { BaseController } from "./_baseController";

export type ListProjectResponse = {
	id: number;
	titulo: string;
	aluno: Omit<Student, "senha">;
};

export type CreateProjectBody = Omit<Project, "id"> & {
	avaliadores: number[];
};

const listProjectQuerySelect = {
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
	orientador: {
		select: listAdvisorQuerySelect,
	},
	avaliadores: {
		select: {
			avaliador: {
				select: listAdvisorQuerySelect,
			},
		},
	},
	created_at: true,
	updated_at: true,
};

export class ProjectController extends BaseController {
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
			select: listProjectQuerySelect,
		});
		return projects;
	}

	public async listByReviewer(
		siape: number
	): Promise<Array<ListProjectResponse>> {
		const projects = await this.client.project.findMany({
			where: {
				avaliadores: {
					some: {
						avaliador: {
							siape,
						},
					},
				},
			},
			select: listProjectQuerySelect,
		});

		return projects;
	}

	public async getByStudent(
		matricula: number
	): Promise<ListProjectResponse | null> {
		const project = await this.client.project.findFirst({
			where: {
				mat_aluno: matricula,
			},
			select: listProjectQuerySelect,
		});

		return project;
	}
}
