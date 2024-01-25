import React from 'react';

import './BasicInput.scss';
import { BasicInputType } from './BasicInputType';

export const BasicInput: React.FC<BasicInputType> = ({ ...props }) => {
   return <input className='basic-input' {...props} />;
};
