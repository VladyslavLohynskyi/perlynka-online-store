import { sequelize } from '../db';
import { DataTypes, Model, Optional } from 'sequelize';
interface ratingAttributes {
   id: number;
   rate: number;
   userId: number;
   shoId: number;
}

interface ratingCreationAttributes extends Optional<ratingAttributes, 'id'> {}

interface ratingInstance
   extends Model<ratingAttributes, ratingCreationAttributes>,
      ratingAttributes {
   createdAt?: Date;
   updatedAt?: Date;
}

const Rating = sequelize.define<ratingInstance>('rating', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   rate: { type: DataTypes.INTEGER, allowNull: false },
   shoId: { allowNull: false, type: DataTypes.INTEGER },
   userId: { allowNull: false, type: DataTypes.INTEGER },
});

export default Rating;
