export interface SizeEditItemType {
   size: string;
   id: string;
   onChangeSize: (sizeId: number, count: number) => void;
   value?: number;
}
