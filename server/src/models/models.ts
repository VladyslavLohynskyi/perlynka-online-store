import User from './userModel';
import Basket from './basketModel';
import Type from './typeModel';
import Color from './colorModel';
import Brand from './brandModel';
import Season from './seasonModel';
import Size from './sizeModel';
import ShoesSize from './shoesSizeModel';
import Shoes from './shoesModel';
import BasketShoes from './basketShoesModel';
import Rating from './ratingModel';
import Token from './tokenModel';

User.hasOne(Basket);
Basket.belongsTo(User);

User.hasOne(Token);
Token.belongsTo(User);

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

Size.hasMany(BasketShoes);
BasketShoes.belongsTo(Size);

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
   Token,
};
