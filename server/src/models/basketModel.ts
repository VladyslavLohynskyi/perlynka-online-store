import { sequelize } from '../db';
import { DataTypes, Model, Optional } from 'sequelize';
interface basketAttributes {
   id: number;
   userId: number;
}

interface basketCreationAttributes extends Optional<basketAttributes, 'id'> {}

interface basketInstance
   extends Model<basketAttributes, basketCreationAttributes>,
      basketAttributes {
   createdAt?: Date;
   updatedAt?: Date;
}

const Basket = sequelize.define<basketInstance>('basket', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   userId: { allowNull: false, type: DataTypes.INTEGER },
});

export default Basket;
