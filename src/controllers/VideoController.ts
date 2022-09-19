import { Request, Response } from "express";
import { VideoRepository } from "../repositories/VideoRepository";

export class RoomController {
    async create(req: Request, res: Response) {
        const { title, url } = req.body;

        //pegando id da aula
        const { idAula } = req.params;

        try {
            const newVideo = VideoRepository.create();
            await VideoRepository.save(newVideo);
            return res.status(201).json(newVideo);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}
