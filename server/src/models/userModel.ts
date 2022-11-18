import { sequelize } from '../db';
import { DataTypes, Model, Optional } from 'sequelize';

export enum Role {
   ADMIN = 'ADMIN',
   USER = 'USER',
}

interface userAttributes {
   id: number;
   email: string;
   password: string;
   role: Role;
}

interface userCreationAttributes extends Optional<userAttributes, 'id'> {}

interface userInstance
   extends Model<userAttributes, userCreationAttributes>,
      userAttributes {
   createdAt?: Date;
   updatedAt?: Date;
}

const User = sequelize.define<userInstance>('user', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   email: { type: DataTypes.STRING, unique: true },
   password: { type: DataTypes.STRING },
   role: { type: DataTypes.STRING, defaultValue: 'USER' },
});

export default User;
