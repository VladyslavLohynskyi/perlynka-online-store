import React from 'react';
import { ModalSearchType } from './ModalSearchType';
import './ModalSearch.scss';
import { ModalInput } from '../ModalInput';
import { IconButton } from '../../../../../ui/IconButton';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export const ModalSearch: React.FC<ModalSearchType> = ({
   handleSubmitId,
   id,
   setId,
   text,
}) => {
   return (
      <form
         onSubmit={(e) => {
            e.preventDefault();
            handleSubmitId();
         }}
         className='search-modal__container'
      >
         <ModalInput
            text='Індефікатор'
            placeholder={text}
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
   );
};
