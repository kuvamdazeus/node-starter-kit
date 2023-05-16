import { Transform } from "class-transformer";
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsBoolean,
} from "class-validator";
import { UserRole } from "../../CommonConstants";
import { IsOptional2 } from "../Common.dto";
import "reflect-metadata";

export class UserLoginDto {
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) =>
    typeof value === "string" ? value.toLowerCase().trim() : value
  )
  emailId!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsBoolean()
  @IsOptional2()
  byPass?: boolean;
}

export class UserRegisterDto {
  @IsOptional2()
  @IsEnum(UserRole)
  userRole: UserRole = UserRole.USER;

  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) =>
    typeof value === "string" ? value.toLowerCase().trim() : value
  )
  emailId!: string;

  @IsOptional2()
  @IsString()
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  firstName?: string;

  @IsOptional2()
  @IsString()
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  lastName?: string;

  @IsOptional2()
  @IsString()
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  userName?: string;
}

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  newPassword!: string;
}

export class GetUserProfileByIdDto {
  @IsMongoId()
  @IsNotEmpty()
  userId!: string;
}

export interface UserI {
  id: string;
  emailId: string;
  firstName?: string;
  lastName?: string;
  userName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetUserProfileResponseI {
  user: UserI;
}

export interface UserRegisterResponseI {
  user: UserI;
  password: string;
}

export interface UserLoginOtpVerifyResponseI {
  user: UserI;
  accessToken: string;
  refreshToken: string;
}