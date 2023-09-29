import React from 'react';
import { ModalSearchType } from './ModalSearchType';
import './ModalSearch.scss';
import { ModalInput } from '../ModalInput';
import { IconButton } from '../../../../../ui/IconButton';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export const ModalSearch: React.FC<ModalSearchType> = ({
   handleSubmitValue,
   value,
   setValue,
   text,
   type,
   label,
}) => {
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
   };
   return (
      <form
         onSubmit={(e) => {
            e.preventDefault();
            handleSubmitValue();
         }}
         className='search-modal__container'
      >
         <ModalInput
            text={label}
            placeholder={text}
            type={type}
            required={true}
            value={value}
            onChange={handleChange}
         />
         <IconButton
            icon={faSearch}
            style={{ marginTop: '10px' }}
            onClick={handleSubmitValue}
         />
      </form>
   );
};
