import React, { useState } from 'react';
import AppRouter from '../../../appRouter/AppRouter';
import { Header } from '../../../ui/Header';
import './Main.scss';
import { Footer } from '../../../ui/Footer';

export const Main: React.FC = () => {
   const [isBurgerShowed, setIsBurgerShowed] = useState<boolean>(false);
   const handleSwitchBurgerShow = () => {
      setIsBurgerShowed((prev) => !prev);
   };
   return (
      <div className='main'>
         <Header
            isBurgerShowed={isBurgerShowed}
            handleSwitchBurgerShow={handleSwitchBurgerShow}
         />
         <AppRouter
            isBurgerShowed={isBurgerShowed}
            handleSwitchBurgerShow={handleSwitchBurgerShow}
         />
         <Footer />
      </div>
   );
};
