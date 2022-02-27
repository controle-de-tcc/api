export abstract class BaseOperations<Type> {
	abstract create(body: Type | any): Promise<Type>;
	abstract list(): Promise<Array<Type | any>>;
	abstract get?(email: string): Promise<Type | null>;
}
