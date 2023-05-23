import * as express from "express";
import { validateDtoMiddleware } from "../../CommonHttpServer/RequestValidator";
import { ResponseHandler } from "../../CommonHttpServer/ResponseHandler";
import {
  GetUserProfileByIdDto,
  UpdatePasswordDto,
  UserLoginDto,
  UserRegisterDto,
} from "./User.dto";
import { UserController } from "./UserController";
import { JwtController } from "../../Security/JwtController";
import { JwtTokenTypes } from "../../Security/JwtConfig";
import { AuthorizationRole } from "../../CommonConstants";
import { RequestHandler } from "../../CommonHttpServer/RequestHandler";

const router = express.Router();
router.use(express.json())

router.post(
  "/register",
  validateDtoMiddleware(UserRegisterDto, "body"),
  JwtController.validateTokenMiddleware(JwtTokenTypes.AUTH_TOKEN, [
    AuthorizationRole.ADMIN,
  ]),
  async (req: express.Request, res: express.Response) => {
    try {
      const response = await UserController.registerUser(req.body);
      ResponseHandler.sendResponse(res, response);
    } catch (error) {
      ResponseHandler.sendErrorResponse(res, error);
    }
  }
);

router.post(
  "/login",
  validateDtoMiddleware(UserLoginDto, "body"),
  async (req: express.Request, res: express.Response) => {
    try {
      const response = await UserController.login(req.body);

      ResponseHandler.sendResponse(res, response);
    } catch (error) {
      ResponseHandler.sendErrorResponse(res, error);
    }
  }
);

router.get(
  "/:userId",
  validateDtoMiddleware(GetUserProfileByIdDto, "params"),
  JwtController.validateTokenMiddleware(JwtTokenTypes.AUTH_TOKEN, [
    AuthorizationRole.ADMIN,
    AuthorizationRole.USER,
  ]),
  async (req: express.Request, res: express.Response) => {
    try {
      const response = await UserController.getUserProfile(
        (req.params as any as GetUserProfileByIdDto).userId
      );
      ResponseHandler.sendResponse(res, response);
    } catch (error) {
      ResponseHandler.sendErrorResponse(res, error);
    }
  }
);

router.put(
  "/password",
  validateDtoMiddleware(UpdatePasswordDto, "body"),
  JwtController.validateTokenMiddleware(JwtTokenTypes.AUTH_TOKEN, [
    AuthorizationRole.USER,
  ]),
  async (req: express.Request, res: express.Response) => {
    try {
      const response = await UserController.updatePassword(
        req.body,
        RequestHandler.getJwtPayload(req)
      );
      ResponseHandler.sendResponse(res, response);
    } catch (error) {
      ResponseHandler.sendErrorResponse(res, error);
    }
  }
);

export { router as UserRouter };
