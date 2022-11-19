import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import {
   loginUser,
   registrationUser,
} from '../../store/reducers/user/UserActionCreatores';
import { RoutesEnum } from '../../utils/constants';
import './Auth.scss';
const Auth = () => {
   const dispatch = useAppDispatch();
   const location = useLocation();
   const navigate = useNavigate();
   const isLogin = location.pathname === RoutesEnum.LOGIN;
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const handleClickSubmitAuth = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (isLogin) {
         return dispatch(loginUser({ email, password }));
      }
      return dispatch(registrationUser({ email, password }));
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
               <button className='button--submit' type='submit'>
                  {isLogin ? 'Увійти' : 'Зареєструватись'}
               </button>
            </form>
            <button className='button--link' onClick={handleClickChangeAuth}>
               {isLogin ? 'Немає акауту?' : 'Є акаунт?'}
            </button>
         </div>
      </div>
   );
};

export default Auth;
