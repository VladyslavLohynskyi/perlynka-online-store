import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import User from '../models/userModel';
import Basket from '../models/basketModel';

interface userRegistrationRequest extends Request {
   body: {
      email: string;
      password: string;
      role: string;
   };
}

interface userLoginRequest extends Request {
   body: {
      email: string;
      password: string;
   };
}

const generateJwt = (id: number, email: string, role: string) => {
   return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
      expiresIn: '24h',
   });
};

class userController {
   async registration(req: userRegistrationRequest, res: Response) {
      console.log('FIESTA');
      const { email, password, role } = req.body;
      if (!email || !password) {
         return res.json('Uncorect email or password');
      }
      const candidate = await User.findOne({ where: { email } });
      if (candidate) {
         return res.json('User with this email has already exist');
      }
      const hashPassword = await bcrypt.hash(password, 5);
      const user = await User.create({
         email,
         role,
         password: hashPassword,
      });
      const basket = await Basket.create({ userId: user.id });
      const token = generateJwt(user.id, user.email, user.role);
      return res.json({ token });
   }

   async login(req: userLoginRequest, res: Response) {
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
}

export default new userController();
