import "dotenv/config";
import "reflect-metadata";

import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [`${__dirname}/**/entities/*.{ts,js}`],
    migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
});
