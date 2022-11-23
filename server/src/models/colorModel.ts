import { sequelize } from '../db';
import { DataTypes, Model, Optional } from 'sequelize';
interface colorAttributes {
   id: number;
   name: string;
}

interface colorCreationAttributes extends Optional<colorAttributes, 'id'> {}

interface colorInstance
   extends Model<colorAttributes, colorCreationAttributes>,
      colorAttributes {
   createdAt?: Date;
   updatedAt?: Date;
}

const Color = sequelize.define<colorInstance>('color', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

export default Color;
