import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../ui/Button';
import { ButtonClassEnum } from '../../../ui/Button/ButtonType';
import { RoutesEnum } from '../../../../utils/constants';
import userReq from '../../../../http/users';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BasicInput } from '../../../ui/BasicInput';
import { useAppDispatch } from '../../../../hooks/redux';
import { changeUserPassword } from '../../../../store/reducers/user/UserActionCreators';

const ChangePassword = () => {
   const { id, token } = useParams();
   const dispatch = useAppDispatch();
   useEffect(() => {
      if (id && token) {
         userReq
            .checkForgotToken(id, token)
            .catch(() => navigate(RoutesEnum.SHOP));
      } else navigate(RoutesEnum.SHOP);
   }, []);
   const navigate = useNavigate();
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [isValidatedPassword, setIsValidatedPassword] = useState(true);
   const [error, setError] = useState('');

   const handleClickSubmitAuth = async (
      e: React.FormEvent<HTMLFormElement>,
   ) => {
      e.preventDefault();
   };

   const handleClickMain = async () => {
      try {
         if (password !== confirmPassword) {
            setIsValidatedPassword(false);
            setError('Паролі не збігаються');
            return;
         }
         dispatch(changeUserPassword(id!, password, token!)).then(() =>
            navigate(RoutesEnum.SHOP),
         );
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
               <div>
                  <BasicInput
                     type='password'
                     value={password}
                     onChange={(e) => {
                        setError('');
                        setIsValidatedPassword(true);
                        setPassword(e.target.value);
                     }}
                     style={{
                        border: `1.5px solid ${
                           isValidatedPassword ? '#d9d7d7' : 'rgb(156, 5, 5)'
                        }`,
                     }}
                     minLength={8}
                     placeholder='Новий пароль'
                  />
               </div>
               <div>
                  <BasicInput
                     type='password'
                     value={confirmPassword}
                     style={{
                        border: `1.5px solid ${
                           isValidatedPassword ? '#d9d7d7' : 'rgb(156, 5, 5)'
                        }`,
                     }}
                     onChange={(e) => {
                        setError('');
                        setIsValidatedPassword(true);
                        setConfirmPassword(e.target.value);
                     }}
                     minLength={8}
                     placeholder='Підтвердіть пароль'
                  />
               </div>
               <Button
                  style={{ height: '38px' }}
                  buttonText={'Підтвердити'}
                  buttonClass={ButtonClassEnum.BUY}
                  buttonClick={handleClickMain}
               />
            </form>
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
