import { sequelize } from '../db';
import { DataTypes, Model, Optional } from 'sequelize';
interface shoesImageAttributes {
   id: number;
   img: string;
   shoId: number;
}

interface shoesImageCreationAttributes
   extends Optional<shoesImageAttributes, 'id'> {}

interface shoesImageInstance
   extends Model<shoesImageAttributes, shoesImageCreationAttributes>,
      shoesImageAttributes {
   createdAt?: Date;
   updatedAt?: Date;
}

const ShoesImage = sequelize.define<shoesImageInstance>('shoes_image', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   img: { type: DataTypes.STRING, allowNull: false },
   shoId: { allowNull: false, type: DataTypes.INTEGER },
});

export default ShoesImage;
