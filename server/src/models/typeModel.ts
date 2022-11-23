import { sequelize } from '../db';
import { DataTypes, Model, Optional } from 'sequelize';
interface typeAttributes {
   id: number;
   name: string;
}

interface typeCreationAttributes extends Optional<typeAttributes, 'id'> {}

interface typeInstance
   extends Model<typeAttributes, typeCreationAttributes>,
      typeAttributes {
   createdAt?: Date;
   updatedAt?: Date;
}

const Type = sequelize.define<typeInstance>('type', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

export default Type;
