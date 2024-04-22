import { Response, Request } from "express";
import decode from "../auth/auth";

export const getEntry = async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send("Unauthorized");
  }
  const decoded = await decode(token);
  if (decoded.error) {
    return res.status(401).send("Unauthorized");
  }
  return res.status(200).send("Entry");
};
