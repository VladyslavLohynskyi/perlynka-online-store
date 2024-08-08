import { ReactNode } from 'react';
import { DescriptionAccordionNamesEnum } from '../Descriptions/Descriptions';

export interface DescriptionsItemType {
   children: ReactNode;
   descriptionAccordionActiveName: DescriptionAccordionNamesEnum;
   title: string;
   value: DescriptionAccordionNamesEnum;
   setDescriptionAccordionActiveName: React.Dispatch<
      React.SetStateAction<DescriptionAccordionNamesEnum>
   >;
}
