import * as express from "express";
import { validateDtoMiddleware } from "../../CommonHttpServer/RequestValidator";
import { ResponseHandler } from "../../CommonHttpServer/ResponseHandler";
import { JwtController } from "../../Security/JwtController";
import { JwtTokenTypes } from "../../Security/JwtConfig";
import { AuthorizationRole } from "../../CommonConstants";
import {
  CreateCategoryDto,
  DeleteCategoryDto,
  GetCategoryByIdDto,
  UpdateCategoryDto,
} from "./Category.dto";
import { CategoryController } from "./CategoryController";

const router = express.Router();
router.use(express.json())

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
  validateDtoMiddleware(GetCategoryByIdDto, "params"),
  JwtController.validateTokenMiddleware(JwtTokenTypes.AUTH_TOKEN, [
    AuthorizationRole.ADMIN,
  ]),
  async (req: express.Request, res: express.Response) => {
    try {
      const response = await CategoryController.getCategoryById(
        (req.params as any as GetCategoryByIdDto).categoryId
      );
      ResponseHandler.sendResponse(res, response);
    } catch (error) {
      ResponseHandler.sendErrorResponse(res, error);
    }
  }
);

router.post(
  "/create",
  validateDtoMiddleware(CreateCategoryDto, "body"),
  JwtController.validateTokenMiddleware(JwtTokenTypes.AUTH_TOKEN, [
    AuthorizationRole.ADMIN,
  ]),
  async (req: express.Request, res: express.Response) => {
    try {
      const response = await CategoryController.create(
        req.body as CreateCategoryDto
      );
      ResponseHandler.sendResponse(res, response);
    } catch (error) {
      ResponseHandler.sendErrorResponse(res, error);
    }
  }
);

router.patch(
  "/",
  validateDtoMiddleware(UpdateCategoryDto, "body"),
  JwtController.validateTokenMiddleware(JwtTokenTypes.AUTH_TOKEN, [
    AuthorizationRole.ADMIN,
  ]),
  async (req: express.Request, res: express.Response) => {
    try {
      const response = await CategoryController.update(
        req.body as UpdateCategoryDto
      );
      ResponseHandler.sendResponse(res, response);
    } catch (error) {
      ResponseHandler.sendErrorResponse(res, error);
    }
  }
);

router.delete(
  "/:id",
  validateDtoMiddleware(DeleteCategoryDto, "params"),
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
