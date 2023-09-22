import React, { useState } from 'react';
import './DeleteShoesModal.scss';
import { DeleteShoesModalType } from './DeleteShoesModalType';
import { ModalHeader } from '../../components/ModalHeader';
import { ModalInput } from '../../components/ModalInput';
import { IconButton } from '../../../../../ui/IconButton';
import { getShoesById } from '../../../../../../http/shoes';
import { IShoes } from '../../../../../../store/reducers/shoes/ShoesSlice';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { baseURL } from '../../../../../../utils/constants';
import { Button } from '../../../../../ui/Button';
import { deleteShoes } from '../../../../../../store/reducers/shoes/ShoesActionCreatores';
import { useAppDispatch } from '../../../../../../hooks/redux';
export const DeleteShoesModal: React.FC<DeleteShoesModalType> = ({
   onClose,
}) => {
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
   return (
      <div className='delete-shoes-modal__container'>
         <ModalHeader text='Видалити нове взуття' onClose={onClose} />
         <div className='edit-shoes-modal__main'>
            <form
               onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmitId();
               }}
               className='delete-shoes-modal__search'
            >
               <ModalInput
                  text='Індефікатор'
                  placeholder='Введіть ID'
                  type='number'
                  required={true}
                  value={id}
                  onChange={(e) => setId(Number(e.target.value))}
                  min={1}
               />
               <IconButton
                  icon={faSearch}
                  onClick={handleSubmitId}
                  style={{ marginTop: '10px' }}
               />
            </form>
            {error && <p className='delete-shoes-modal__error'>{error}</p>}
            {foundShoes && (
               <div className='delete-shoes-modal__shoes-view'>
                  <div className='delete-shoes-modal___shoes-view-container'>
                     <img src={baseURL + foundShoes.img} />
                     <div>
                        <p>Модель: {foundShoes.model}</p>
                        <p>Ціна: {foundShoes.price}</p>
                        <p>Бренд: {foundShoes.brandId}</p>
                        <p>Тип: {foundShoes.typeId}</p>
                        <p>Сезон: {foundShoes.seasonId}</p>
                        <p>Колір: {foundShoes.colorId}</p>
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
