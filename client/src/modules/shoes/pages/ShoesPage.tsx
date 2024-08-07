import React, { useEffect, useState } from 'react';
import './ShoesPage.scss';
import { useParams } from 'react-router-dom';
import ShoesReq, { IParticularShoes, IShoesImage } from '../../../http/shoes';
import { HorizontalLine } from '../../ui/HorizontalLine';
import ShoesCarousel from '../components/ShoesCarousel/ShoesCarousel';
import ShoesInfos from '../components/ShoesInfos/ShoesInfos';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import DescriptionsItem from '../components/DescriptionsItem/DescriptionsItem';

export enum BuyButtonTextEnum {
   BUY = 'Купити',
   SIZE_ERROR = 'Виберіть Розмір',
}

export enum DescriptionAccordionNamesEnum {
   DESCRIPTION = 'description',
   PAYMENT = 'payment',
   DELIVERY = 'delivery',
   RETURN_AND_EXCHANGE = 'return',
}
export const ShoesPage: React.FC = () => {
   const { id } = useParams();
   const [currentShoes, setCurrentShoes] = useState<IParticularShoes>();
   const [slides, setSlides] = useState<IShoesImage[]>([]);
   const [descriptionAccordionActiveName, setDescriptionAccordionActiveName] =
      useState<DescriptionAccordionNamesEnum>(
         DescriptionAccordionNamesEnum.DESCRIPTION,
      );

   useEffect(() => {
      if (id)
         ShoesReq.getShoesById(+id).then((shoes) => {
            setCurrentShoes(shoes);
            setSlides([
               { id: 0, img: shoes.img, shoId: shoes.id },
               ...shoes.shoes_images,
            ]);
         });
   }, []);

   return (
      <div className='shoes-page'>
         {currentShoes && (
            <>
               <div className='shoes-page__main'>
                  <ShoesCarousel slides={slides} />
                  <ShoesInfos currentShoes={currentShoes} />
               </div>
               <HorizontalLine />
               <div className='shoes-page__characteristics-container'>
                  <DescriptionsItem
                     title={'Опис'}
                     descriptionAccordionActiveName={
                        descriptionAccordionActiveName
                     }
                     setDescriptionAccordionActiveName={
                        setDescriptionAccordionActiveName
                     }
                     value={DescriptionAccordionNamesEnum.DESCRIPTION}
                  >
                     <p
                        style={{
                           background: '#d9d7d7',
                           padding: 10,
                        }}
                     >
                        Бренд : {currentShoes.brand.name}
                     </p>
                     <p
                        style={{
                           background: 'transparent',
                           padding: 10,
                        }}
                     >
                        Модель : {currentShoes.model}
                     </p>

                     <p
                        style={{
                           background: '#d9d7d7',
                           padding: 10,
                        }}
                     >
                        Тип : {currentShoes.type.name}
                     </p>
                     <p
                        style={{
                           background: 'transparent',
                           padding: 10,
                        }}
                     >
                        Cезон : {currentShoes.season.name}
                     </p>
                     <p
                        style={{
                           background: '#d9d7d7',
                           padding: 10,
                        }}
                     >
                        Колір : {currentShoes.color.name}
                     </p>
                     {currentShoes.shoes_infos.map((info, index) => (
                        <p
                           key={info.id}
                           style={{
                              background:
                                 index % 2 === 0 ? 'transparent' : '#d9d7d7',
                              padding: 10,
                           }}
                        >
                           {info.title} : {info.description}
                        </p>
                     ))}
                  </DescriptionsItem>
                  <DescriptionsItem
                     title={'Оплата'}
                     descriptionAccordionActiveName={
                        descriptionAccordionActiveName
                     }
                     setDescriptionAccordionActiveName={
                        setDescriptionAccordionActiveName
                     }
                     value={DescriptionAccordionNamesEnum.PAYMENT}
                  >
                     <p>Оплату товару можна здійснити наступними методами:</p>
                     <ul>
                        <li>
                           оплата за реквізитами (відправляємо на email або
                           месенджер);
                        </li>
                        <li>
                           на відділенні "Нової пошти" (відправляємо з
                           передоплатою 100 грн);
                        </li>
                        <li>оплата в нашому магазині при самовивозі;</li>
                     </ul>
                  </DescriptionsItem>
                  <DescriptionsItem
                     title={'Доставка'}
                     descriptionAccordionActiveName={
                        descriptionAccordionActiveName
                     }
                     setDescriptionAccordionActiveName={
                        setDescriptionAccordionActiveName
                     }
                     value={DescriptionAccordionNamesEnum.DELIVERY}
                  >
                     <ul>
                        <li>
                           доставка по Україні службою доставки "Нова пошта" (на
                           відділення або до дверей);
                        </li>
                        <li>
                           у м.Львові є можливість забрати замовлення з магазину
                           за адресою вул. Щирецька 36, ТВК "Південний", ТЦ
                           'Калина' 2А;
                        </li>
                     </ul>
                  </DescriptionsItem>
                  <DescriptionsItem
                     title={'Повернення та обмін'}
                     descriptionAccordionActiveName={
                        descriptionAccordionActiveName
                     }
                     setDescriptionAccordionActiveName={
                        setDescriptionAccordionActiveName
                     }
                     value={DescriptionAccordionNamesEnum.RETURN_AND_EXCHANGE}
                  >
                     <p>
                        Ви можете повернути/обміняти куплений товар в нашому
                        магазині за умови, якщо: збережений товарний вигляд
                        виробу (відсутність слідів експлуатації та носіння,
                        наявність оригінальної і неушкодженою упаковки і
                        ярликів); з моменту покупки не пройшло більше 14
                        календарних днів.
                     </p>
                     <p>
                        Ви можете повернути/обміняти куплений товар в нашому
                        магазині за умови, якщо: збережений товарний вигляд
                        виробу (відсутність слідів експлуатації та носіння,
                        наявність оригінальної і неушкодженою упаковки і
                        ярликів); з моменту покупки не пройшло більше 14
                        календарних днів.
                     </p>
                     <p>
                        Повернення необхідно оформити як звичайну посилку (без
                        накладного платежу). Всі витрати при цьому несе
                        покупець. Важливо! Не обклеюйте фірмову коробку кросівок
                        клейкою стрічкою - такі повернення не будуть розглянуті.
                     </p>
                     <p>
                        Повернення коштів за товар здійснюється за реквізитами.
                        Строк перерахування коштів – до 7 робочих днів після
                        отримання та перевірки поверненого товару.
                     </p>
                     <p>
                        Відповідно до Закону України "Про захист прав споживача"
                        поверненню не підлягає товар належної якості, у тому
                        числі:
                     </p>
                     <ul>
                        <li>
                           Швейні та трикотажні вироби (вироби швейні та
                           трикотажні білизняні, вироби панчішно-шкарпеткові);
                        </li>
                        <li>
                           Вироби та матеріали, що контактують із харчовими
                           продуктами, з полімерних матеріалів, у тому числі для
                           разового використання;
                        </li>
                        <li>Парфумерно-косметичні товари;</li>
                        <li>
                           Технічно складні товари побутового призначення, на
                           які встановлені гарантійні терміни (в т.ч.
                           годинники).
                        </li>
                     </ul>
                  </DescriptionsItem>
               </div>
            </>
         )}
      </div>
   );
};
