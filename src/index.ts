import express from "express";

import { AppDataSource } from "./data-source";
import { routes } from "./routes";

AppDataSource.initialize().then(() => {
    const app = express();

    app.use(express.json());

    app.get("/", (req, res) => {
        res.json("Hello World!");
    });

    app.use(routes);

    return app.listen(process.env.PORT);
});
