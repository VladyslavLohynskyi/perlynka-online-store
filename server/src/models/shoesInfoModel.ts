import { sequelize } from '../db';
import { DataTypes, Model, Optional } from 'sequelize';

interface shoesInfoAttributes {
   id: number;
   title: string;
   description: string;
   shoId: number;
}

interface shoesInfoCreationAttributes
   extends Optional<shoesInfoAttributes, 'id'> {}

export interface shoesInfoInstance
   extends Model<shoesInfoAttributes, shoesInfoCreationAttributes>,
      shoesInfoAttributes {
   createdAt?: Date;
   updatedAt?: Date;
}

const ShoesInfo = sequelize.define<shoesInfoInstance>('shoes_info', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   title: { type: DataTypes.STRING, allowNull: false },
   description: { type: DataTypes.STRING, allowNull: false },
   shoId: { allowNull: false, type: DataTypes.INTEGER },
});

export default ShoesInfo;
