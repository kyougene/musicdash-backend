import { SessionData } from "express-session";
import { Request } from "express";

declare module "express-session" {
  interface SessionData {
    authorized: boolean;
    user: string;
  }
}

declare module "express" {
  interface Request {
    user: string;
  }
}
