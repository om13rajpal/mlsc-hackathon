import { Router } from "express";
import { loginHandler, signupHandler } from "./auth/auth";
import {
  addMemberHandler,
  createTeamHandler,
  getTeamHandler,
  getTeamsHandler,
} from "./team/team";
import isAuthorized from "../middlewares/authorization";

export const authRouter = Router();
export const teamRouter = Router();

authRouter.post("/signup", signupHandler);
authRouter.post("/login", loginHandler);

teamRouter.post("/team", createTeamHandler);
teamRouter.put("/team/add/:id", addMemberHandler);

teamRouter.get("/team", isAuthorized, getTeamsHandler);
teamRouter.get("/team/:id", isAuthorized, getTeamHandler);