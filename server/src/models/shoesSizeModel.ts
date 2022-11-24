import { sequelize } from '../db';
import { DataTypes, Model, Optional } from 'sequelize';

interface shoesSizeAttributes {
   id: number;
   count: number;
   shoId: number;
   sizeId: number;
}

interface shoesSizeCreationAttributes
   extends Optional<shoesSizeAttributes, 'id'> {}

interface shoesSizeInstance
   extends Model<shoesSizeAttributes, shoesSizeCreationAttributes>,
      shoesSizeAttributes {
   createdAt?: Date;
   updatedAt?: Date;
}

const ShoesSize = sequelize.define<shoesSizeInstance>('shoes_size', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   count: { type: DataTypes.INTEGER, defaultValue: 1 },
   shoId: { allowNull: false, type: DataTypes.INTEGER },
   sizeId: { allowNull: false, type: DataTypes.INTEGER },
});

export default ShoesSize;
