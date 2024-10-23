import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { BasicInput } from '../../ui/BasicInput';
import { IconButton } from '../../ui/IconButton';
import { faPenToSquare, faCheck } from '@fortawesome/free-solid-svg-icons';
import './Profile.scss';
import { useState } from 'react';
import UserReq from '../../../http/users';
import Alert from '../../ui/Alert/Alert';
import { AlertTypeEnum } from '../../ui/Alert/AlertType';
import axios from 'axios';
import { updateUserData } from '../../../store/reducers/user/UserActionCreators';
import PhoneInput from 'react-phone-input-2';
import { phoneNumberPattern } from '../../../utils/constants';

const Profile = () => {
   const dispatch = useAppDispatch();
   const { user } = useAppSelector((state) => state.userReducer);
   const [isDisabledName, setIsDisabledName] = useState<boolean>(true);
   const [name, setName] = useState(user!.name);
   const [isDisabledSurname, setIsDisabledSurname] = useState<boolean>(true);
   const [surname, setSurname] = useState(user!.surname);
   const [showAlertNotification, setShowAlertNotification] =
      useState<boolean>(false);
   const [alertNotificationMessage, setAlertNotificationMessage] = useState('');
   const [isErrorNotificationMessage, setIsErrorNotificationMessage] =
      useState<boolean>(false);

   const [phoneNumber, setPhoneNumber] = useState(user!.phoneNumber);
   const [isDisabledPhoneNumber, setIsDisabledPhoneNumber] = useState(true);

   const handleClickChangePassword = async () => {
      try {
         await UserReq.sendForgotPasswordLink(user!.email);
         setIsErrorNotificationMessage(false);
         setAlertNotificationMessage(
            'Повідомлення нарахунок підвердження зміни паролю надіслано на вашу пошту',
         );
         setShowAlertNotification(true);
      } catch (error) {
         if (error instanceof axios.AxiosError) {
            setIsErrorNotificationMessage(true);
            setAlertNotificationMessage(error.message);
            setShowAlertNotification(true);
         }
      }
   };

   const handleSubmitChangeName = (name: string) => {
      if (!isDisabledName) {
         if (name === user?.name) {
            return setIsDisabledName((prev) => !prev);
         }
         if (!name) {
            setIsErrorNotificationMessage(true);
            setAlertNotificationMessage("Ім'я повинне бути заповненим");
            setShowAlertNotification(true);
            return;
         }
         dispatch(updateUserData({ name }));
      }
      setIsDisabledName((prev) => !prev);
   };

   const handleSubmitChangeSurname = (surname: string) => {
      if (!isDisabledSurname) {
         if (surname === user?.surname) {
            return setIsDisabledSurname((prev) => !prev);
         }
         if (!surname) {
            setIsErrorNotificationMessage(true);
            setAlertNotificationMessage('Прізвище повинне бути заповненим');
            setShowAlertNotification(true);
            return;
         }
         dispatch(updateUserData({ surname }));
      }
      setIsDisabledSurname((prev) => !prev);
   };

   const handleSubmitChangePhoneNumber = (phoneNumber: string) => {
      if (!isDisabledPhoneNumber) {
         if (
            phoneNumber === user?.phoneNumber ||
            phoneNumberPattern.test(phoneNumber)
         ) {
            return setIsDisabledPhoneNumber((prev) => !prev);
         }
      }
      setIsDisabledPhoneNumber((prev) => !prev);
   };
   return (
      <div className='profile'>
         <div className='profile__container'>
            <div className='profile__main'>
               <h2>Профіль користувача</h2>
               <div className='profile__info-container'>
                  <label>
                     <span>Пошта:</span>
                     <div className='profile__input-container'>
                        <BasicInput
                           disabled
                           style={{ height: '30px', fontSize: '14px' }}
                           value={user?.email}
                        />
                     </div>
                  </label>
                  <label>
                     <span>Ім'я:</span>
                     <div className='profile__input-container'>
                        <BasicInput
                           disabled={isDisabledName}
                           style={{ height: '30px', fontSize: '14px' }}
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                        />
                        <IconButton
                           icon={isDisabledName ? faPenToSquare : faCheck}
                           style={{
                              color:
                                 !isDisabledName && name !== user?.name
                                    ? 'green'
                                    : '#000',
                           }}
                           onClick={() => handleSubmitChangeName(name)}
                        />
                     </div>
                  </label>
                  <label>
                     <span>Прізвище:</span>
                     <div className='profile__input-container'>
                        <BasicInput
                           disabled={isDisabledSurname}
                           style={{ height: '30px', fontSize: '14px' }}
                           value={surname}
                           onChange={(e) => setSurname(e.target.value)}
                        />
                        <IconButton
                           icon={isDisabledSurname ? faPenToSquare : faCheck}
                           style={{
                              color:
                                 !isDisabledSurname && surname !== user?.surname
                                    ? 'green'
                                    : '#000',
                           }}
                           onClick={() => handleSubmitChangeSurname(surname)}
                        />
                     </div>
                  </label>
                  <label>
                     <span>Телефон:</span>
                     <div className='profile__input-container'>
                        <PhoneInput
                           disabled={isDisabledPhoneNumber}
                           country={'ua'}
                           onlyCountries={['ua']}
                           inputClass='basic-input'
                           inputStyle={{
                              width: '100%',
                              fontSize: '12px',
                              border: '1.5px solid #d9d7d7',
                              backgroundColor: isDisabledPhoneNumber
                                 ? '#EFEFEF4D'
                                 : '#fff',
                              height: '30px',
                           }}
                           buttonStyle={{
                              border: '1.5px solid #d9d7d7',
                           }}
                           disableDropdown={true}
                           countryCodeEditable={false}
                           inputProps={{
                              name: 'phone',
                              required: true,
                           }}
                           value={phoneNumber}
                           onChange={(e) => {
                              setPhoneNumber(e);
                           }}
                        />
                        <IconButton
                           icon={
                              isDisabledPhoneNumber ? faPenToSquare : faCheck
                           }
                           style={{
                              color:
                                 !isDisabledPhoneNumber &&
                                 phoneNumber !== user?.phoneNumber &&
                                 phoneNumberPattern.test(phoneNumber)
                                    ? 'green'
                                    : '#000',
                           }}
                           onClick={() =>
                              handleSubmitChangePhoneNumber(phoneNumber)
                           }
                        />
                     </div>
                  </label>
                  <label>
                     <span>Пароль:</span>
                     <div className='profile__input-container'>
                        <BasicInput
                           disabled
                           style={{ height: '30px', fontSize: '14px' }}
                           value={'...........'}
                           type='password'
                        />
                        <IconButton
                           icon={faPenToSquare}
                           onClick={handleClickChangePassword}
                        />
                     </div>
                  </label>
               </div>
            </div>
         </div>
         <Alert
            type={
               isErrorNotificationMessage
                  ? AlertTypeEnum.DANGER
                  : AlertTypeEnum.SUCCESS
            }
            show={showAlertNotification}
            onClose={() => {
               setShowAlertNotification(false);
               setAlertNotificationMessage('');
            }}
            message={alertNotificationMessage}
         />
      </div>
   );
};

export default Profile;
