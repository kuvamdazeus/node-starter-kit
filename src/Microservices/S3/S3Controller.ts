import { AuthorizationRole, HttpStatusCodes } from "../../CommonConstants";
import { ApiResponseI } from "../../CommonHttpServer/ResponseHandler";

import { AuthTokenI } from "../../Security/JwtConfig";
import { Logger } from "../../Utils/Logger";
import { S3UtilInstance } from "../../Utils/S3Util";
import path from "path";
import { S3FileUploadDto, S3FileUploadResponse } from "./S3.dto";
import { v4 as uuidv4 } from "uuid";

const tag = "S3Controller";

const ONE_HOUR = 60 * 60;
const ONE_DAY = 60 * 60 * 24;
const TEN_MB = 10 * 1024 * 1024;

export const S3Controller = {
  getSignedUrlForFileUpload(
    input: S3FileUploadDto,
    payload: AuthTokenI
  ): ApiResponseI {
    try {
      const { fileList } = input;

      const data: S3FileUploadResponse = {
        uploadList: fileList.map((fileData) => {
          const key = `other/${
            payload.authorizationRole === AuthorizationRole.USER
              ? payload.userId
              : uuidv4()
          }${path.extname(fileData.fileName)}`;
          const s3Result = S3UtilInstance.getPreSignedPostUrlForFileUploading(
            key,
            TEN_MB,
            ONE_HOUR,
            "public" //"private"
          );

          return {
            fields: s3Result.fields,
            url: s3Result.url,
            fileUrl: S3UtilInstance.getCompleteURL(s3Result.fields.key),
          };
        }),
      };

      Logger.info({
        message: "getSignedUrlForFileUpload Success",
        data: { count: fileList.length },
        tag,
      });

      return {
        status: HttpStatusCodes.OK,
        message: "Url Created for File Upload",
        data,
      };
    } catch (error) {
      Logger.warn({ message: "getSignedUrlForFileUpload Failed", error, tag });

      throw error;
    }
  },

  getSignedUrlForRead(url: string | undefined): string | undefined {
    const search = "amazonaws.com";
    if (url && url.includes(search)) {
      const key = url.substring(url.indexOf(search) + search.length + 1);
      return S3UtilInstance.getSignedUrl(key, ONE_DAY);
    } else {
      return url;
    }
  },
};
