import { sequelize } from '../db';
import { DataTypes, Model, Optional } from 'sequelize';

interface seasonAttributes {
   id: number;
   name: string;
}

interface seasonCreationAttributes extends Optional<seasonAttributes, 'id'> {}

interface seasonInstance
   extends Model<seasonAttributes, seasonCreationAttributes>,
      seasonAttributes {
   createdAt?: Date;
   updatedAt?: Date;
}

const Season = sequelize.define<seasonInstance>('season', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

export default Season;
