import { Request, Response } from "express"
import { PointRepository } from "../Infrastructure/Repositories/Points/PointRepository"

export const PointController = {
    getAll: async (req: Request, res: Response) => {
        try {
            const documentos = await PointRepository.getAllPoint();
            return res.json(documentos).status(200);
        } catch (error) {
            return res.json(error).status(500);
        }
    }
}