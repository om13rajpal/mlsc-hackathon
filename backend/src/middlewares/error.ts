import { NextFunction, Request, Response } from "express";

export function notFoundHandler(req: Request, res: Response, next: NextFunction) {
  res.status(404).json({
    status: false,
    message: "Route not found",
  });
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(500).json({
    status: false,
    message: "Internal server error",
    error: err.message,
  });
}
