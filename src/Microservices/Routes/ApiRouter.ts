import * as express from "express";
import { AdminUserRouter } from "./AdminUserRouter";
import { UserRouter } from "./UserRouter";
import { S3Router } from "./S3Router";

const ApiRouter = express.Router();
ApiRouter.use("/user", UserRouter);
ApiRouter.use("/admin", AdminUserRouter);
ApiRouter.use("/s3", S3Router);

export { ApiRouter };
