import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization: string = req.headers.authorization as unknown as string;

  if (!authorization) {
    return res
      .status(400)
      .json({ error: "please provide Bearer <token> in header" });
  }

  const token = authorization.split(" ")[1];
  //verify token
  jwt.verify(
    token,
    process.env.JWT_PRIVATE_KEY as unknown as string,
    (err, _decoded) => {
      if (err) {
        return res.status(401).json({ error: err.message });
      }

      next();
    }
  );
}
