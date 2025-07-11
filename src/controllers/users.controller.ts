import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

const prisma = new PrismaClient();

export const GetUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params["id"];

  try {
    const response = await prisma.users.findUniqueOrThrow({
      where: {
        id: id,
      },
    });

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }finally{
    await prisma.$disconnect()
  }
};