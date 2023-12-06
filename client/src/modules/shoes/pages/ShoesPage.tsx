import React from 'react';

import './ShoesPage.scss';
import { useParams } from 'react-router-dom';

export const ShoesPage: React.FC = () => {
   const { id } = useParams();
   return <div className='shoes-page__container'>{id}</div>;
};
