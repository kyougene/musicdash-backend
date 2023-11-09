import bcrypt from "bcrypt";
import type { NextFunction, Request, Response } from "express";

const saltRounds = 10;

type Password = {
  hashed_password: string;
  salt: string;
};

export const hashPassword = async (password: string): Promise<Password> => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashed_password = await bcrypt.hash(password, salt);

  return {
    hashed_password,
    salt,
  };
};

export const checkPassword = async (
  password: string,
  hash: string
): Promise<Boolean> => {
  const result = await bcrypt.compare(password, hash);
  return result;
};

// export const isAuthenticated = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   if (req.user) {
//     next();
//   } else {
//     res.status(401).send("Unauthorized");
//   }
// };
