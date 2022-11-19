import React from 'react';
import AppRouter from '../../../appRouter/AppRouter';
import { Header } from '../../../ui/Header';
import './Main.scss';

export const Main: React.FC = () => {
   return (
      <div className='main'>
         <Header />
         <AppRouter />
      </div>
   );
};
