import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
   loginUser,
   registrationUser,
} from '../../store/reducers/user/UserActionCreators';
import { RoutesEnum } from '../../utils/constants';
import './Auth.scss';
import { Button } from '../ui/Button';
import { ButtonClassEnum } from '../ui/Button/ButtonType';
import { synchronizeBaskets } from '../../store/reducers/basket/BasketActionCreators';
const Auth = () => {
   const dispatch = useAppDispatch();
   const location = useLocation();
   const navigate = useNavigate();
   const isLogin = location.pathname === RoutesEnum.LOGIN;
   const { basket } = useAppSelector((state) => state.basketReducer);
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const handleClickSubmitAuth = async (
      e: React.FormEvent<HTMLFormElement>,
   ) => {
      e.preventDefault();
      if (isLogin) {
         await dispatch(loginUser({ email, password }));
         const shoes = basket.map(({ sho, size, count }) => {
            return { shoId: sho.id, sizeId: +size.id, count };
         });
         await dispatch(synchronizeBaskets(shoes));
      } else {
         await dispatch(registrationUser({ email, password }));
      }
   };

   const handleClickChangeAuth = () => {
      if (isLogin) {
         return navigate(RoutesEnum.REGISTRATION);
      }
      return navigate(RoutesEnum.LOGIN);
   };

   return (
      <div className='auth'>
         <div className='auth__container'>
            <form className='auth__form' onSubmit={handleClickSubmitAuth}>
               <h2 className='auth__header'>
                  {isLogin ? 'Login' : 'Registration'}
               </h2>
               <input
                  className='auth__input'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
               />
               <input
                  className='auth__input'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={8}
               />
               <Button
                  buttonText={isLogin ? 'Увійти' : 'Зареєструватись'}
                  buttonClass={ButtonClassEnum.PRIMARY}
               />
            </form>
            <Button
               buttonText={isLogin ? 'Немає акаута?' : 'Є акаунт?'}
               buttonClass={ButtonClassEnum.LINK}
               buttonClick={handleClickChangeAuth}
            />
         </div>
      </div>
   );
};

export default Auth;
