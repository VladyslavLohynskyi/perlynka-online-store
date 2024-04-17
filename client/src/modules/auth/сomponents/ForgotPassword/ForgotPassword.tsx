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

   const handleClickChangeAuth = async () => {
      return navigate(RoutesEnum.LOGIN);
   };

   return (
      <>
         <form className='auth__form' onSubmit={handleClickSubmitAuth}>
            <h2 className='auth__header'>Забув Пароль</h2>
            {error && <h3 className='auth__error'>{error}</h3>}
            <BasicInput
               className='auth__input'
               autoFocus={true}
               name={'email'}
               type='email'
               value={email}
               onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                  setIsSent(false);
               }}
               required={true}
            />
            <Button
               buttonText={'Підтвердити'}
               buttonClass={
                  error
                     ? ButtonClassEnum.DELETE
                     : isSent
                     ? ButtonClassEnum.DISABLE
                     : ButtonClassEnum.PRIMARY
               }
               disabled={isSent}
            />
         </form>
         {isSent && (
            <p className='auth__message'>
               На вашу вказану електронну пошту надіслано посилання для зміни
               паролю
            </p>
         )}
         <Button
            buttonText={'Є акаунт?'}
            buttonClass={ButtonClassEnum.LINK}
            buttonClick={handleClickChangeAuth}
         />
      </>
   );
};

export default ForgotPassword;
