import { useAppSelector } from '../../../hooks/redux';
import { BasicInput } from '../../ui/BasicInput';
import { IconButton } from '../../ui/IconButton';
import { faPenToSquare, faCheck } from '@fortawesome/free-solid-svg-icons';
import './Profile.scss';
import { useState } from 'react';
import UserReq from '../../../http/users';
import axios from 'axios';
import Alert from '../../ui/Alert/Alert';
import { AlertTypeEnum } from '../../ui/Alert/AlertType';

const Profile = () => {
   const { user } = useAppSelector((state) => state.userReducer);
   const [isDisabledName, setIsDisabledName] = useState<boolean>(true);
   const [name, setName] = useState(user?.name);
   const [isDisabledSurname, setIsDisabledSurname] = useState<boolean>(true);
   const [surname, setSurname] = useState(user?.surname);
   const [showAlertNotification, setShowAlertNotification] =
      useState<boolean>(false);
   const [alertNotificationMessage, setAlertNotificationMessage] = useState('');
   const handleClickChangePassword = async () => {
      try {
         await UserReq.sendForgotPasswordLink(user!.email);
         setAlertNotificationMessage(
            'Повідомлення нарахунок підвердження зміни паролю надіслано на вашу пошту',
         );
         setShowAlertNotification(true);
      } catch (error) {}
   };
   return (
      <div className='profile'>
         <div className='profile__container'>
            <div className='profile__main'>
               <h2>Профіль користувача</h2>
               <div className='profile__info-container'>
                  <label>
                     <span>Пошта:</span>
                     <BasicInput
                        disabled
                        style={{ height: '30px', fontSize: '14px' }}
                        value={user?.email}
                     />
                  </label>
                  <label>
                     <span>Ім'я:</span>
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
                        onClick={() => setIsDisabledName((prev) => !prev)}
                     />
                  </label>
                  <label>
                     <span>Прізвище:</span>
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
                              !isDisabledSurname && name !== user?.name
                                 ? 'green'
                                 : '#000',
                        }}
                        onClick={() => setIsDisabledSurname((prev) => !prev)}
                     />
                  </label>
                  <label>
                     <span>Пароль:</span>
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
                  </label>
               </div>
            </div>
         </div>
         <Alert
            type={AlertTypeEnum.SUCCESS}
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
