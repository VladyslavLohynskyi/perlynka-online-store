import React from 'react';
import './HorizontalLine.scss';
import { HorizontalLineType } from './HorizontalLineType';

export const HorizontalLine: React.FC<HorizontalLineType> = ({ ...props }) => {
   return <div className='horizontal-line' {...props}></div>;
};
