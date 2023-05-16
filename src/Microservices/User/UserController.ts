/* eslint-disable indent */
import {
  AuthorizationRole,
  HttpStatusCodes,
  USER_JWT_EXPIRY_IN_SECS,
  UserStatus,
} from "../../CommonConstants";
import { ApiResponseI } from "../../CommonHttpServer/ResponseHandler";
import { IUserEntity, UserModel } from "../../Database/Entities/UserEntity";
import { AuthTokenI, JwtTokenTypes } from "../../Security/JwtConfig";
import { JwtController } from "../../Security/JwtController";
import { Logger } from "../../Utils/Logger";
import { RandomUtil } from "../../Utils/RandomUtil";
import {
  GetUserProfileResponseI,
  UpdatePasswordDto,
  UserI,
  UserLoginDto,
  UserLoginOtpVerifyResponseI,
  UserRegisterDto,
  UserRegisterResponseI,
} from "./User.dto";
import { PasswordUtil } from "../../Security/PasswordUtil";

const tag = "UserController";

export const UserController = {
  async registerUser(input: UserRegisterDto): Promise<ApiResponseI> {
    try {
      const { emailId, firstName, lastName, userRole, userName } = input;

      const existingUser: IUserEntity | null = await UserModel().findOne({
        emailId,
      });

      if (existingUser) {
        return {
          status: HttpStatusCodes.BAD_REQUEST,
          message: "User with this email already exists",
        };
      }

      const password = RandomUtil.getRandomString(8, false);
      const passwordHash: string = await PasswordUtil.getHash(password);

      const newUser = new (UserModel())({
        emailId,
        userRole,
        userStatus: UserStatus.ACTIVE,
        userName,
        passwordHash,
        firstName,
        lastName,
      });

      await newUser.save();

      const data: UserRegisterResponseI = {
        user: this.getUserResponseDto(newUser),
        password,
      };

      Logger.info({ message: "User Registered Successfully", data, tag });
      return {
        status: HttpStatusCodes.OK,
        message: "User Registered",
        data,
      };
    } catch (error) {
      Logger.warn({ message: "Register User Failed", error, tag });

      throw error;
    }
  },

  async login(input: UserLoginDto): Promise<ApiResponseI> {
    try {
      const { emailId, password } = input;
      const user = await UserModel().findOne({
        emailId,
      });

      if (!user) {
        return {
          status: HttpStatusCodes.BAD_REQUEST,
          message: "This user doesn't exist",
        };
      }

      const isValid: boolean = await PasswordUtil.checkHash({
        password,
        hashBase64: user.passwordHash,
      });

      if (!isValid) {
        return {
          status: HttpStatusCodes.BAD_REQUEST,
          message: "Please check your password.",
        };
      }

      const refreshToken = RandomUtil.getRandomString(32, true);

      const payload: AuthTokenI = {
        userId: user._id.toString(),
        authorizationRole: AuthorizationRole.USER,
      };

      const accessToken: string = await JwtController.createToken(
        JwtTokenTypes.AUTH_TOKEN,
        payload,
        USER_JWT_EXPIRY_IN_SECS
      );

      const data: UserLoginOtpVerifyResponseI = {
        user: this.getUserResponseDto(user),
        accessToken,
        refreshToken,
      };

      return {
        status: HttpStatusCodes.OK,
        message: "Logged in",
        data,
      };

      Logger.info({ message: "User Login Success", data: {}, tag });

      return {
        status: HttpStatusCodes.OK,
        message: "Logged in",
        data,
      };
    } catch (error) {
      Logger.warn({ message: "Login User Failed", error, tag });

      throw error;
    }
  },

  async getUserProfile(userId: string): Promise<ApiResponseI> {
    try {
      const user = await UserModel().findOne({ _id: userId });
      // .populate({ path: "groupId", model: GroupModel() });

      if (!user) {
        return {
          status: HttpStatusCodes.NOT_FOUND,
          message: "Not Found",
        };
      }

      const data: GetUserProfileResponseI = {
        user: this.getUserResponseDto(user),
      };

      Logger.info({ message: "getUserProfile Success", data: { userId }, tag });
      return {
        data,
        status: HttpStatusCodes.OK,
        message: "Profile Fetched",
      };
    } catch (error) {
      Logger.warn({ message: "getUserProfile Failed", error, tag });
      throw error;
    }
  },

  async updatePassword(
    input: UpdatePasswordDto,
    payload: AuthTokenI
  ): Promise<ApiResponseI> {
    try {
      const { newPassword } = input;
      const { userId } = payload;
      const user = await UserModel().findById(userId);

      if (!user) {
        return {
          status: HttpStatusCodes.NOT_FOUND,
          message: "This user doesn't exist",
        };
      }

      user.passwordHash = await PasswordUtil.getHash(newPassword);

      await user.save();

      Logger.info({
        message: "Password Updated Success",
        data: { payload },
        tag,
      });

      return {
        status: HttpStatusCodes.OK,
        message: "Password Updated",
        data: {},
      };
    } catch (error) {
      Logger.warn({ message: "Password Updated Failed", error, tag });

      throw error;
    }
  },

  getUserResponseDto(user: IUserEntity): UserI {
    return {
      id: user._id.toString(),
      emailId: user.emailId,
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      createdAt: user.createdAt?.toISOString(),
      updatedAt: user.updatedAt?.toISOString(),
    };
  },
};
