import { Request, Response } from "express";
import { SubjectRepository } from "../repositories/SubjectRepository";

export class SubjectController {
    async create(req: Request, res: Response) {
        //Criação de uma matéria
        const { name } = req.body;

        if (!name) {
            res.status(400).json({ message: "Name is required" });
        }

        try {
            const newSubject = SubjectRepository.create({ name });

            await SubjectRepository.save(newSubject);
            return res.status(201).json(newSubject);
        } catch (error) {
            console.log(error);

            return res.status(500).json({ message: "Internal server error" });
        }
    }
}
