import { Project } from "@prisma/client";
import { BaseController } from "./_baseController";
import { BaseOperations } from "./_baseOperations";

export class ProjectController
	extends BaseController
	implements BaseOperations<Project>
{
	public async create(body: Project): Promise<Project> {
		const project = await this.client.project.create({ data: body });
		return project;
	}

	public async list(): Promise<Array<Project>> {
		const projects = await this.client.project.findMany();
		return projects;
	}
}
