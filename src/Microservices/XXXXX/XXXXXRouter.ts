import * as express from "express";
import { validateDtoMiddleware } from "../../CommonHttpServer/RequestValidator";
import { ResponseHandler } from "../../CommonHttpServer/ResponseHandler";
import { JwtController } from "../../Security/JwtController";
import { JwtTokenTypes } from "../../Security/JwtConfig";
import { AuthorizationRole } from "../../CommonConstants";
import {
  CreateXXXXXDto,
  DeleteXXXXXDto,
  GetXXXXXByIdDto,
  UpdateXXXXXDto,
} from "./XXXXX.dto";
import { CategoryController } from "./XXXXXController";

const router = express.Router();

router.get(
  "/",
  JwtController.validateTokenMiddleware(JwtTokenTypes.AUTH_TOKEN, [
    AuthorizationRole.ADMIN,
  ]),
  async (req: express.Request, res: express.Response) => {
    try {
      const response = await CategoryController.index();
      ResponseHandler.sendResponse(res, response);
    } catch (error) {
      ResponseHandler.sendErrorResponse(res, error);
    }
  }
);

router.get(
  "/:categoryId",
  validateDtoMiddleware(GetXXXXXByIdDto, "params"),
  JwtController.validateTokenMiddleware(JwtTokenTypes.AUTH_TOKEN, [
    AuthorizationRole.ADMIN,
  ]),
  async (req: express.Request, res: express.Response) => {
    try {
      const response = await CategoryController.getCategoryById(
        (req.params as any as GetXXXXXByIdDto).xxxxxId
      );
      ResponseHandler.sendResponse(res, response);
    } catch (error) {
      ResponseHandler.sendErrorResponse(res, error);
    }
  }
);

router.post(
  "/create",
  validateDtoMiddleware(CreateXXXXXDto, "body"),
  JwtController.validateTokenMiddleware(JwtTokenTypes.AUTH_TOKEN, [
    AuthorizationRole.ADMIN,
  ]),
  async (req: express.Request, res: express.Response) => {
    try {
      const response = await CategoryController.create(
        req.body as CreateXXXXXDto
      );
      ResponseHandler.sendResponse(res, response);
    } catch (error) {
      ResponseHandler.sendErrorResponse(res, error);
    }
  }
);

router.patch(
  "/",
  validateDtoMiddleware(UpdateXXXXXDto, "body"),
  JwtController.validateTokenMiddleware(JwtTokenTypes.AUTH_TOKEN, [
    AuthorizationRole.ADMIN,
  ]),
  async (req: express.Request, res: express.Response) => {
    try {
      const response = await CategoryController.update(
        req.body as UpdateXXXXXDto
      );
      ResponseHandler.sendResponse(res, response);
    } catch (error) {
      ResponseHandler.sendErrorResponse(res, error);
    }
  }
);

router.delete(
  "/:id",
  validateDtoMiddleware(DeleteXXXXXDto, "params"),
  JwtController.validateTokenMiddleware(JwtTokenTypes.AUTH_TOKEN, [
    AuthorizationRole.ADMIN,
  ]),
  async (req: express.Request, res: express.Response) => {
    try {
      const response = await CategoryController.destroy(req.params as any);
      ResponseHandler.sendResponse(res, response);
    } catch (error) {
      ResponseHandler.sendErrorResponse(res, error);
    }
  }
);
export { router as CategoryRouter };
