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
import { XXXXXController } from "./XXXXXController";

const router = express.Router();

router.get(
  "/",
  JwtController.validateTokenMiddleware(JwtTokenTypes.AUTH_TOKEN, [
    AuthorizationRole.ADMIN,
  ]),
  async (req: express.Request, res: express.Response) => {
    try {
      const response = await XXXXXController.index();
      ResponseHandler.sendResponse(res, response);
    } catch (error) {
      ResponseHandler.sendErrorResponse(res, error);
    }
  }
);

router.get(
  "/:entityId",
  validateDtoMiddleware(GetXXXXXByIdDto, "params"),
  JwtController.validateTokenMiddleware(JwtTokenTypes.AUTH_TOKEN, [
    AuthorizationRole.ADMIN,
  ]),
  async (req: express.Request, res: express.Response) => {
    try {
      const response = await XXXXXController.getEntityById(
        (req.params as any as GetXXXXXByIdDto).entityId
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
      const response = await XXXXXController.create(
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
      const response = await XXXXXController.update(
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
      const response = await XXXXXController.destroy(req.params as any);
      ResponseHandler.sendResponse(res, response);
    } catch (error) {
      ResponseHandler.sendErrorResponse(res, error);
    }
  }
);
export { router as XXXXXRouter };
