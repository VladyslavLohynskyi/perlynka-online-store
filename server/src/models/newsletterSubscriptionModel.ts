import { sequelize } from '../db';
import { DataTypes, Model, Optional } from 'sequelize';

interface newsletterSubscriptionAttributes {
   id: number;
   email: string;
   token: string;
}

interface newsletterSubscriptionCreationAttributes
   extends Optional<newsletterSubscriptionAttributes, 'id'> {}

interface newsletterSubscriptionInstance
   extends Model<
         newsletterSubscriptionAttributes,
         newsletterSubscriptionCreationAttributes
      >,
      newsletterSubscriptionAttributes {
   createdAt?: Date;
   updatedAt?: Date;
}

const NewsletterSubscription = sequelize.define<newsletterSubscriptionInstance>(
   'newsletter_subscription',
   {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      email: { type: DataTypes.STRING, unique: true },
      token: {type: DataTypes.STRING,unique:true}
   },
);

export default NewsletterSubscription;
