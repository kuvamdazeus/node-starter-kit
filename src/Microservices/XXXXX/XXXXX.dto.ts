import { IsNotEmpty, IsString, IsMongoId, IsOptional } from "class-validator";
import "reflect-metadata";

export class CreateXXXXXDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsOptional()
  image?: string;
}

export class UpdateXXXXXDto extends CreateXXXXXDto {
  @IsMongoId()
  @IsNotEmpty()
  id!: string;
}

export class DeleteXXXXXDto {
  @IsMongoId()
  @IsNotEmpty()
  id!: string;
}

export class GetXXXXXByIdDto {
  @IsMongoId()
  @IsNotEmpty()
  entityId!: string;
}

export interface XXXXXI {
  id: string;
  name: string;
  description: string;
  image?: string;
}