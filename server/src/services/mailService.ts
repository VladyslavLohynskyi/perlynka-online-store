import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { Model, or } from 'sequelize';
import Shoes, { shoesInstance } from '../models/shoesModel';
import Brand, { brandInstance } from '../models/brandModel';

export interface ICustomerInfo {
   email: string;
   name: string;
   surname: string;
   phone: string;
   Description: string;
   SettlementAreaDescription: string;
   SettlementDescription: string;
   SettlementTypeDescription: string;
}
export interface IBasketCheckoutItem {
   modelId: number;
   count: number;
   size: string;
}
export interface IOrderInfo {
   price: number;
   basket: IBasketCheckoutItem[];
}
interface shoesWithBrand extends shoesInstance {
   brand: brandInstance;
}
class MailService {
   transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;
   constructor() {
      this.transporter = nodemailer.createTransport({
         host: process.env.SMTP_HOST,
         port: +process.env.SMTP_PORT,
         secure: true,
         auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
         },
         from: process.env.SMTP_USER,
      });
   }
   async sendForgotPasswordMail(to: string, link: string) {
      await this.transporter.sendMail({
         to,
         subject:
            'Зміна паролю облікового запису на сайті онлайн-магазину Перлинка',
         html: `
         <div>
            <h1>Для зміни паролю перейдіть по посиланню нижче</h1>
            <a href="${link}">${link}</a>
         </div>`,
      });
   }

   async sendChangePasswordSuccessMail(to: string) {
      await this.transporter.sendMail({
         to,
         subject:
            'Успішна зміна паролю облікового запису на сайті онлайн-магазину Перлинка',
         html: `
         <div>
            <h1>Ваш пароль від обілкового запису на сайті онлайн-магазину Перлинка успішно змінено</h1>
         </div>`,
      });
   }

   async sendActivationMail(to: string, link: string) {
      await this.transporter.sendMail({
         to,
         subject:
            'Активація облікового запису на сайті онлайн-магазину Перлинка',
         html: `
         <div>
            <h1>Для активації перейдіть по посиланню нижче</h1>
            <a href="${link}">${link}</a>
         </div>`,
      });
   }

   async sendCheckout(customerInfo: ICustomerInfo, orderInfo: IOrderInfo) {
      const checkoutShoesDivItem = await Promise.all(
         orderInfo.basket.map(async (item) => {
            const shoes = (await Shoes.findOne({
               where: { id: item.modelId },
               include: [{ model: Brand, as: 'brand' }],
            })) as shoesWithBrand;
            return `
               <tr>
                  <th style="border:1px solid gray;padding:8px 10px;">#${item.modelId}</th> 
                  <td style="border:1px solid gray;padding:8px 10px;">${shoes?.brand?.name} ${shoes.model}</td> 
                  <td style="border:1px solid gray;padding:8px 10px;">${item.size}</td> <td style="border:1px solid gray;padding:8px 10px;">${item.count}</td> 
                  <td style="border:1px solid gray;padding:8px 10px;">${shoes.price}грн.</td>
               </tr>
               `;
         }),
      );

      const deliveryInfoHTML = `
         <h3>Деталі замовлення:</h3>
         <p>Вид доставки: Відділення Нової Пошти</p>
         <p>Спосіб оплати:	Післяплата</p>
         <p>Адреса доставки:	${customerInfo.SettlementAreaDescription}, ${
         customerInfo.SettlementTypeDescription
      }. ${customerInfo.SettlementDescription}, ${customerInfo.Description}</p>
         <table style="border:1.5px solid gray;">
            <thead>
               <tr>
                  <th style="border:1px solid gray;padding:8px 10px;" scope="col">ID</th>
                  <th style="border:1px solid gray;padding:8px 10px;" scope="col">Модель</th>
                  <th style="border:1px solid gray;padding:8px 10px;" scope="col">Розмір</th>
                  <th style="border:1px solid gray;padding:8px 10px;" scope="col">Кількість</th>
                  <th style="border:1px solid gray;padding:8px 10px;" scope="col">Ціна за пару</th>
               </tr>
            </thead>
            <tbody>
               ${checkoutShoesDivItem.join('')}
            </tbody>
         </table>
         <h3>До сплати: ${orderInfo.price}грн.</h3>`;

      const mailOptionToCustomer = {
         subject: 'Інформація про Твоє замовлення',
         to: customerInfo.email,
         html: `
                       <div style="width:702px;">
                           <h1>Перлинка</h1>
                           <hr/>
                           <h2>Ваше замовлення прийнято.</h2>
                           <p>Привіт ${customerInfo.name} ${customerInfo.surname},</p>
                           <p>Дякуємо за вибір "Перлинка".</p>
                           <p>У разі будь-яких питань або зауважень Ти завжди можеш зв'язатися з нашим Центром обслуговування клієнтів за номером телефону: 0964668757 (щодня з 08:00 до 20:00). <p>
                           <p>З повагою,<br/>Команда "Перлинка"</p>
                           <hr/>
                           ${deliveryInfoHTML}
                           <p style="font-size:10px;line-height:16px;color:#7f7f7f;font-family:Arial,sans-serif">ПОВЕРНЕННЯ ТОВАРУ: Придбаний в магазині Перлинка товар ви завжди можете повернути протягом 14 календарних днів з моменту отримання посилки, за умови, якщо він не був у вжитку, а його оригінальна упаковка (безпосередньо та, в якій ви отримали сам товар – це коробка від взуття) товарний вигляд і споживчі властивості (етикетки, ярлики, що містять характеристики товару) збережені.</p>
                       </div>
                   `,
      };

      const mailOptionToManager = {
         subject: 'Нове замовлення',
         to: process.env.SMTP_USER,
         html: `
                       <div style="width:702px;">
                           <h1>Перлинка</h1>
                           <hr/>
                           <h2>Нове замовлення.</h2>
                           <p>ПІБ: ${customerInfo.name} ${customerInfo.surname}</p>
                           <p>Номер телефону: ${customerInfo.phone}</p>
                           <hr/>
                           ${deliveryInfoHTML}
                       </div>
                   `,
      };

      await this.transporter.sendMail(mailOptionToCustomer);
      await this.transporter.sendMail(mailOptionToManager);
   }
}

export default new MailService();
