import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import './Loader.scss';
import { LoaderType } from './LoaderType';

export const Loader: React.FC<LoaderType> = ({ className, ...props }) => {
   return (
      <div className={'loader__container ' + className} {...props}>
         <FontAwesomeIcon icon={faSpinner} size='3x' spin={true} />
      </div>
   );
};
