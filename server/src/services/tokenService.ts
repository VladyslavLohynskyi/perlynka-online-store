import jwt from 'jsonwebtoken';
import Token from '../models/tokenModel';
import { where } from 'sequelize';
import { IDecodedJwt } from '../middleware/authMiddleware';

export interface IJwtPayload {
   id: number;
   email: string;
   role: string;
}
class TokenService {
   generateTokens(payload: IJwtPayload) {
      const accessToken = jwt.sign(payload, process.env.SECRET_KEY_ACCESS, {
         expiresIn: '30m',
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

   async findToken(refreshToken: string) {
      const tokenData = await Token.findOne({ where: { refreshToken } });
      return tokenData;
   }
}

export default new TokenService();
