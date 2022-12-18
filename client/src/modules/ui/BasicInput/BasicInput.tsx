import React from 'react';
import { BasicInputType } from './BasicInputType';
import './BasicInput.scss';

export const BasicInput: React.FC<BasicInputType> = ({ ...props }) => {
   return <input className='basic-input' {...props} />;
};
