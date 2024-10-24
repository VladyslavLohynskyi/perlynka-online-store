import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BasicInput } from '../../../ui/BasicInput';
import { Button } from '../../../ui/Button';
import { ButtonClassEnum } from '../../../ui/Button/ButtonType';
import { RoutesEnum, phoneNumberPattern } from '../../../../utils/constants';
import { userSlice } from '../../../../store/reducers/user/UserSlice';
import { registrationUser } from '../../../../store/reducers/user/UserActionCreators';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import PhoneInput from 'react-phone-input-2';

const SignUp = () => {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const { error } = useAppSelector((state) => state.userReducer);
   const [name, setName] = useState('');
   const [surname, setSurname] = useState('');
   const [email, setEmail] = useState('');
   const [phoneNumber, setPhoneNumber] = useState('');
   const [isValidatedPhoneNumber, setIsValidatedPhoneNumber] = useState(true);
   const [isValidatedPassword, setIsValidatedPassword] = useState(true);
   const [customError, setCustomError] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const handleClickSubmitAuth = async (
      e: React.FormEvent<HTMLFormElement>,
   ) => {
      e.preventDefault();
      if (!phoneNumberPattern.test(phoneNumber)) {
         setIsValidatedPhoneNumber(false);
         setCustomError('Телефоний номер не валідний');
         return;
      }
      if (password !== confirmPassword) {
         setIsValidatedPassword(false);
         setCustomError('Паролі не збігаються');
         return;
      }
      await dispatch(
         registrationUser({ email, password, surname, name, phoneNumber }),
      );
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
            {customError && <h3 className='auth__error'>{customError}</h3>}
            <BasicInput
               name={'name'}
               type='text'
               value={name}
               onChange={(e) => setName(e.target.value)}
               required={true}
               placeholder="Ім'я"
            />
            <BasicInput
               name={'surname'}
               type='text'
               value={surname}
               onChange={(e) => setSurname(e.target.value)}
               required={true}
               placeholder='Прізвище'
            />
            <BasicInput
               name={'email'}
               type='email'
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               required={true}
               placeholder='Пошта'
            />
            <PhoneInput
               country={'ua'}
               onlyCountries={['ua']}
               inputClass='basic-input'
               inputStyle={{
                  width: '100%',
                  fontSize: '12px',
                  border: `1.5px solid ${
                     isValidatedPhoneNumber ? '#d9d7d7' : 'rgb(156, 5, 5)'
                  }`,
               }}
               buttonStyle={{
                  border: `1.5px solid ${
                     isValidatedPhoneNumber ? '#d9d7d7' : 'rgb(156, 5, 5)'
                  }`,
               }}
               containerStyle={{ marginBottom: '15px' }}
               disableDropdown={true}
               countryCodeEditable={false}
               inputProps={{
                  name: 'phone',
                  required: true,
               }}
               value={phoneNumber}
               onChange={(e) => {
                  setCustomError('');
                  setIsValidatedPhoneNumber(true);
                  setPhoneNumber(e);
               }}
            />
            <BasicInput
               type='password'
               value={password}
               onChange={(e) => {
                  setCustomError('');
                  setIsValidatedPassword(true);
                  setPassword(e.target.value);
               }}
               style={{
                  border: `1.5px solid ${
                     isValidatedPassword ? '#d9d7d7' : 'rgb(156, 5, 5)'
                  }`,
               }}
               minLength={8}
               placeholder='Пароль'
            />
            <BasicInput
               type='password'
               value={confirmPassword}
               style={{
                  border: `1.5px solid ${
                     isValidatedPassword ? '#d9d7d7' : 'rgb(156, 5, 5)'
                  }`,
               }}
               onChange={(e) => {
                  setCustomError('');
                  setIsValidatedPassword(true);
                  setConfirmPassword(e.target.value);
               }}
               minLength={8}
               placeholder='Підтвердіть пароль'
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
