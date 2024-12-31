import { sequelize } from '../db';
import { DataTypes, Model, Optional } from 'sequelize';

interface OrderItemAttributes {
   id: number;
   orderId: number;
   shoeId: number;
   quantity: number;
   price: number;
   size: number;
}

interface OrderItemCreationAttributes
   extends Optional<OrderItemAttributes, 'id'> {}

interface OrderItemInstance
   extends Model<OrderItemAttributes, OrderItemCreationAttributes>,
      OrderItemAttributes {
   createdAt?: Date;
   updatedAt?: Date;
}

const OrderItem = sequelize.define<OrderItemInstance>('order_item', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   orderId: { type: DataTypes.INTEGER, allowNull: false },
   shoeId: { type: DataTypes.INTEGER, allowNull: false },
   quantity: { type: DataTypes.INTEGER, allowNull: false },
   price: { type: DataTypes.FLOAT, allowNull: false },
   size: { type: DataTypes.INTEGER, allowNull: false },
});

export default OrderItem;
