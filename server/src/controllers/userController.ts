import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import User, { Role } from '../models/userModel';
import Basket from '../models/basketModel';
import { authRequest } from '../middleware/authMiddleware';
import { Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import mailService from '../services/mailService';
import tokenService from '../services/tokenService';
import ApiError from '../exceptions/ApiError';
import ForgotToken from '../models/forgotTokenModel';

interface userRegistrationLoginRequest extends Request {
   body: {
      email: string;
      password: string;
   };
}

interface IForgotPasswordRequest extends Request {
   body: {
      email: string;
   };
}

interface IForgotPasswordChangeRequest extends Request {
   body: {
      userId: number;
      password: string;
      token: string;
   };
}

interface IGetUsersByRole extends Request {
   query: { role: Role };
}

interface ICheckForgotRequest extends Request {
   query: { userId: string; token: string };
}
interface IGetUserByEmail extends Request {
   query: { role: Role; email: string };
}

interface IChangeRole extends Request {
   body: {
      role: Role;
      id: string;
   };
}

class userController {
   async registration(
      req: userRegistrationLoginRequest,
      res: Response,
      next: NextFunction,
   ) {
      const { email, password } = req.body;
      if (!email || !password) {
         return next(
            ApiError.badRequest('Неправильно введенно пароль або email'),
         );
      }
      const candidate = await User.findOne({ where: { email } });
      if (candidate) {
         return next(ApiError.badRequest('Користувач з таким email вже існує'));
      }
      const hashPassword = await bcrypt.hash(password, 5);
      const activationLink = uuidv4();
      const users = await User.findAll();
      const user = await User.create({
         email,
         role: users.length ? Role.USER : Role.ADMIN,
         password: hashPassword,
         isActivated: false,
         activationLink,
      });
      await mailService.sendActivationMail(
         email,
         process.env.API_URL + '/api/user/activate/' + activationLink,
      );
      const basket = await Basket.create({ userId: user.id });
      const tokens = tokenService.generateTokens({
         id: user.id,
         email,
         role: user.role,
      });
      await tokenService.saveToken(user.id, tokens.refreshToken);
      res.cookie('refreshToken', tokens.refreshToken, {
         maxAge: 30 * 24 * 60 * 60 * 1000,
         httpOnly: true,
      });
      return res.json({ token: tokens.accessToken });
   }

   async login(
      req: userRegistrationLoginRequest,
      res: Response,
      next: NextFunction,
   ) {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
         return next(ApiError.badRequest('Неправильний email або пароль'));
      }
      let comparePassword = bcrypt.compareSync(password, user.password);
      if (!comparePassword) {
         return next(ApiError.badRequest('Неправильний email або пароль'));
      }
      if (!user.isActivated) {
         return next(
            ApiError.Unauthorized('Ваша електронна адреса ще не підтверджена'),
         );
      }
      const tokens = tokenService.generateTokens({
         id: user.id,
         email: user.email,
         role: user.role,
      });
      await tokenService.saveToken(user.id, tokens.refreshToken);
      res.cookie('refreshToken', tokens.refreshToken, {
         maxAge: 30 * 24 * 60 * 60 * 1000,
         httpOnly: true,
      });
      return res.json({ token: tokens.accessToken });
   }

   async getUsersByRole(req: IGetUsersByRole, res: Response) {
      const { role } = req.query;
      const users = await User.findAll({ where: { role } });
      return res.json(users);
   }

   async getUserByEmail(req: IGetUserByEmail, res: Response) {
      const { role, email } = req.query;
      const users = await User.findAll({
         where: { role, email: { [Op.startsWith]: email } },
      });
      return res.json(users);
   }

   async changeRole(req: IChangeRole, res: Response) {
      const { role, id } = req.body;
      const user = await User.findOne({ where: { id } });
      if (user) {
         await User.update({ role }, { where: { id } });
         return res.json(user);
      }
   }

   async activate(req: Request, res: Response, next: NextFunction) {
      const { link } = req.params;
      const user = await User.findOne({ where: { activationLink: link } });
      if (!user) {
         return next(ApiError.badRequest('Неправильне посилання'));
      }
      await User.update(
         { isActivated: true },
         { where: { activationLink: link } },
      );
      return res.redirect(process.env.CLIENT_URL);
   }

   async logout(req: Request, res: Response, next: NextFunction) {
      const { refreshToken } = req.cookies;
      const token = await tokenService.removeToken(refreshToken);
      res.clearCookie('refreshToken');
      return res.json({ token });
   }

   async refresh(req: Request, res: Response, next: NextFunction) {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
         return next(ApiError.Unauthorized('Не авторизований користувач'));
      }
      const userData = await tokenService.validateRefreshToken(refreshToken);
      const tokenFromDB = await tokenService.findToken(refreshToken);
      if (!userData || !tokenFromDB) {
         return next(ApiError.Unauthorized('Не авторизований користувач'));
      }
      const user = await User.findOne({ where: { id: userData.id } });

      const tokens = tokenService.generateTokens({
         id: user!.id,
         email: user!.email,
         role: user!.role,
      });
      await tokenService.saveToken(user!.id, tokens.refreshToken);
      res.cookie('refreshToken', tokens.refreshToken, {
         maxAge: 30 * 24 * 60 * 60 * 1000,
         httpOnly: true,
      });
      return res.json({ token: tokens.accessToken });
   }

   async forgotPassword(
      req: IForgotPasswordRequest,
      res: Response,
      next: NextFunction,
   ) {
      const { email } = req.body;
      const userData = await User.findOne({ where: { email } });
      if (!userData) {
         return next(
            ApiError.badRequest(
               'Користувач з такою електроною поштою не існує',
            ),
         );
      }
      const forgotToken = await tokenService.generateForgotToken(userData.id);
      mailService.sendForgotPasswordMail(
         email,
         process.env.CLIENT_URL + '/forgot/' + userData.id + '/' + forgotToken,
      );
      return res.status(200).json({
         message:
            'На електрону пошту надіслано лист з посиланням для зміни паролю',
      });
   }
   async checkForgotToken(
      req: ICheckForgotRequest,
      res: Response,
      next: NextFunction,
   ) {
      const { id, token } = req.params;
      const tokenData = await ForgotToken.findOne({
         where: { userId: +id },
      });
      if (!tokenData) {
         return next(ApiError.badRequest('Не вірні данні для зміни паролю'));
      }
      const compareTokens = bcrypt.compareSync(token, tokenData.forgotToken);
      if (!compareTokens) {
         return next(ApiError.badRequest('Не вірні данні для зміни паролю'));
      }
      const validateForgotToken = await tokenService.validateForgotToken(
         +id,
         token,
      );
      if (!validateForgotToken) {
         return next(
            ApiError.badRequest(
               'Час для зміни паролю за цим посиланням вичерпаний',
            ),
         );
      }
      return res.status(200).json({ message: 'Токен валідний', token });
   }

   async forgotPasswordChange(
      req: IForgotPasswordChangeRequest,
      res: Response,
      next: NextFunction,
   ) {
      const { userId, password, token } = req.body;
      const userData = await User.findOne({ where: { id: userId } });
      if (!userData) {
         return next(
            ApiError.badRequest(
               'Користувач з такою електроною поштою не існує',
            ),
         );
      }
      const tokenData = await ForgotToken.findOne({
         where: { userId },
      });
      if (!tokenData) {
         return next(ApiError.badRequest('Не вірні данні для зміни паролю'));
      }
      const compareTokens = bcrypt.compareSync(token, tokenData.forgotToken);
      if (!compareTokens) {
         return next(ApiError.badRequest('Не вірні данні для зміни паролю'));
      }
      const validateForgotToken = await tokenService.validateForgotToken(
         userId,
         token,
      );
      if (!validateForgotToken) {
         return next(
            ApiError.badRequest(
               'Час для зміни паролю за цим посиланням вичерпаний',
            ),
         );
      }
      const hashPassword = await bcrypt.hash(password, 5);
      await User.update({ password: hashPassword }, { where: { id: userId } });
      await ForgotToken.destroy({ where: { userId } });
      await mailService.sendChangePasswordSuccessMail(userData.email);
      return res.status(200).json({ message: 'Пароль змінено успішно' });
   }
}

export default new userController();
