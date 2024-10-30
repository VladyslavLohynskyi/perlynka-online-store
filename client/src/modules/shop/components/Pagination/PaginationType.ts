export interface PaginationType {
   countOfShoesModels: number;
   page: number;
   limit: number;
   handleChangePage: (number: number) => void;
}
