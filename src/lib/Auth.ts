import { IUser } from "@model/User";
import { genSalt, hash, compare } from "bcryptjs";
import { sign, decode, verify } from "jsonwebtoken";
import Token, { IToken } from "../models/Token";

export default class {
  decodeToken = async (token: string) => decode(token);

  createToken = async (payload: any, expiresIn: number): Promise<string> => {
    const secret: string = process.env.JWT_SECRET || "";
    const token: string = sign(payload, secret, {
      expiresIn,
      algorithm: "HS512",
    });
    return token;
  };

  checkUserPassword = async (
    passwod: string = "",
    hashedPassword: string = ""
  ): Promise<boolean | Error> => {
    try {
      return await compare(passwod, hashedPassword);
    } catch (e) {
      throw new Error(`checkPassword error: ${e}`);
    }
  };

  verifyToken = async (token: string) => {
    try {
      const secret: string = process.env.JWT_SECRET || "";
      const isVerify: string | object = verify(token, secret);
      return isVerify;
    } catch (e) {
      throw new Error(`verifyToken error: ${e}`);
    }
  };
  checkToken = async (token: string) => {
    const resultData = {
      success: false,
      msg: "INVALID_TOKEN",
      data: {},
    };
    try {
      const existingToken: IToken | undefined = await Token.findOne({
        accessToken: token,
      });
      if (!existingToken) {
        return resultData;
      }
      try {
        const isVerify = await this.verifyToken(token);
        resultData.msg = "SUCCESS";
        resultData.success = true;
        resultData.data = isVerify;
        return resultData;
      } catch (err) {
        resultData.msg = "TOKEN_EXPIRED";
        return resultData;
      }
    } catch (err) {
      throw new Error(`jwtSign error: ${err}`);
    }
  };
  jwtSign = async (user: any): Promise<IToken> => {
    const expiresInAccessToken = process.env.JWT_ACCESS_TOKEN_T || "3600";
    const expiresInRefreshToken = process.env.JWT_REFRESH_TOKEN_T || "86400";
    try {
      const accessToken = await this.createToken(
        user,
        parseInt(expiresInAccessToken, 10)
      );
      const refreshToken = await this.createToken(
        user,
        parseInt(expiresInRefreshToken, 10)
      );
      const newToken = {
        accessToken,
        refreshToken,
        userId: user.id,
        expiredAt: Date.now() + parseInt(expiresInAccessToken, 10),
      };
      const token: IToken = await Token.create(newToken);
      return token;
    } catch (e) {
      throw new Error(`jwtSign error: ${e}`);
    }
  };
}
