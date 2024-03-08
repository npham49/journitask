import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import {
  ClerkExpressRequireAuth,
  RequireAuthProp,
  StrictAuthProp,
} from "@clerk/clerk-sdk-node";
import { error } from "console";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3030;

declare global {
  namespace Express {
    interface Request extends StrictAuthProp {}
  }
}

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "",
    credentials: true,
  })
);

app.get(
  "/",
  ClerkExpressRequireAuth({
    authorizedParties: [process.env.FRONTEND_URL || ""],
    onError: (error) => {
      console.log(error);
    },
  }),
  (req: RequireAuthProp<Request>, res) => {
    res.json(req.auth);
  }
);

app.listen(port, () => {
  console.log(`⚡️[server]: Hi! Server is running at http://localhost:${port}`);
});
