export enum NavItemEnum {
   BURGER_MENU_ITEM = 'burger-nav-item',
   DESKTOP_MENU_ITEM = 'desktop-nav-item',
}

export interface NavItemType {
   text: string;
   onClick?: () => void;
   type: NavItemEnum;
}
