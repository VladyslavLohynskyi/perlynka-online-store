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
   isActivated: boolean;
   activationLink: string;
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
   isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
   activationLink: { type: DataTypes.STRING },
});

export default User;
