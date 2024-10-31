import { sequelize } from '../db';
import { DataTypes, Model, Optional } from 'sequelize';

interface OrderAttributes {
   id: number;
   status: string;
   totalPrice: number;
   email: string;
   name: string;
   surname: string;
   phone: string;
   paymentOption: string;
   deliveryOption: string;
   description?: string;
   settlementAreaDescription?: string;
   settlementDescription?: string;
   settlementTypeDescription?: string;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, 'id'> {}

interface OrderInstance
   extends Model<OrderAttributes, OrderCreationAttributes>,
      OrderAttributes {
   createdAt?: Date;
   updatedAt?: Date;
}

const Order = sequelize.define<OrderInstance>('order', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   status: {
      type: DataTypes.STRING,
      defaultValue: 'Очікування прийняття замовлення',
   },
   totalPrice: { type: DataTypes.FLOAT, allowNull: false },
   email: { type: DataTypes.STRING, allowNull: false },
   name: { type: DataTypes.STRING, allowNull: false },
   surname: { type: DataTypes.STRING, allowNull: false },
   phone: { type: DataTypes.STRING, allowNull: false },
   paymentOption: { type: DataTypes.STRING, allowNull: false },
   deliveryOption: { type: DataTypes.STRING, allowNull: false },
   description: { type: DataTypes.STRING, allowNull: true },
   settlementAreaDescription: { type: DataTypes.STRING, allowNull: true },
   settlementDescription: { type: DataTypes.STRING, allowNull: true },
   settlementTypeDescription: { type: DataTypes.STRING, allowNull: true },
});

export default Order;
