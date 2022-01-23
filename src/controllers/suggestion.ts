import { Suggestion } from "@prisma/client"
import { BaseController } from "./_baseController"
import { BaseOperations } from "./_baseOperations"

export class SuggestionController
    extends BaseController
    implements BaseOperations<Suggestion>
{
    public async create(body: Suggestion): Promise<Suggestion> {
        const suggestion = this.client.suggestion.create({
            data: body,
        })
        return suggestion
    }

    public async list(): Promise<Array<Suggestion>> {
        const suggestions = this.client.suggestion.findMany()
        return suggestions
    }
}