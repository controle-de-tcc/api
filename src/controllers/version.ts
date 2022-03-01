import { Suggestion, Version } from "@prisma/client";
import { listProjectQuerySelect, ListProjectResponse } from "./project";
import { BaseController } from "./_baseController";

export type GetVersionResponse = Version & {
	projeto: ListProjectResponse;
	sugestoes: Array<Omit<Suggestion, "id_versao">>;
};

export class VersionController extends BaseController {
	public async create(id_projeto: number, arquivo: string) {
		return this.client.version.create({
			data: {
				projeto: {
					connect: {
						id: id_projeto,
					},
				},
				arquivo,
			},
		});
	}

	public async get(id_version: number): Promise<GetVersionResponse | null> {
		const version = this.client.version.findFirst({
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
					where: {
						is_active: true,
					},
				},
				is_active: true,
			},
			where: {
				id: id_version,
				is_active: true,
			},
		});

		return version;
	}

	public async delete(ids: Array<number>): Promise<void> {
		await this.client.version.updateMany({
			data: {
				is_active: false,
			},
			where: {
				id: {
					in: ids,
				},
			},
		});
	}
}
