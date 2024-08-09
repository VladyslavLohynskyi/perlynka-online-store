import jwt from 'jsonwebtoken';
import Token from '../models/tokenModel';
import { IDecodedJwt } from '../middleware/authMiddleware';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import ForgotToken from '../models/forgotTokenModel';

export interface IJwtPayload {
   id: number;
   email: string;
   name: string;
   surname: string;
   role: string;
}
class TokenService {
   generateTokens(payload: IJwtPayload) {
      const accessToken = jwt.sign(payload, process.env.SECRET_KEY_ACCESS, {
         expiresIn: '45m',
      });
      const refreshToken = jwt.sign(payload, process.env.SECRET_KEY_REFRESH, {
         expiresIn: '30d',
      });
      return { accessToken, refreshToken };
   }

   async saveToken(userId: number, refreshToken: string) {
      const tokenData = await Token.findOne({ where: { userId } });
      if (tokenData) {
         return Token.update({ refreshToken }, { where: { userId } });
      }
      const token = await Token.create({
         userId,
         refreshToken,
      });
      return token;
   }

   async generateForgotToken(userId: number) {
      const tokenData = await ForgotToken.findOne({ where: { userId } });
      if (tokenData) {
         await ForgotToken.destroy({ where: { userId } });
      }
      const token: string = uuidv4() + '.' + (Date.now() + 900000);
      const hashToken: string = await bcrypt.hash(token, 5);
      await ForgotToken.create({ userId: userId, forgotToken: hashToken });
      return token;
   }

   async removeToken(refreshToken: string) {
      const tokenData = await Token.destroy({ where: { refreshToken } });
      return tokenData;
   }

   validateRefreshToken(token: string) {
      try {
         const userData = jwt.verify(
            token,
            process.env.SECRET_KEY_REFRESH,
         ) as IDecodedJwt;
         return userData;
      } catch (error) {
         return null;
      }
   }
   validateAccessToken(token: string) {
      try {
         const userData = jwt.verify(
            token,
            process.env.SECRET_KEY_ACCESS,
         ) as IDecodedJwt;
         return userData;
      } catch (error) {
         return null;
      }
   }

   async validateForgotToken(userId: number, token: string) {
      const isTokenActive = +token.split('.')[1] > Date.now();
      if (!isTokenActive) {
         await ForgotToken.destroy({ where: { userId } });
      }
      return isTokenActive;
   }

   async findToken(refreshToken: string) {
      const tokenData = await Token.findOne({ where: { refreshToken } });
      return tokenData;
   }
}

export default new TokenService();
