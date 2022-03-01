import { Advisor } from "@prisma/client";
import { BaseController } from "./_baseController";

export type ListAdvisorResponse = {
	siape: number;
	nome: string;
	email: string;
	tipo_professor: string;
};

export const listAdvisorQuerySelect = {
	siape: true,
	nome: true,
	email: true,
	tipo_professor: true,
	created_at: true,
	updated_at: true,
};

export class AdvisorController extends BaseController {
	public async create(body: Advisor): Promise<Advisor> {
		const advisor = this.client.advisor.create({
			data: body,
		});
		return advisor;
	}

	public async list(): Promise<Array<ListAdvisorResponse>> {
		const advisors = this.client.advisor.findMany({
			select: listAdvisorQuerySelect,
			where: {
				is_active: true,
			},
		});
		return advisors;
	}

	public async get(
		email: string
	): Promise<(ListAdvisorResponse & { senha: string }) | null> {
		const advisor = this.client.advisor.findFirst({
			select: {
				...listAdvisorQuerySelect,
				senha: true,
			},
			where: {
				email,
				is_active: true,
			},
		});
		return advisor;
	}

	public async delete(ids: Array<number>): Promise<void> {
		await this.client.advisor.updateMany({
			data: {
				is_active: false,
			},
			where: {
				siape: {
					in: ids,
				},
			},
		});
	}
}
