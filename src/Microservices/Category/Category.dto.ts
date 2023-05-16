import { IsNotEmpty, IsString, IsMongoId, IsOptional } from "class-validator";
import "reflect-metadata";

export class CreateCategoryDto {
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

export class UpdateCategoryDto extends CreateCategoryDto {
  @IsMongoId()
  @IsNotEmpty()
  id!: string;
}

export class DeleteCategoryDto {
  @IsMongoId()
  @IsNotEmpty()
  id!: string;
}

export class GetCategoryByIdDto {
  @IsMongoId()
  @IsNotEmpty()
  categoryId!: string;
}

export interface CategoryI {
  id: string;
  name: string;
  description: string;
  image?: string;
}