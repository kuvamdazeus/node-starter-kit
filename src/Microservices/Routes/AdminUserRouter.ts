import * as express from "express";
import { validateDtoMiddleware } from "../../CommonHttpServer/RequestValidator";
import { ResponseHandler } from "../../CommonHttpServer/ResponseHandler";
import { AdminUserRegisterDto, AdminUserLoginDto } from "../Dto/AdminUser.dto";
import { AdminUserController } from "../Controllers/AdminUserController";
const router = express.Router();

router.post(
  "/register",
  validateDtoMiddleware(AdminUserRegisterDto, "body"),
  async (req: express.Request, res: express.Response) => {
    try {
      const response = await AdminUserController.registerUser(
        req.body as AdminUserRegisterDto
      );

      ResponseHandler.sendResponse(res, response);
    } catch (error) {
      ResponseHandler.sendErrorResponse(res, error);
    }
  }
);

router.post(
  "/login",
  validateDtoMiddleware(AdminUserLoginDto, "body"),
  async (req: express.Request, res: express.Response) => {
    try {
      const response = await AdminUserController.login(
        req.body as AdminUserLoginDto
      );

      ResponseHandler.sendResponse(res, response);
    } catch (error) {
      ResponseHandler.sendErrorResponse(res, error);
    }
  }
);

export { router as AdminUserRouter };
