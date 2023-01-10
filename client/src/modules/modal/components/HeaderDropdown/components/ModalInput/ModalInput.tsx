import React from 'react';
import { ModalInputType } from './ModalInputType';
import './ModalInput.scss';
import { BasicInput } from '../../../../../ui/BasicInput';

export const ModalInput: React.FC<ModalInputType> = ({
    text, ...props
}) => {
   return  (   
    <div className='modal-input__container'>
        <label className='modal-input__label'>{text}</label>
        <BasicInput {...props}/>
    </div>
    )
};