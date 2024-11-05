import type { Express } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

export const createServer = (): Express => {
  const app = express();

  app.set("trust proxy", true);
  app.disable("x-powered-by");

  app.use(morgan("dev"));
  app.use(helmet());

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors({ credentials: true }));
  app.use(cookieParser());

  return app;
};
