import { ReactNode } from 'react';
import { DescriptionAccordionNamesEnum } from '../../pages';

export interface DescriptionsItemType {
   children: ReactNode;
   descriptionAccordionActiveName: DescriptionAccordionNamesEnum;
   title: string;
   value: DescriptionAccordionNamesEnum;
   setDescriptionAccordionActiveName: React.Dispatch<
      React.SetStateAction<DescriptionAccordionNamesEnum>
   >;
}
