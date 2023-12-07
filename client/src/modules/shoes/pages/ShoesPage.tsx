import React, { useEffect, useState } from 'react';

import './ShoesPage.scss';
import { useParams } from 'react-router-dom';
import { IParticularShoes, getShoesById } from '../../../http/shoes';

export const ShoesPage: React.FC = () => {
   const { id } = useParams();
   const [currentShoes, setCurrentShoes] = useState<IParticularShoes>();
   useEffect(() => {
      if (id) getShoesById(+id).then((shoes) => setCurrentShoes(shoes));
   }, []);
   return (
      <div className='shoes-page__container'>
         {currentShoes?.id}
         {currentShoes?.brand.name}
         {currentShoes?.model}
         {currentShoes?.price}
      </div>
   );
};
