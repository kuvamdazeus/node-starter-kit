import { Type } from "class-transformer";
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from "class-validator";
import "reflect-metadata";

interface S3FileUpload {
  url: string;
  fields: any;
  fileUrl: string;
}

export class S3FileUploadItem {
  @IsNotEmpty()
  @IsString()
  fileName!: string;
}

export class S3FileUploadDto {
  @IsArray()
  @ArrayMaxSize(20)
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => S3FileUploadItem)
  fileList!: S3FileUploadItem[];
}

export interface S3FileUploadResponse {
  uploadList: S3FileUpload[];
}
