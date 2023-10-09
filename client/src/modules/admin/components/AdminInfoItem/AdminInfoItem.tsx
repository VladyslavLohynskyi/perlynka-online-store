import React from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import './AdminInfoItem.scss';
import { AdminInfoItemType } from './AdminInfoItemType';
import { IconButton } from '../../../ui/IconButton';

export const AdminInfoItem: React.FC<AdminInfoItemType> = ({ admin }) => {
   return (
      <div className='admin__container'>
         <div className='admin__info'>
            #{admin.id} {admin.email}
         </div>
         <IconButton icon={faTrash} />
      </div>
   );
};
