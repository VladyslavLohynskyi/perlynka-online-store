import { sequelize } from '../db';
import { DataTypes, Model, Optional } from 'sequelize';

interface brandAttributes {
   id: number;
   name: string;
}

interface brandCreationAttributes extends Optional<brandAttributes, 'id'> {}

export interface brandInstance
   extends Model<brandAttributes, brandCreationAttributes>,
      brandAttributes {
   createdAt?: Date;
   updatedAt?: Date;
}

const Brand = sequelize.define<brandInstance>('brand', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

export default Brand;
