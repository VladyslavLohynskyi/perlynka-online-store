export enum AlertTypeEnum {
   SUCCESS = 'success',
   DANGER = 'danger',
}

export interface AlertType {
   show: boolean;
   onClose: () => void;
   type: AlertTypeEnum;
   message: string;
}
