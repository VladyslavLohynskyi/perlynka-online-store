import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../ui/Button';
import { ButtonClassEnum } from '../../../ui/Button/ButtonType';
import { RoutesEnum } from '../../../../utils/constants';
import userReq from '../../../../http/users';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ChangePassword = () => {
   const { id, token } = useParams();
   useEffect(() => {
      if (id && token) {
         userReq
            .checkForgotToken(id, token)
            .catch(() => navigate(RoutesEnum.SHOP));
      } else navigate(RoutesEnum.SHOP);
   }, []);
   const navigate = useNavigate();
   const [password, setPassword] = useState('');
   const [isChanged, setIsChanged] = useState(false);
   const [error, setError] = useState('');

   const handleClickSubmitAuth = async (
      e: React.FormEvent<HTMLFormElement>,
   ) => {
      e.preventDefault();
   };

   const handleClickMain = async () => {
      try {
         await userReq.forgotPasswordChange(id!, password, token!);
         setIsChanged(true);
      } catch (error) {
         if (axios.isAxiosError(error)) {
            setError(error.response?.data.message);
         }
      }
   };

   return (
      <div className='auth'>
         <div className='auth__container'>
            <form className='auth__form' onSubmit={handleClickSubmitAuth}>
               <h2 className='auth__header'>Форма зміни паролю</h2>
               {error && <h3 className='auth__error'>{error}</h3>}
               <input
                  className='auth__input'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={8}
               />
               <Button
                  buttonText={'Підтвердити'}
                  buttonClass={ButtonClassEnum.PRIMARY}
                  buttonClick={handleClickMain}
                  disabled={isChanged}
               />
            </form>
            {isChanged && (
               <p className='auth__message'>Пароль було змінено успішно</p>
            )}
            <Button
               buttonText={'На головну'}
               buttonClass={ButtonClassEnum.LINK}
               buttonClick={() => navigate(RoutesEnum.SHOES)}
            />
         </div>
      </div>
   );
};

export default ChangePassword;
