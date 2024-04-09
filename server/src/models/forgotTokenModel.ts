import { sequelize } from '../db';
import { DataTypes, Model, Optional } from 'sequelize';

interface forgotTokenAttributes {
   id: number;
   forgotToken: string;
   userId: number;
}

interface forgotTokenCreationAttributes
   extends Optional<forgotTokenAttributes, 'id'> {}

interface forgotTokenInstance
   extends Model<forgotTokenAttributes, forgotTokenCreationAttributes>,
      forgotTokenAttributes {
   createdAt?: Date;
   updatedAt?: Date;
}

const ForgotToken = sequelize.define<forgotTokenInstance>('forgot_token', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   userId: { allowNull: false, type: DataTypes.INTEGER },
   forgotToken: { allowNull: false, type: DataTypes.STRING },
});

export default ForgotToken;
