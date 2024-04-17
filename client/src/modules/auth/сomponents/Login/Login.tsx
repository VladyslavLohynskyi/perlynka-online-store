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
            <h2 className='auth__header'>Login</h2>
            {error && <h3 className='auth__error'>{error}</h3>}
            <BasicInput
               className='auth__input'
               autoFocus={true}
               name={'email'}
               type='email'
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               required={true}
            />
            <input
               className='auth__input'
               type='password'
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               minLength={8}
            />
            <Button
               buttonText={'Увійти'}
               buttonClass={
                  error ? ButtonClassEnum.DELETE : ButtonClassEnum.PRIMARY
               }
            />
         </form>
         <Button
            buttonText={'Немає акаута?'}
            buttonClass={ButtonClassEnum.LINK}
            buttonClick={() => handleClickChangeAuth(RoutesEnum.REGISTRATION)}
         />
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
