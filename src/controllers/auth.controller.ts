import { Request, Response, NextFunction } from "express";

export const redirect = (_: Request, res: Response) => {
  res.redirect(`${process.env.CLIENT_URL}`);
};

export const userHandler = (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    // console.log(req.user);
    res.status(200).json({ user: req.user });
  } else {
    res.status(401).json({ error: "unauthenticated" });
  }
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  req.logout(function (error) {
    if (error) {
      return next(error);
    }
    res.redirect(`${process.env.CLIENT_URL}/signin`);
  });
};
