import { SessionData } from "express-session";

declare module "express-session" {
  interface SessionData {
    authorized: boolean;
    user: string;
  }
}

// declare module "express" {
//   interface Session {
//     user: object
//   }
