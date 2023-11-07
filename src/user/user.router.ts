import express from "express";
import type { Request, Response } from "express";
import { createUser, checkUser } from "./user.model.js";
import { hashPassword, checkPassword } from "../authentication.js";
import { isAuthenticated } from "../authentication.js";

export const userRouter = express.Router();

userRouter.post("/", async (req: Request, res: Response) => {
  const { username, password, email } = req.body;
  const { hashed_password, salt } = await hashPassword(password);
  try {
    const newUser = await createUser({
      username,
      hashed_password,
      salt,
      email,
    });
    return res.status(201).json(newUser);
  } catch (error: unknown) {
    return res.status(500).json(error);
  }
});

userRouter.post(
  "/login",
  isAuthenticated,
  async (req: Request, res: Response) => {
    const user = await checkUser(req.body.username);
    if (
      !user ||
      !(await checkPassword(req.body.password, user.hashed_password))
    ) {
      return res.status(401).send("Invalid username/password combination");
    } else {
      req.session.authorized = true;
      req.session.user = user.username;
      return res.status(200).send("success");
    }
  }
);

userRouter.get(
  "/logout",
  isAuthenticated,
  async (req: Request, res: Response) => {
    req.session.destroy((error) => {
      return res.status(500).send(error);
    });
    res.redirect("/");
  }
);
