import { Project, Student, Suggestion, Version } from "@prisma/client";
import { listAdvisorQuerySelect } from "./advisor";
import { BaseController } from "./_baseController";

export type ListProjectResponse = {
	id: number;
	titulo: string;
	aluno: Omit<Student, "senha">;
};

export type CreateProjectBody = Omit<Project, "id"> & {
	avaliadores: Array<number>;
};

export type GetProjectResponse = ListProjectResponse & {
	versoes: Array<Omit<Version, "id_projeto">>;
};

export type GetProjectVersionResponse = Version & {
	projeto: ListProjectResponse;
	sugestoes: Array<Omit<Suggestion, "id_versao">>;
};

export type CreateSuggestionBody = {
	siape_professor: number;
	texto: string;
	arquivo: string;
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
		mat_aluno: number
	): Promise<GetProjectResponse | null> {
		const project = await this.client.project.findFirst({
			where: {
				mat_aluno,
			},
			select: {
				...listProjectQuerySelect,
				versoes: true,
			},
		});

		return project;
	}

	public async createVersion(id_projeto: number, arquivo: string) {
		return this.client.version.create({
			data: {
				id_projeto,
				arquivo,
			},
		});
	}

	public async getByVersion(
		id_version: number
	): Promise<GetProjectVersionResponse | null> {
		const version = this.client.version.findFirst({
			where: {
				id: id_version,
			},
			select: {
				id: true,
				id_projeto: true,
				arquivo: true,
				created_at: true,
				updated_at: true,
				projeto: {
					select: listProjectQuerySelect,
				},
				sugestoes: {
					include: {
						professor: true,
					},
				},
			},
		});

		return version;
	}

	public async createSuggestion(
		id_versao: number,
		body: CreateSuggestionBody
	) {
		return this.client.suggestion.create({
			data: {
				versao: {
					connect: {
						id: id_versao,
					},
				},
				professor: {
					connect: {
						siape: body.siape_professor,
					},
				},
				texto: body.texto,
				arquivo: body.arquivo,
			},
		});
	}
}
