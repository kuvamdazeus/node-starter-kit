import { PasswordUtil } from "../../Security/PasswordUtil";
import {
  ADMIN_JWT_EXPIRY_IN_SECS,
  AuthorizationRole,
  HttpStatusCodes,
} from "../../CommonConstants";
import { ApiResponseI } from "../../CommonHttpServer/ResponseHandler";
import {
  AdminUserModel,
  IAdminUserEntity,
} from "../../Database/Entities/AdminUserEntity";
import { AuthTokenI, JwtTokenTypes } from "../../Security/JwtConfig";
import { JwtController } from "../../Security/JwtController";
import { Logger } from "../../Utils/Logger";
import {
  AdminUserI,
  AdminUserLoginDto,
  AdminUserLoginResponseI,
  AdminUserRegisterDto,
  AdminUserRegisterResponseI,
} from "./AdminUser.dto";

const tag = "AdminUserController";

export const AdminUserController = {
  async registerUser(input: AdminUserRegisterDto): Promise<ApiResponseI> {
    try {
      const { emailId, password, userName } = input;
      console.log(input);
      const existingUser: IAdminUserEntity | null =
        await AdminUserModel().findOne({
          emailId,
        });

      if (existingUser) {
        return {
          status: HttpStatusCodes.BAD_REQUEST,
          message: "This email already exists",
        };
      }

      const passwordHash: string = await PasswordUtil.getHash(password);

      const newUser = await new (AdminUserModel())({
        emailId,
        userName,
        passwordHash,
      }).save();

      const data: AdminUserRegisterResponseI = {
        user: this.getUserResponseDto(newUser),
      };

      Logger.info({ message: "Admin Registered Successfully", data, tag });
      return {
        status: HttpStatusCodes.OK,
        message: "Admin User Registered",
        data,
      };
    } catch (error) {
      Logger.warn({ message: "Register User Failed", error, tag });
      throw error;
    }
  },

  async login(input: AdminUserLoginDto): Promise<ApiResponseI> {
    try {
      const { emailId, password } = input;
      const user = await AdminUserModel().findOne({
        emailId,
      });

      if (!user) {
        return {
          status: HttpStatusCodes.BAD_REQUEST,
          message: "This user doesn't exist",
        };
      }

      const isValid = await PasswordUtil.checkHash({
        password,
        hashBase64: user.passwordHash,
      });

      if (!isValid) {
        return {
          status: HttpStatusCodes.BAD_REQUEST,
          message: "Please check your password.",
        };
      }

      const payload: AuthTokenI = {
        userId: user._id.toString(),
        authorizationRole: AuthorizationRole.ADMIN,
      };

      const accessToken: string = await JwtController.createToken(
        JwtTokenTypes.AUTH_TOKEN,
        payload,
        input.expireInSec || ADMIN_JWT_EXPIRY_IN_SECS
      );

      const data: AdminUserLoginResponseI = {
        user: this.getUserResponseDto(user),
        accessToken,
      };

      Logger.info({ message: "User Login Success", data: { payload }, tag });

      return {
        status: HttpStatusCodes.OK,
        message: "Admin Login Success",
        data,
      };
    } catch (error) {
      Logger.warn({ message: "Login User Failed", error, tag });

      throw error;
    }
  },

  getUserResponseDto(user: IAdminUserEntity): AdminUserI {
    return {
      id: user._id.toString(),
      emailId: user.emailId,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  },
};
