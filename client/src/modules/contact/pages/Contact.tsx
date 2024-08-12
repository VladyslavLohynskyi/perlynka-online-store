import './Contact.scss';

const Contact = () => {
   return (
      <div className='contact'>
         <div className='contact__container'>
            <div className='contact__info-container'>
               <h2>Сторінка комунікації з нами</h2>
               <p className='contact__social-media-container'>
                  <span>Telegram: </span>
                  <a
                     href='https://t.me/KolyaMaseratti'
                     target='_blank'
                     rel='nofollow'
                  >
                     @perlynkashoes
                  </a>
               </p>
               <p className='contact__social-media-container'>
                  <span>Viber: </span>
                  <a
                     href='https://invite.viber.com/?g2=AQAvW%2F8r5XFDNU0ZYEQxJ9E4nY6HIa5ypojA4YoGXCs7oQJZjm7MtD7tnDlaw0Sl'
                     target='_blank'
                     rel='nofollow'
                  >
                     +38 (096) 466-87-57
                  </a>
               </p>
               <p className='contact__social-media-container'>
                  <span>Instagram: </span>
                  <a
                     href='https://www.instagram.com/perlynka_shoes'
                     target='_blank'
                     rel='nofollow'
                  >
                     @perlynka_shoes
                  </a>
               </p>
               <p className='contact__social-media-container'>
                  <span>Телефон: </span>
                  <a href='tel:+380964668757' target='_blank' rel='nofollow'>
                     +38 (096) 466-87-57
                  </a>
               </p>
               <p className='contact__social-media-container'>
                  <span>Пошта: </span>
                  <a
                     href='mailto:perlynka.shoes.store@gmail.com'
                     target='_blank'
                     rel='nofollow'
                  >
                     perlynka.shoes.store@gmail.com
                  </a>
               </p>
               <div style={{ marginTop: '20px' }}>
                  <p className='contact__social-media-container'>
                     <span>Адреса: </span>
                     <a
                        href='https://maps.app.goo.gl/6KzSsJT1RpbeVCVT6'
                        target='_blank'
                        rel='nofollow'
                     >
                        м. Львів, вул. Щирецька 36, ТВК "Піденний", ТЦ Калина 2А
                     </a>
                  </p>
                  <p className='contact__social-media-container'>
                     <span>Адреса: </span>
                     <a
                        href='https://www.google.com/maps/place/49.811027,+23.974144/@49.8107247,23.9749865,19z/data=!4m4!3m3!8m2!3d49.8110266!4d23.9741443?source=lnms'
                        target='_blank'
                        rel='nofollow'
                     >
                        м. Львів, вул. Щирецька 36, ТВК "Піденний", ТЦ Новинка
                        92
                     </a>
                  </p>
                  <p className='contact__social-media-container'>
                     <span>Графік роботи: </span>
                     ВТ-НД: 10:00 - 19:00
                  </p>
               </div>
            </div>
            <div className='contact__map-container'>map</div>
         </div>
      </div>
   );
};

export default Contact;
