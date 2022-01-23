import { Version } from "@prisma/client";
import { VersionController } from "controllers/version";
import { Router } from "express";
import { DEFAULT_ERROR_MSG } from "lib/constants";

const versionRoutes = Router()

const controller = new VersionController()

versionRoutes.get("/", async (_, res) => {
    try {
        const versions = await controller.list()
        res.status(200).json(versions)
    } catch (error) {
        res.status(400).json({
            msg: DEFAULT_ERROR_MSG,
        })
    }
})

versionRoutes.post<null, { msg: string } | Version, Version>(
    "/",
    async (req, res) => {
        try {
            const version = await controller.create(req.body)
            res.status(201).json(version)
        } catch (error) {
            res.status(400).json({
                msg: DEFAULT_ERROR_MSG,
            })
        }
    }
)

export { versionRoutes };

