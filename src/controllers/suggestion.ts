import { BaseController } from "./_baseController";

export type CreateSuggestionBody = {
	siape_professor: number;
	texto: string;
	arquivo: string;
};

export class SuggestionController extends BaseController {
	public async create(id_versao: number, body: CreateSuggestionBody) {
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

	public async delete(ids: Array<number>): Promise<void> {
		await this.client.suggestion.updateMany({
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
