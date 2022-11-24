import { sequelize } from '../db';
import { DataTypes, Model, Optional } from 'sequelize';

interface sizeAttributes {
   id: number;
   size: number;
}

interface sizeCreationAttributes extends Optional<sizeAttributes, 'id'> {}

interface seasonInstance
   extends Model<sizeAttributes, sizeCreationAttributes>,
      sizeAttributes {
   createdAt?: Date;
   updatedAt?: Date;
}

const Size = sequelize.define<seasonInstance>('size', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   size: { type: DataTypes.INTEGER, allowNull: false, unique: true },
});

export default Size;
