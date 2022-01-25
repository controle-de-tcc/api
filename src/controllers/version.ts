import { Version } from "@prisma/client";
import { BaseController } from "./_baseController";
import { BaseOperations } from "./_baseOperations";

export class VersionController
	extends BaseController
	implements BaseOperations<Version>
{
	public async create(body: Version): Promise<Version> {
		const version = this.client.version.create({
			data: body,
		});
		return version;
	}

	public async list(): Promise<Array<Version>> {
		const versions = this.client.version.findMany();
		return versions;
	}
}
