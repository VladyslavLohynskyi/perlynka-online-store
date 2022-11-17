import { sequelize } from '../db';
import { DataTypes } from 'sequelize';

const User = sequelize.define('user', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   email: { type: DataTypes.STRING, unique: true },
   password: { type: DataTypes.STRING },
   role: { type: DataTypes.STRING, defaultValue: 'USER' },
});

const Basket = sequelize.define('basket', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const BasketShoes = sequelize.define('basket_shoes', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   count: { type: DataTypes.INTEGER, defaultValue: 1 },
});

const Shoes = sequelize.define('shoes', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   model: { type: DataTypes.STRING, unique: true, allowNull: false },
   price: { type: DataTypes.INTEGER, allowNull: false },
   rating: { type: DataTypes.INTEGER, defaultValue: 0 },
   img: { type: DataTypes.STRING, allowNull: false },
});

const Type = sequelize.define('type', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Brand = sequelize.define('brand', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Color = sequelize.define('color', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Season = sequelize.define('season', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Rating = sequelize.define('rating', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   rate: { type: DataTypes.INTEGER, allowNull: false },
});

const ShoesSize = sequelize.define('basket_size', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   count: { type: DataTypes.INTEGER, defaultValue: 1 },
});

const Size = sequelize.define('size', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   size: { type: DataTypes.INTEGER, allowNull: false, unique: true },
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
