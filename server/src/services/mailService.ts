import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

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

export interface IOrderInfo {
   price: number;
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

   async sendCheckout(customerInfo: ICustomerInfo, orderInfo: IOrderInfo) {
      const mailOption = {
         subject: 'Інформація про Твоє замовлення',
         html: `
                       <div style="width:702px">
                           <h1>Перлинка</h1>
                           <hr/>
                           <h2>Ваше замовлення прийнято.</h2>
                           <p>Привіт ${customerInfo.name} ${customerInfo.surname},</p>
                           <p>Дякуємо за вибір "Перлинка".</p>
                           <p>У разі будь-яких питань або зауважень Ти завжди можеш зв'язатися з нашим Центром обслуговування клієнтів за номером телефону: 0964668757 (щодня з 08:00 до 20:00). <p>
                           <p>З повагою,<br/>Команда "Перлинка"</p>
                           <hr/>
                           <h3>Деталі замовлення</h3>
                           <p>Вид доставки: Відділення Нової Пошти</p>
                           <p>Спосіб оплати:	Післяплата</p>
                           <p>Адреса доставки:	${customerInfo.SettlementAreaDescription}, ${customerInfo.SettlementTypeDescription}. ${customerInfo.SettlementDescription}, ${customerInfo.Description}</p>
                           <h3>До сплати: ${orderInfo.price}грн.</h3>
                           <p style="font-size:10px;line-height:16px;color:#7f7f7f;font-family:Arial,sans-serif">ПОВЕРНЕННЯ ТОВАРУ: Придбаний в магазині Перлинка товар ви завжди можете повернути протягом 14 календарних днів з моменту отримання посилки, за умови, якщо він не був у вжитку, а його оригінальна упаковка (безпосередньо та, в якій ви отримали сам товар – це коробка від взуття) товарний вигляд і споживчі властивості (етикетки, ярлики, що містять характеристики товару) збережені.</p>
                       </div>
                   `,
      };
      const mailOptionToCustomer = { ...mailOption, to: customerInfo.email };
      const mailOptionToOwner = { ...mailOption, to: process.env.SMTP_USER };
      await this.transporter.sendMail(
         mailOptionToCustomer,
         function (error, info) {
            if (error) {
               console.log(error);
            } else {
               console.log('Email sent: ' + info.response);
            }
         },
      );
      await this.transporter.sendMail(
         mailOptionToOwner,
         function (error, info) {
            if (error) {
               console.log(error);
            } else {
               console.log('Email sent: ' + info.response);
            }
         },
      );
   }
}

export default new MailService();
