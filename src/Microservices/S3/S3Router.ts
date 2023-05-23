import * as express from "express";
import { validateDtoMiddleware } from "../../CommonHttpServer/RequestValidator";
import { ResponseHandler } from "../../CommonHttpServer/ResponseHandler";
import { S3FileUploadDto } from "./S3.dto";
import { JwtController } from "../../Security/JwtController";
import { JwtTokenTypes } from "../../Security/JwtConfig";
import { S3Controller } from "./S3Controller";
import { RequestHandler } from "../../CommonHttpServer/RequestHandler";
const router = express.Router();
router.use(express.json())

router.post(
  "/signedUrl",
  validateDtoMiddleware(S3FileUploadDto, "body"),
  JwtController.validateTokenMiddleware(JwtTokenTypes.AUTH_TOKEN),
  async (req: express.Request, res: express.Response) => {
    try {
      const response = S3Controller.getSignedUrlForFileUpload(
        req.body,
        RequestHandler.getJwtPayload(req)
      );

      ResponseHandler.sendResponse(res, response);
    } catch (error) {
      ResponseHandler.sendErrorResponse(res, error);
    }
  }
);

export { router as S3Router };
