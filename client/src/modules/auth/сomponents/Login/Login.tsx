import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BasicInput } from '../../../ui/BasicInput';
import { Button } from '../../../ui/Button';
import { ButtonClassEnum } from '../../../ui/Button/ButtonType';
import { RoutesEnum } from '../../../../utils/constants';
import { userSlice } from '../../../../store/reducers/user/UserSlice';
import { loginUser } from '../../../../store/reducers/user/UserActionCreators';

import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';

const Login = () => {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const { basket } = useAppSelector((state) => state.basketReducer);
   const { error } = useAppSelector((state) => state.userReducer);
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const handleClickSubmitAuth = async (
      e: React.FormEvent<HTMLFormElement>,
   ) => {
      e.preventDefault();
      const shoes = basket.map(({ sho, size, count }) => {
         return { shoId: sho.id, sizeId: +size.id, count };
      });
      await dispatch(loginUser({ email, password, shoes }));
   };

   const handleClickChangeAuth = (route: RoutesEnum) => {
      dispatch(userSlice.actions.userClearError());
      return navigate(route);
   };

   return (
      <>
         <form className='auth__form' onSubmit={handleClickSubmitAuth}>
            <h2 className='auth__header'>Вхід в обліковий запис</h2>
            {error && <h3 className='auth__error'>{error}</h3>}
            <div>
               <BasicInput
                  name={'email'}
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required={true}
                  placeholder='Пошта'
               />
            </div>
            <div>
               <BasicInput
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={8}
                  placeholder='Пароль'
               />
            </div>
            <Button
               style={{ height: '38px' }}
               buttonText={'Увійти'}
               buttonClass={ButtonClassEnum.BUY}
            />
         </form>
         <p className='label-text auth__switch-btn'>
            Немає аккаунта -
            <Button
               buttonText={'зареєструйтеся'}
               buttonClass={ButtonClassEnum.LINK}
               buttonClick={() =>
                  handleClickChangeAuth(RoutesEnum.REGISTRATION)
               }
            />
         </p>
         <Button
            buttonText={'Забув пароль'}
            buttonClass={ButtonClassEnum.LINK}
            buttonClick={() =>
               handleClickChangeAuth(RoutesEnum.FORGOT_PASSWORD)
            }
         />
      </>
   );
};

export default Login;
