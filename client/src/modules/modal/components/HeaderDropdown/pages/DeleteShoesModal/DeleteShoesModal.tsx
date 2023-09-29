import React, { useState } from 'react';
import './DeleteShoesModal.scss';
import { DeleteShoesModalType } from './DeleteShoesModalType';
import { ModalHeader } from '../../components/ModalHeader';
import { getShoesById } from '../../../../../../http/shoes';
import { IShoes } from '../../../../../../store/reducers/shoes/ShoesSlice';
import { baseURL } from '../../../../../../utils/constants';
import { Button } from '../../../../../ui/Button';
import { deleteShoes } from '../../../../../../store/reducers/shoes/ShoesActionCreatores';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/redux';
import { ModalSearch } from '../../components/ModalSearch/';
export const DeleteShoesModal: React.FC<DeleteShoesModalType> = ({
   onClose,
}) => {
   const { brands, types, colors, seasons } = useAppSelector(
      (state) => state.shoesReducer,
   );
   const [id, setId] = useState<number>(0);
   const [error, setError] = useState('');
   const [foundShoes, setFoundShoes] = useState<null | IShoes>(null);
   const dispatch = useAppDispatch();
   const handleSubmitId = async () => {
      setError('');
      setFoundShoes(null);
      getShoesById(id)
         .then((data) => setFoundShoes(data))
         .catch((e) => setError(e.response.data));
   };

   const handleChangeId = (newId: string) => {
      setId(Number(newId));
   };
   return (
      <div className='delete-shoes-modal__container'>
         <ModalHeader text='Видалити нове взуття' onClose={onClose} />
         <div className='edit-shoes-modal__main'>
            <ModalSearch
               label='Індефікатор'
               value={id}
               setValue={handleChangeId}
               handleSubmitValue={handleSubmitId}
               type={'number'}
               text='Введіть ID'
            />
            {error && <p className='modal__error'>{error}</p>}
            {foundShoes && (
               <div className='delete-shoes-modal__shoes-view'>
                  <div className='delete-shoes-modal___shoes-view-container'>
                     <div className='delete-shoes-modal___shoes-view-img-container'>
                        <img
                           style={{ width: '100%' }}
                           src={baseURL + foundShoes.img}
                           alt='Взуття'
                        />
                     </div>

                     <div className='delete-shoes-modal___shoes-view-info-container'>
                        <p>Модель: {foundShoes.model}</p>
                        <p>Ціна: {foundShoes.price}</p>
                        <p>
                           Бренд:{' '}
                           {
                              brands?.find(
                                 (brand) => foundShoes.brandId === +brand.id,
                              )?.name
                           }
                        </p>
                        <p>
                           Тип:{' '}
                           {
                              types?.find(
                                 (type) => foundShoes.typeId === +type.id,
                              )?.name
                           }
                        </p>
                        <p>
                           Сезон:{' '}
                           {
                              seasons?.find(
                                 (season) => foundShoes.seasonId === +season.id,
                              )?.name
                           }
                        </p>
                        <p>
                           Колір:{' '}
                           {
                              colors?.find(
                                 (color) => foundShoes.colorId === +color.id,
                              )?.name
                           }
                        </p>
                     </div>
                  </div>
                  <div>
                     <Button
                        disabled={foundShoes ? false : true}
                        buttonClass='delete'
                        buttonText='Видалити'
                        buttonClick={() => {
                           dispatch(deleteShoes(id));
                           onClose();
                        }}
                     />
                  </div>
               </div>
            )}
         </div>
      </div>
   );
};
