import { SessionData } from "express-session";
import { Request } from "express";

type User = {
  id: number;
  spotifyId: string | undefined;
  accessToken: string;
  refreshToken: string;
  expires_at: number;
};

export interface UserInfo extends Request {
  user: User;
}

declare module "express-session" {
  interface SessionData {
    authorized: boolean;
    user: string;
  }
}
