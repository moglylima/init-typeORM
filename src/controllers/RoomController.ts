import { Request, Response } from "express";
import { Subject } from "typeorm/persistence/Subject";
import { RoomRepository } from "../repositories/RoomRepository";
import { SubjectRepository } from "../repositories/SubjectRepository";
import { VideoRepository } from "../repositories/VideoRepository";

export class RoomController {
    async create(req: Request, res: Response) {
        const { name, description } = req.body;

        try {
            const newRoom = RoomRepository.create({ name, description });
            await RoomRepository.save(newRoom);
            return res.status(201).json(newRoom);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async createVideo(req: Request, res: Response) {
        const { title, url } = req.body;
        const { idRoom } = req.params;

        try {
            const room = await RoomRepository.findOneById(idRoom);

            if (!room) {
                return res.status(404).json({ message: "Room not exists" });
            }

            const newVideo = VideoRepository.create({ title, url, room });
            await VideoRepository.save(newVideo);
            return res.status(201).json(newVideo);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async roomSubject(req: Request, res: Response) {
        const { idSubject } = req.body;
        const { idRoom } = req.params;

        try {
            const room = await RoomRepository.findOneById(idRoom);
            if (!room) {
                return res.status(404).json({ message: "Room not exists" });
            }

            const subject = await SubjectRepository.findOneBy({
                id: idSubject,
            });

            if (!subject) {
                return res.status(404).json({ message: "Subject not exists" });
            }

            const roomUpdate = { ...room, subjects: [subject] };

            await RoomRepository.save(roomUpdate);

            return res
                .status(200)
                .json({ message: "Subject added to room", room });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async list(req: Request, res: Response) {
        try {
            const rooms = await RoomRepository.find({
                relations: ["subjects", "videos"],
            });
            return res.status(200).json(rooms);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}
