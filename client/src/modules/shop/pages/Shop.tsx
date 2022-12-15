import React, { useState } from 'react';
import { useAppSelector } from '../../../hooks/redux';
import { Role } from '../../../store/reducers/user/UserSlice';
import { AddShoesModal } from '../../modal/components/HeaderDropdown';
import { Modal } from '../../modal/pages';
import { Button } from '../../ui/Button';
import { ShoesItem } from '../components/shoesItem';

import './Shop.scss';

export const Shop: React.FC = () => {
   const { user } = useAppSelector((state) => state.userReducer);
   const { shoes } = useAppSelector((state) => state.shoesReducer);
   const [isAddShoesModalOpened, setIsAddShoesModalOpened] = useState(false);
   return (
      <>
         <div className='shop'>
            <div className='shop__top'>
               {user?.role === Role.ADMIN && (
                  <Button
                     buttonText='Додати'
                     buttonClass='primary'
                     additionalClass='shop__add-button'
                     buttonClick={() => setIsAddShoesModalOpened(true)}
                  />
               )}
            </div>
            <div className='shop__container'>
               <aside className='shop__aside-filters'>Фільтри</aside>
               <section className='shop__shoes-list'>
                  {shoes &&
                     shoes.map((shoes) => (
                        <ShoesItem key={shoes.id} shoes={shoes} />
                     ))}
               </section>
            </div>
         </div>
         <Modal
            isModalOpen={isAddShoesModalOpened}
            onClose={() => setIsAddShoesModalOpened(false)}
            onBlur={true}
            modalPosition='add-shoes-modal-position'
         >
            <AddShoesModal onClose={() => setIsAddShoesModalOpened(false)} />
         </Modal>
      </>
   );
};
