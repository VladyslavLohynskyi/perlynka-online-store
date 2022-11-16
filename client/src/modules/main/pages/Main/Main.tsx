import React, { useEffect, useState } from 'react';
import { getRoot } from '../../../../http';
import './Main.scss';

export const Main: React.FC = () => {
   const [initialData, setInitialData] = useState('');
   useEffect(() => {
      getRoot().then((data) => setInitialData(data));
   }, []);
   return <div className='main'>{initialData}</div>;
};
