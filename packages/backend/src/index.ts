import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import auth from "./auth/auth";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3030;

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "",
    credentials: true,
  })
);

app.get("/", async (req: Request, res: Response) => {
  const decoded = await auth(req, res);
  if (decoded.error) return res.status(401).send("Unauthorized");
  return res.status(200).send(decoded);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Hi! Server is running at http://localhost:${port}`);
});
