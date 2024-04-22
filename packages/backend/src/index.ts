import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3030;

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "",
    credentials: true,
  })
);

app.listen(port, () => {
  console.log(`⚡️[server]: Hi! Server is running at http://localhost:${port}`);
});
