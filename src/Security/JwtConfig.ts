import { AuthorizationRole } from "../CommonConstants";
import { ServerConfig } from "../serverConfig";

export enum JwtTokenTypes {
  AUTH_TOKEN = "AUTH_TOKEN",
}

interface JwtConfig {
  expiryTimeInSecs?: number;
  privateKey: string;
  publicKey: string;
}

type JwtConfigMapI = { [key in JwtTokenTypes]: JwtConfig };

export const JwtConfigMap: JwtConfigMapI = {
  [JwtTokenTypes.AUTH_TOKEN]: {
    privateKey: decodeBase64String(ServerConfig.JWT_CONFIG.AUTH_PRIVATE_BASE64),
    publicKey: decodeBase64String(ServerConfig.JWT_CONFIG.AUTH_PUBLIC_BASE64),
    // expiryTimeInSecs: 30 * 60,
  },
};

function decodeBase64String(base64: string): string {
  return Buffer.from(base64, "base64").toString("ascii");
}

export interface AuthTokenI {
  userId: string;
  authorizationRole: AuthorizationRole;
}
