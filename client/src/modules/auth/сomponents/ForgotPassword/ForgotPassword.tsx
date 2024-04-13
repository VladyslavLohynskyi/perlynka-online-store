import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BasicInput } from '../../../ui/BasicInput';
import { Button } from '../../../ui/Button';
import { ButtonClassEnum } from '../../../ui/Button/ButtonType';
import { RoutesEnum } from '../../../../utils/constants';
import { userSlice } from '../../../../store/reducers/user/UserSlice';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';

const ForgotPassword = () => {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const { error } = useAppSelector((state) => state.userReducer);
   const [email, setEmail] = useState('');
   const handleClickSubmitAuth = async (
      e: React.FormEvent<HTMLFormElement>,
   ) => {
      e.preventDefault();
   };

   const handleClickChangeAuth = () => {
      dispatch(userSlice.actions.userClearError());
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
               onChange={(e) => setEmail(e.target.value)}
               required={true}
            />
            <Button
               buttonText={'Підтвердити'}
               buttonClass={
                  error ? ButtonClassEnum.DELETE : ButtonClassEnum.PRIMARY
               }
            />
         </form>
         <Button
            buttonText={'Є акаунт?'}
            buttonClass={ButtonClassEnum.LINK}
            buttonClick={handleClickChangeAuth}
         />
      </>
   );
};

export default ForgotPassword;
