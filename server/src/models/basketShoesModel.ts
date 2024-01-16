import { sequelize } from '../db';
import { DataTypes, Model, Optional } from 'sequelize';
interface basketShoesAttributes {
   id: number;
   count: number;
   basketId: number;
   shoId: number;
   sizeId: number;
}

interface basketShoesCreationAttributes
   extends Optional<basketShoesAttributes, 'id'> {}

interface basketInstance
   extends Model<basketShoesAttributes, basketShoesCreationAttributes>,
      basketShoesAttributes {
   createdAt?: Date;
   updatedAt?: Date;
}

const BasketShoes = sequelize.define<basketInstance>('basket_shoes', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   count: { type: DataTypes.INTEGER, defaultValue: 1 },
   basketId: { allowNull: false, type: DataTypes.INTEGER },
   shoId: { allowNull: false, type: DataTypes.INTEGER },
   sizeId: { allowNull: false, type: DataTypes.INTEGER },
});

export default BasketShoes;
