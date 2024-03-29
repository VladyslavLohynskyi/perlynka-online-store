import { sequelize } from '../db';
import { DataTypes, Model, Optional } from 'sequelize';

interface tokenAttributes {
   id: number;
   refreshToken: string;
   userId: number;
}

interface tokenCreationAttributes extends Optional<tokenAttributes, 'id'> {}

interface tokenInstance
   extends Model<tokenAttributes, tokenCreationAttributes>,
      tokenAttributes {
   createdAt?: Date;
   updatedAt?: Date;
}

const Token = sequelize.define<tokenInstance>('token', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   userId: { allowNull: false, type: DataTypes.INTEGER },
   refreshToken: { allowNull: false, type: DataTypes.STRING },
});

export default Token;
