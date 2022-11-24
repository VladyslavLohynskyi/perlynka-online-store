import { sequelize } from '../db';
import { DataTypes } from 'sequelize';
import User from './userModel';
import Basket from './basketModel';
import Type from './typeModel';
import Color from './colorModel';
import Brand from './brandModel';
import Season from './seasonModel';
import Size from './sizeModel';
import ShoesSize from './shoesSizeModel';
import Shoes from './shoesModel';

const BasketShoes = sequelize.define('basket_shoes', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   count: { type: DataTypes.INTEGER, defaultValue: 1 },
});

const Rating = sequelize.define('rating', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   rate: { type: DataTypes.INTEGER, allowNull: false },
});

User.hasOne(Basket);
Basket.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Shoes.hasMany(Rating);
Rating.belongsTo(Shoes);

Shoes.hasMany(ShoesSize);
ShoesSize.belongsTo(Shoes);

Size.hasMany(ShoesSize);
ShoesSize.belongsTo(Size);

Basket.hasMany(BasketShoes);
BasketShoes.belongsTo(Basket);

Type.hasMany(Shoes);
Shoes.belongsTo(Type);

Color.hasMany(Shoes);
Shoes.belongsTo(Color);

Season.hasMany(Shoes);
Shoes.belongsTo(Season);

Brand.hasMany(Shoes);
Shoes.belongsTo(Brand);

Shoes.hasMany(BasketShoes);
BasketShoes.belongsTo(Shoes);

module.exports = {
   User,
   Basket,
   Shoes,
   Type,
   Brand,
   BasketShoes,
   Color,
   Season,
   Size,
   ShoesSize,
   Rating,
};
