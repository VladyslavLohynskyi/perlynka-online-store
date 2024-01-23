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
   disabled,
   ...props
}) => {
   return (
      <button
         className={`button button--${buttonClass} ${additionalClass} ${
            disabled && 'button--disable'
         }`}
         onClick={buttonClick}
         style={{ width }}
         disabled={disabled}
         {...props}
      >
         <span>{buttonText}</span>
         {children && <div className='button__icon'>{children}</div>}
      </button>
   );
};
