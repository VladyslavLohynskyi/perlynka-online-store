import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BasicInput } from '../../../ui/BasicInput';
import { Button } from '../../../ui/Button';
import { ButtonClassEnum } from '../../../ui/Button/ButtonType';
import { RoutesEnum } from '../../../../utils/constants';
import userReq from '../../../../http/users';
import axios from 'axios';

const ForgotPassword = () => {
   const navigate = useNavigate();
   const [error, setError] = useState('');
   const [email, setEmail] = useState('');
   const [isSent, setIsSent] = useState(false);
   const handleClickSubmitAuth = async (
      e: React.FormEvent<HTMLFormElement>,
   ) => {
      e.preventDefault();
      try {
         await userReq.sendForgotPasswordLink(email);
         setIsSent(true);
      } catch (error) {
         if (axios.isAxiosError(error)) {
            setError(error.response?.data.message);
         }
      }
   };

   const handleClickChangeAuth = async (route: RoutesEnum) => {
      return navigate(route);
   };

   return (
      <>
         <form className='auth__form' onSubmit={handleClickSubmitAuth}>
            <h2 className='auth__header'>Забув Пароль</h2>
            {error && <h3 className='auth__error'>{error}</h3>}
            {isSent && (
               <p className='auth__message'>
                  На вашу вказану електронну пошту надіслано посилання для зміни
                  паролю
               </p>
            )}
            <div>
               <BasicInput
                  name={'email'}
                  type='email'
                  value={email}
                  onChange={(e) => {
                     setEmail(e.target.value);
                     setError('');
                     setIsSent(false);
                  }}
                  required={true}
                  placeholder='Пошта'
               />
            </div>
            <Button
               style={{ height: '38px' }}
               buttonText={'Підтвердити'}
               buttonClass={
                  isSent ? ButtonClassEnum.DISABLE : ButtonClassEnum.BUY
               }
               disabled={isSent}
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
         <p className='label-text auth__switch-btn'>
            Є аккаунт -
            <Button
               buttonText={'увійдіть'}
               buttonClass={ButtonClassEnum.LINK}
               buttonClick={() => handleClickChangeAuth(RoutesEnum.LOGIN)}
            />
         </p>
      </>
   );
};

export default ForgotPassword;
