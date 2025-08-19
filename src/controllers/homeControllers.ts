import { Request, Response } from "express";

export const home_get = (req: Request, res: Response) => {
  res.json({ user: res.locals.user })
}