import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import './Loader.scss';

export const Loader: React.FC = () => {
   return (
      <div className='loader__container'>
         <FontAwesomeIcon icon={faSpinner} size='3x' spin={true} />
      </div>
   );
};
