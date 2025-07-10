import { Request, Response, NextFunction } from "express";

interface appError extends Error {
  status?: number;
}

const errorHandler = (
  err: appError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  res.status(err.status || 500).json({
    message: err.message || "internal server error",
  });
};

export default errorHandler;
