import { Router } from "express";
import { RoomController } from "./controllers/RoomController";
import { SubjectController } from "./controllers/SubjectController";

const routes = Router();

routes.post("/subjects", new SubjectController().create);

routes.post("/rooms", new RoomController().create);

routes.get("/rooms", new RoomController().list);

routes.post("/rooms/:idRoom/videos", new RoomController().createVideo);

routes.post("/rooms/:idRoom/subjects", new RoomController().roomSubject);

export { routes };
