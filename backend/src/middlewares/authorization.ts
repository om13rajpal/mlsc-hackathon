import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/token";

export default function isAuthorized(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({
      status: false,
      message: "Unauthorized",
    });
    return;
  }

  const token = authorization.split(" ")[1];
  if (!token) {
    res.status(401).json({
      status: false,
      message: "Unauthorized",
    });
    return;
  }

  const isValid = verifyToken(token);
  if (!isValid) {
    res.status(401).json({
      status: false,
      message: "Unauthorized",
    });
    return;
  }
  next();
}
