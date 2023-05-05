import * as express from "express";
import { ResponseHandler } from "./ResponseHandler";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { RequestHandler } from "./RequestHandler";
import { Logger } from "../Utils/Logger";
import { HttpStatusCodes } from "../CommonConstants";

const tag = "RequestValidator";

/**
 *
 * Middleware for request validation and transformation (if any)
 *
 * @param {Class} dto  - Class for which validation will be performed
 * @param {'body'|'query'|'params'} propertyToValidate which property of request is to be validated
 */
export const validateDtoMiddleware = function (
  dto: any,
  propertyToValidate: "body" | "query" | "params"
) {
  return async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    let input: any = {};
    switch (propertyToValidate) {
      case "body":
        input = req.body;
        break;
      case "query":
        input = req.query;
        break;
      case "params":
        input = req.params;
        break;
    }

    const obj: any = plainToClass(dto, input);
    const validationErrors = await validate(obj, {});
    const isFailed = validationErrors.length > 0;

    Logger.info({ message: "Request Input", data: { obj }, tag });
    if (isFailed) {
      const requestInfo = RequestHandler.getRequestInfo(req);

      Logger.warn({
        message: "Request Validation Failed",
        error: { requestInfo, validationErrors },
        tag,
      });

      ResponseHandler.sendResponse(res, {
        message: "Bad Request",
        data: validationErrors,
        status: HttpStatusCodes.BAD_REQUEST,
      });
    } else {
      switch (propertyToValidate) {
        case "body":
          req.body = obj;
          break;
        case "query":
          req.query = obj;
          break;
        case "params":
          req.params = obj;
          break;
      }
      next();
    }
  };
};
