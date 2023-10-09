import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import User, { Role } from '../models/userModel';
import Basket from '../models/basketModel';
import { authRequest } from '../middleware/authMiddleware';

interface userRegistrationLoginRequest extends Request {
   body: {
      email: string;
      password: string;
   };
}

interface IGetUsersByRole extends Request {
   query: { role: Role };
}
const generateJwt = (id: number, email: string, role: string) => {
   return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
      expiresIn: '24h',
   });
};

class userController {
   async registration(req: userRegistrationLoginRequest, res: Response) {
      const { email, password } = req.body;
      if (!email || !password) {
         return res.json('Incorrect email or password');
      }
      const candidate = await User.findOne({ where: { email } });
      if (candidate) {
         return res.json('User with this email has already exist');
      }
      const hashPassword = await bcrypt.hash(password, 5);
      const users = await User.findAll();
      const user = await User.create({
         email,
         role: users.length ? Role.USER : Role.ADMIN,
         password: hashPassword,
      });
      const basket = await Basket.create({ userId: user.id });
      const token = generateJwt(user.id, user.email, user.role);
      return res.json({ token });
   }

   async login(req: userRegistrationLoginRequest, res: Response) {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
         return res.json('User with this email is not exist');
      }
      let comparePassword = bcrypt.compareSync(password, user.password);
      if (!comparePassword) {
         return res.json('Incorrect Password');
      }
      const token = generateJwt(user.id, user.email, user.role);
      return res.json({ token });
   }

   async check(req: authRequest, res: Response) {
      const token = generateJwt(req.user!.id, req.user!.email, req.user!.role);
      return res.json({ token });
   }

   async getUsersByRole(req: IGetUsersByRole, res: Response) {
      const { role } = req.query;
      const users = await User.findAll({ where: { role } });
      return res.json(users);
   }
}

export default new userController();
