import { Transform, Type } from "class-transformer";
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsObject,
  ValidateNested,
  Validate,
  IsNumber,
  Length,
  IsISO8601,
  IsBoolean,
  IsArray,
} from "class-validator";
import {
  DevicePlatform,
  PaginationResult,
  SortBy,
  UserRole,
  UserStatus,
} from "../../CommonConstants";
import { IsOptional2, PaginationDto } from "./Common.dto";
import "reflect-metadata";
import { TimeZoneValidator } from "../../Utils/TimezoneValidator";

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

export class UpdateDeviceDto {
  @IsString()
  @IsNotEmpty()
  deviceId!: string;

  @IsString()
  @IsNotEmpty()
  deviceName!: string;

  @IsString()
  @IsNotEmpty()
  osVersion!: string;

  @IsEnum(DevicePlatform)
  @IsNotEmpty()
  platform!: DevicePlatform;

  @IsNumber()
  @IsNotEmpty()
  buildNumber!: number;

  @IsString()
  @IsNotEmpty()
  firebaseToken!: string;
}

export class RenewAccessTokenDto {
  @IsString()
  @IsNotEmpty()
  refreshToken!: string;
}

export class ResendLoginOtpDto {
  @IsMongoId()
  @IsNotEmpty()
  optId!: string;
}

export class VerifyLoginOtpDto {
  @IsMongoId()
  @IsNotEmpty()
  optId!: string;

  @IsString()
  @IsNotEmpty()
  otp!: string;
}

export class ResendPasswordDto {
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

export interface UserLoginOtpSendResponseI {
  otpId: string;
}

export interface RenewTokenResponseI {
  accessToken: string;
}

export interface UpdateUserDeviceResponseI {
  deviceIdentifier: string;
}
