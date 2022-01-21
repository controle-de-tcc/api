import { PrismaClient } from "@prisma/client";

export class BaseController {
	public client: PrismaClient;

	constructor() {
		this.client = new PrismaClient();
	}
}
