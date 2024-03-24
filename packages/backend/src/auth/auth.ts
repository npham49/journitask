import { Request } from "express";
import jwt from "jsonwebtoken";

// This code is used to decode the session token from Clerk's JWT
// The session token is included in the request header
// The session token is used to get the user's information
// The token is decoded using the public key from the env variable
// Thedecode token is returned or an error is returned

const decode = async (req: Request, res: any) => {
  const splitPem = process.env.CLERK_JWT_VERIFICATION_KEY?.match(/.{1,64}/g);
  const publicKey =
    "-----BEGIN PUBLIC KEY-----\n" +
    splitPem
      ?.join("\n")
      .replace("-----BEGIN PUBLIC KEY-----\n", "")
      .replace("\n-----END PUBLIC KEY-----", "") +
    "\n-----END PUBLIC KEY-----";

  const sessToken = req.headers.authorization?.split(" ")[1];
  if (!sessToken) {
    return { error: "No token" };
  }
  let decoded;
  try {
    // console.log(publicKey, sessToken);
    decoded = jwt.verify(sessToken || "", publicKey);
    console.log(decoded);
  } catch (error) {
    console.error(error);
    return { error: error };
  }
  return { decoded: decoded };
};

export default decode;
