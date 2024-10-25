import { sequelize } from '../db';
import { DataTypes, Model, Optional } from 'sequelize';
interface mainCarouselSlideAttributes {
   id: number;
   alt: string;
   link?: string | null;
   img: string;
}

interface mainCarouselSlideCreationAttributes
   extends Optional<mainCarouselSlideAttributes, 'id'> {}

interface mainCarouselInstance
   extends Model<
         mainCarouselSlideAttributes,
         mainCarouselSlideCreationAttributes
      >,
      mainCarouselSlideAttributes {
   createdAt?: Date;
   updatedAt?: Date;
}

const MainCarouselSlide = sequelize.define<mainCarouselInstance>(
   'main_carousel_slide',
   {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      alt: { type: DataTypes.STRING, allowNull: false },
      link: {
         type: DataTypes.STRING,
         allowNull: true,
      },
      img: { type: DataTypes.STRING, unique: true, allowNull: false },
   },
);

export default MainCarouselSlide;
