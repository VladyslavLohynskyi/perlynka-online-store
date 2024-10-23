import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import User, { Role } from '../models/userModel';
import Basket from '../models/basketModel';
import { Op, where } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import mailService from '../services/mailService';
import tokenService from '../services/tokenService';
import ApiError from '../exceptions/ApiError';
import ForgotToken from '../models/forgotTokenModel';
import { authRequest } from '../middleware/authMiddleware';

interface userLoginRequest extends Request {
   body: {
      email: string;
      password: string;
   };
}
interface userRegistrationRequest extends Request {
   body: {
      email: string;
      name: string;
      surname: string;
      password: string;
      phoneNumber: string;
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
interface IUpdateUserDataRequest extends authRequest {
   body: {
      name: string;
      surname: string;
   };
}

class userController {
   async registration(
      req: userRegistrationRequest,
      res: Response,
      next: NextFunction,
   ) {
      try {
         const { email, password, name, surname, phoneNumber } = req.body;
         if (!email || !password || !phoneNumber || !name || !surname) {
            return next(
               ApiError.badRequest(
                  'Данні користувача повинні бути заповненими',
               ),
            );
         }
         const candidate = await User.findOne({ where: { email } });
         if (candidate?.isActivated) {
            return next(
               ApiError.badRequest('Користувач з таким email вже існує'),
            );
         }
         if (candidate && !candidate.isActivated) {
            const hashPassword = await bcrypt.hash(password, 5);
            const activationLink = uuidv4();
            await User.update(
               { name, surname, password: hashPassword, activationLink },
               { where: { id: candidate.id } },
            );
            await mailService.sendActivationMail(
               email,
               process.env.API_URL + '/api/user/activate/' + activationLink,
            );
            const tokens = tokenService.generateTokens({
               id: candidate.id,
               email,
               role: candidate.role,
            });
            await tokenService.saveToken(candidate.id, tokens.refreshToken);
            res.cookie('refreshToken', tokens.refreshToken, {
               maxAge: 30 * 24 * 60 * 60 * 1000,
               httpOnly: true,
            });
            return res.json({
               token: tokens.accessToken,
               message:
                  'На вашу електронну адресу надіслано лист для підтвердження пошти',
            });
         }
         const hashPassword = await bcrypt.hash(password, 5);
         const activationLink = uuidv4();
         const users = await User.findAll();
         const user = await User.create({
            email,
            name,
            surname,
            role: users.length ? Role.USER : Role.ADMIN,
            password: hashPassword,
            isActivated: false,
            activationLink,
            phoneNumber,
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
         return res.json({
            token: tokens.accessToken,
            message:
               'На вашу електронну адресу надіслано лист для підтвердження пошти',
         });
      } catch (error) {
         return next(
            ApiError.internalServer('Невідома помилка при реєстрації'),
         );
      }
   }

   async login(req: userLoginRequest, res: Response, next: NextFunction) {
      try {
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
               ApiError.Unauthorized(
                  'Ваша електронна адреса ще не підтверджена',
               ),
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
         const {
            password: _,
            activationLink,
            ...userWithoutPassword
         } = user.get({
            plain: true,
         });
         return res.json({
            token: tokens.accessToken,
            user: userWithoutPassword,
         });
      } catch (error) {
         return next(
            ApiError.internalServer('Невідома помилка при вході в аккаунт'),
         );
      }
   }

   async getUsersByRole(
      req: IGetUsersByRole,
      res: Response,
      next: NextFunction,
   ) {
      try {
         const { role } = req.query;
         const users = await User.findAll({ where: { role } });
         return res.json(users);
      } catch (error) {
         return next(
            ApiError.internalServer(
               'Невідома помилка при отримані ролі користувача',
            ),
         );
      }
   }

   async getUserByJWT(req: Request, res: Response, next: NextFunction) {
      try {
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
         return res.json({ message: 'Користувача знайденно', user });
      } catch (error) {
         return next(
            ApiError.internalServer(
               'Невідома помилка при отримані користувача',
            ),
         );
      }
   }

   async getUserByEmail(
      req: IGetUserByEmail,
      res: Response,
      next: NextFunction,
   ) {
      try {
         const { role, email } = req.query;
         const users = await User.findAll({
            where: {
               role,
               email: { [Op.startsWith]: email },
               isActivated: true,
            },
         });
         return res.json(users);
      } catch (error) {
         return next(
            ApiError.internalServer(
               'Невідома помилка при отримані користувача за емейлом',
            ),
         );
      }
   }

   async changeRole(req: IChangeRole, res: Response, next: NextFunction) {
      try {
         const { role, id } = req.body;
         const user = await User.findOne({ where: { id } });
         if (user) {
            await User.update({ role }, { where: { id } });
            return res.json({
               user,
               message: 'Права користувача успішно зміненні',
            });
         } else {
            return next(ApiError.notFound('Такого користувача не існує'));
         }
      } catch (error) {
         return next(
            ApiError.internalServer(
               'Невідома помилка при зміні ролі користувача',
            ),
         );
      }
   }

   async activate(req: Request, res: Response, next: NextFunction) {
      try {
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
      } catch (error) {
         return next(
            ApiError.internalServer('Невідома помилка при активації аккаунту'),
         );
      }
   }

   async logout(req: Request, res: Response, next: NextFunction) {
      try {
         const { refreshToken } = req.cookies;
         await tokenService.removeToken(refreshToken);
         res.clearCookie('refreshToken');
         return res.json({ message: 'Ви успішно вийшли з аккаунту' });
      } catch (error) {
         return next(
            ApiError.internalServer('Невідома помилка при виході з аккаунту'),
         );
      }
   }

   async refresh(req: Request, res: Response, next: NextFunction) {
      try {
         const { refreshToken } = req.cookies;
         if (!refreshToken) {
            return next(ApiError.Unauthorized('Не авторизований користувач'));
         }
         const userData = await tokenService.validateRefreshToken(refreshToken);
         const tokenFromDB = await tokenService.findToken(refreshToken);
         if (!userData || !tokenFromDB) {
            return next(ApiError.Unauthorized('Не авторизований користувач'));
         }
         const user = await User.findOne({
            where: { id: userData.id },
            attributes: { exclude: ['password', 'activationLink'] },
         });

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
         return res.json({ token: tokens.accessToken, user });
      } catch (error) {
         return next(
            ApiError.internalServer('Невідома помилка при оновленні токена'),
         );
      }
   }

   async forgotPassword(
      req: IForgotPasswordRequest,
      res: Response,
      next: NextFunction,
   ) {
      try {
         const { email } = req.body;
         const userData = await User.findOne({ where: { email } });
         if (!userData) {
            return next(
               ApiError.badRequest(
                  'Користувач з такою електроною поштою не існує',
               ),
            );
         }
         const forgotToken = await tokenService.generateForgotToken(
            userData.id,
         );
         mailService.sendForgotPasswordMail(
            email,
            process.env.CLIENT_URL +
               '/forgot-form/' +
               userData.id +
               '/' +
               forgotToken,
         );
         return res.status(200).json({
            message:
               'На електрону пошту надіслано лист з посиланням для зміни паролю',
         });
      } catch (error) {
         return next(
            ApiError.internalServer(
               'Невідома помилка при надсиланні повідомлення про зміну паролю',
            ),
         );
      }
   }
   async checkForgotToken(
      req: ICheckForgotRequest,
      res: Response,
      next: NextFunction,
   ) {
      try {
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
      } catch (error) {
         return next(
            ApiError.internalServer(
               'Невідома помилка при перевірці валідності токена для зміни паролю',
            ),
         );
      }
   }

   async forgotPasswordChange(
      req: IForgotPasswordChangeRequest,
      res: Response,
      next: NextFunction,
   ) {
      try {
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
         await User.update(
            { password: hashPassword },
            { where: { id: userId } },
         );
         await ForgotToken.destroy({ where: { userId } });
         await mailService.sendChangePasswordSuccessMail(userData.email);
         return res.status(200).json({ message: 'Пароль змінено успішно' });
      } catch (error) {
         return next(
            ApiError.internalServer(
               'Невідома помилка при зміні паролю користувача',
            ),
         );
      }
   }

   async updateUserData(
      req: IUpdateUserDataRequest,
      res: Response,
      next: NextFunction,
   ) {
      try {
         const { name, surname } = req.body;
         const userData = await User.findOne({
            where: { id: req.user?.id, email: req.user?.email },
         });
         if (!userData) {
            return next(ApiError.Unauthorized('Користувача не знайдено в db'));
         }
         const { password, activationLink, ...user } = userData.get({
            plain: true,
         });
         if (name || surname) {
            await User.update(
               {
                  name: name ? name : user.name,
                  surname: surname ? surname : user.surname,
               },
               { where: { id: user.id } },
            );
         } else {
            return next(
               ApiError.badRequest(
                  'Помилка валідації данних: значення не повинне бути пусте',
               ),
            );
         }
         return res.status(200).json({
            message: 'Дані користувача успішно змінено',
            user: {
               ...user,
               name: name ? name : user.name,
               surname: surname ? surname : user.surname,
            },
         });
      } catch (error) {
         console.log(error);
         return next(
            ApiError.internalServer(
               'Невідома помилка при змінні данних користувача',
            ),
         );
      }
   }
}

export default new userController();
