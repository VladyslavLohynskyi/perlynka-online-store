import { sequelize } from '../db';
import { DataTypes, Model, Optional } from 'sequelize';

export type SexType = 'Хлопчик' | 'Дівчинка' | 'Унісекс';
interface shoesAttributes {
   id: number;
   model: string;
   price: number;
   img: string;
   typeId: number;
   colorId: number;
   seasonId: number;
   brandId: number;
   sex: SexType;
}

interface shoesCreationAttributes extends Optional<shoesAttributes, 'id'> {}

interface shoesInstance
   extends Model<shoesAttributes, shoesCreationAttributes>,
      shoesAttributes {
   createdAt?: Date;
   updatedAt?: Date;
}

const Shoes = sequelize.define<shoesInstance>('shoes', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   model: { type: DataTypes.STRING, unique: true, allowNull: false },
   price: { type: DataTypes.INTEGER, allowNull: false },
   img: { type: DataTypes.STRING, allowNull: false },
   typeId: { allowNull: false, type: DataTypes.INTEGER },
   seasonId: { allowNull: false, type: DataTypes.INTEGER },
   colorId: { allowNull: false, type: DataTypes.INTEGER },
   brandId: { allowNull: false, type: DataTypes.INTEGER },
   sex: { allowNull: false, type: DataTypes.STRING, defaultValue: 'Унісекс' },
});

export default Shoes;
