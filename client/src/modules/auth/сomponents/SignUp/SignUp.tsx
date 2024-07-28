import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BasicInput } from '../../../ui/BasicInput';
import { Button } from '../../../ui/Button';
import { ButtonClassEnum } from '../../../ui/Button/ButtonType';
import { RoutesEnum } from '../../../../utils/constants';
import { userSlice } from '../../../../store/reducers/user/UserSlice';
import { registrationUser } from '../../../../store/reducers/user/UserActionCreators';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';

const SignUp = () => {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const { error } = useAppSelector((state) => state.userReducer);
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const handleClickSubmitAuth = async (
      e: React.FormEvent<HTMLFormElement>,
   ) => {
      e.preventDefault();
      await dispatch(registrationUser({ email, password }));
   };

   const handleClickChangeAuth = () => {
      dispatch(userSlice.actions.userClearError());
      return navigate(RoutesEnum.LOGIN);
   };

   return (
      <>
         <form className='auth__form' onSubmit={handleClickSubmitAuth}>
            <h2 className='auth__header'>Реєстрація</h2>
            {error && <h3 className='auth__error'>{error}</h3>}
            <BasicInput
               name={'email'}
               type='email'
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               required={true}
               placeholder='Пошта'
            />
            <BasicInput
               type='password'
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               minLength={8}
               placeholder='Пароль'
            />
            <Button
               style={{ height: '38px' }}
               buttonText={'Зареєструватись'}
               buttonClass={ButtonClassEnum.BUY}
            />
         </form>

         <p className='label-text auth__switch-btn'>
            Є аккаунт -
            <Button
               buttonText={'увійдіть'}
               buttonClass={ButtonClassEnum.LINK}
               buttonClick={handleClickChangeAuth}
            />
         </p>
      </>
   );
};

export default SignUp;
