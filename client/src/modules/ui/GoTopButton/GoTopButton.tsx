import React, { useEffect, useState } from 'react';
import { Button } from '../Button';
import { ButtonClassEnum } from '../Button/ButtonType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

export const GoTopButton: React.FC = () => {
   const [isVisible, setIsVisible] = useState(false);

   const toggleVisibility = () => {
      if (window.scrollY > 350) {
         setIsVisible(true);
      } else {
         setIsVisible(false);
      }
   };
   const handleClick = () => {
      window.window.scrollTo({
         top: 0,
         behavior: 'smooth',
      });
   };

   useEffect(() => {
      window.addEventListener('scroll', toggleVisibility);
      return () => {
         window.removeEventListener('scroll', toggleVisibility);
      };
   }, []);

   return (
      <Button
         buttonClass={ButtonClassEnum.GO_TOP}
         onClick={handleClick}
         style={{
            opacity: isVisible ? 0.75 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(100px)',
            pointerEvents: isVisible ? 'auto' : 'none',
         }}
      >
         <FontAwesomeIcon icon={faArrowUp} />
      </Button>
   );
};
