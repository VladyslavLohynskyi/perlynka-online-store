import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

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
      });
   }

   async sendMail() {
      const mailOption = {
         from: process.env.SMTP_USER,
         to: process.env.SMTP_USER,
         subject: 'Замовлення принято',
         text: '',
         html: `
                       <div>
                           <h1>Замовлення принято</h1>
                       </div>
                   `,
      };
      await this.transporter.sendMail(mailOption, function (error, info) {
         if (error) {
            console.log(error);
         } else {
            console.log('Email sent: ' + info.response);
         }
      });
   }
}

export default new MailService();
