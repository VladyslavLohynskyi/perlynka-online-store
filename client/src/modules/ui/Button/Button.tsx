import React from 'react';
import { ButtonPropsType } from './ButtonType';
import './Button.scss';

export const Button: React.FC<ButtonPropsType> = ({
   buttonClass,
   buttonText,
   buttonClick,
   additionalClass,
   children,
   width,
}) => {
   return (
      <button
         className={`button button--${buttonClass} ${additionalClass}`}
         onClick={buttonClick}
         style={{ width }}
      >
         <span>{buttonText}</span>
         <div className='button__icon'>{children}</div>
      </button>
   );
};
