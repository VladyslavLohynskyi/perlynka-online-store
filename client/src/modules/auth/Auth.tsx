import { useLocation } from 'react-router-dom';
import { RoutesEnum } from '../../utils/constants';
import './Auth.scss';
import Login from './сomponents/Login/Login';
import SignUp from './сomponents/SignUp/SignUp';
import ForgotPassword from './сomponents/ForgotPassword/ForgotPassword';
const Auth = () => {
   const location = useLocation();
   return (
      <div className='auth'>
         <div className='auth__container'>
            {location.pathname === RoutesEnum.LOGIN ? (
               <Login />
            ) : location.pathname === RoutesEnum.REGISTRATION ? (
               <SignUp />
            ) : (
               <ForgotPassword />
            )}
         </div>
      </div>
   );
};

export default Auth;
