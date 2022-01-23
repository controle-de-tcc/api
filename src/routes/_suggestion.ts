import { Suggestion } from "@prisma/client";
import { SuggestionController } from "controllers/suggestion";
import { Router } from "express";
import { DEFAULT_ERROR_MSG } from "lib/constants";

const suggestionRoutes = Router();

const controller = new SuggestionController()

suggestionRoutes.get("/", async (_, res) => {
    try {
        const suggestions = await controller.list()
        res.status(200).json(suggestions)
    } catch (error) {
        res.status(400).json({
            msg: DEFAULT_ERROR_MSG,
        })
    }
})

suggestionRoutes.post<null, { msg: string } | Suggestion, Suggestion>(
    "/",
    async (req, res) => {
        try {
            const suggestion = await controller.create(req.body)
            res.status(200).json(suggestion)
        } catch (error) {
            res.status(400).json({
                msg: DEFAULT_ERROR_MSG,
            })
        }
    }
)

export { suggestionRoutes };

