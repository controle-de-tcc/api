import { Advisor } from "@prisma/client";
import { BaseController } from "./_baseController";
import { BaseOperations } from "./_baseOperations";

export class AdvisorController
	extends BaseController
	implements BaseOperations<Advisor>
{
	public async create(body: Advisor): Promise<Advisor> {
		const advisor = this.client.advisor.create({
			data: body,
		});
		return advisor;
	}

	public async list(): Promise<Array<Advisor>> {
		const advisors = this.client.advisor.findMany();
		return advisors;
	}

	public async get(email: string): Promise<Advisor | null> {
		const advisor = this.client.advisor.findUnique({
			where: { email },
		});
		return advisor;
	}
}
