import { SessionData } from "express-session";
import { Request } from "express";

type User = {
  id: number;
  spotifyId: string;
  accessToken: string;
  refreshToken: string;
};

export interface UserAuthInfoRequest extends Request {
  user: User;
}

declare module "express-session" {
  interface SessionData {
    authorized: boolean;
    user: string;
  }
}
