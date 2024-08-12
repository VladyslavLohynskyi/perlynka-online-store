import './PaymentAndDelivery.scss';

const PaymentAndDelivery = () => {
   return (
      <div className='payment-and-delivery'>
         <div className='payment-and-delivery__container'>
            <h2>ОПЛАТА І ДОСТАВКА</h2>
            <p className='payment-and-delivery__subtitle'>Оплата: </p>
            <ul className='payment-and-delivery__list'>
               <li>
                  оплата за реквізитами (відправляємо на email або месенджер);
               </li>
               <li>
                  на відділенні "Нової пошти" (відправляємо з передоплатою 100
                  грн, у випадку відмови передоплата не повертається);
               </li>
               <li>оплата в нашому магазині при самовивозі;</li>
            </ul>
            <p className='payment-and-delivery__subtitle'>Доставка: </p>
            <ul className='payment-and-delivery__list'>
               <li>доставка по Україні службою доставки "Нова пошта";</li>
               <li>
                  у м.Львові є можливість забрати замовлення з магазину за
                  адресою вул. Щирецька 36, ТВК "Південний", ТЦ 'Калина' 2А;
               </li>
            </ul>
         </div>
      </div>
   );
};

export default PaymentAndDelivery;
