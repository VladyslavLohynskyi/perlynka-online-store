import React from 'react';

import './AdminInfoItem.scss';
import { AdminInfoItemType } from './AdminInfoItemType';
import { IconButton } from '../../../ui/IconButton';

export const AdminInfoItem: React.FC<AdminInfoItemType> = ({
   admin,
   icon,
   onClickButton,
}) => {
   return (
      <div className='admin__container'>
         <div className='admin__info'>
            #{admin.id} {admin.email}
         </div>
         <IconButton icon={icon} onClick={onClickButton} />
      </div>
   );
};
