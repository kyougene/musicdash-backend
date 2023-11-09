import { SessionData } from "express-session";
import { Request } from "express";

export interface UserAuthInfoRequest extends Request {
  user: string;
}

declare module "express-session" {
  interface SessionData {
    authorized: boolean;
    user: string;
  }
}
