import React from 'react';

export interface AdminShoesPanelSectionType {
   AddModalComponent: React.FC<AdminShoesModalType>;

   EditModalComponent: React.FC<AdminShoesModalType>;

   DeleteModalComponent: React.FC<AdminShoesModalType>;
}

interface AdminShoesModalType {
   onClose: () => void;
}
