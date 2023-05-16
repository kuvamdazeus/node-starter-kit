import * as express from "express";
import { AdminUserRouter } from "./AdminUser/AdminUserRouter";
import { UserRouter } from "./User/UserRouter";
import { S3Router } from "./S3/S3Router";
import { CategoryRouter } from "./Category/CategoryRouter";

const ApiRouter = express.Router();
ApiRouter.use("/user", UserRouter);
ApiRouter.use("/admin", AdminUserRouter);
ApiRouter.use("/s3", S3Router);
ApiRouter.use("/category", CategoryRouter);

export { ApiRouter };
