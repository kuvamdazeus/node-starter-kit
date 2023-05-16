import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, IsEmail, IsNumber } from "class-validator";
import "reflect-metadata";
import { IsOptional2 } from "../Common.dto";

export class AdminUserLoginDto {
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) =>
    typeof value === "string" ? value.toLowerCase().trim() : value
  )
  emailId!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsNumber()
  @IsOptional2()
  expireInSec?: number;
}

export class AdminUserRegisterDto extends AdminUserLoginDto {
  @IsString()
  @IsNotEmpty()
  userName!: string;
}

export interface AdminUserI {
  id: number;
  emailId: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminUserRegisterResponseI {
  user: AdminUserI;
}

export interface AdminUserLoginResponseI {
  user: AdminUserI;
  accessToken: string;
}
