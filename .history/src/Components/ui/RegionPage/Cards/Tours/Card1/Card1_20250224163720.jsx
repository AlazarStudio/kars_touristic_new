import React, { useEffect, useRef } from 'react';
import classes from './Card1.module.css';


// Импортируем Swiper.js
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Подключаем стили Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useNavigate } from 'react-router';

function Card1({ swiperRef, item }) {

  const navigate = useNavigate();


  const transliterate = (text) => {
    const map = {
      а: 'a',
      б: 'b',
      в: 'v',
      г: 'g',
      д: 'd',
      е: 'e',
      ё: 'yo',
      ж: 'zh',
      з: 'z',
      и: 'i',
      й: 'y',
      к: 'k',
      л: 'l',
      м: 'm',
      н: 'n',
      о: 'o',
      п: 'p',
      р: 'r',
      с: 's',
      т: 't',
      у: 'u',
      ф: 'f',
      х: 'kh',
      ц: 'ts',
      ч: 'ch',
      ш: 'sh',
      щ: 'shch',
      ы: 'y',
      э: 'e',
      ю: 'yu',
      я: 'ya',
      ъ: '',
      ь: `'`,
      ' ': '-',

      А: 'A',
      Б: 'B',
      В: 'V',
      Г: 'G',
      Д: 'D',
      Е: 'E',
      Ё: 'Yo',
      Ж: 'Zh',
      З: 'Z',
      И: 'I',
      Й: 'Y',
      К: 'K',
      Л: 'L',
      М: 'M',
      Н: 'N',
      О: 'O',
      П: 'P',
      Р: 'R',
      С: 'S',
      Т: 'T',
      У: 'U',
      Ф: 'F',
      Х: 'Kh',
      Ц: 'Ts',
      Ч: 'Ch',
      Ш: 'Sh',
      Щ: 'Shch',
      Ы: 'Y',
      Э: 'E',
      Ю: 'Yu',
      Я: 'Ya',
    };

    return text
      .split('')
      .map((char) => map[char] || char)
      .join('');
  };

  //   useEffect(() => {
  //     if (selected !== null) {
  //       localStorage.setItem('selectedContainer', selected);
  //     }
  //   }, [selected]);

  //   const swiperRef = useRef(null);

  //   const options = [
  //     { img: '/images/baggage.webp', text: 'Многодневные туры' },
  //     { img: '/images/ekskurs.webp', text: 'Однодневные экскурсии' },
  //     { img: '/images/avtor.webp', text: 'Авторские туры' },
  //     { img: '/images/appart.webp', text: 'Отели / Апартаменты' },
  //     { img: '/images/searchLoc.webp', text: 'Что посетить' },
  //     { img: '/images/event.webp', text: 'Региональные Mice ивенты' },
  //   ];

  //   const dataMap = {
  //     0: multiDayTours || [],
  //     1: onerDayTours || [],
  //     2: [],
  //     3: hotels || [],
  //     4: places || [],
  //     5: events || [],
  //   };

  //   const selectedData =
  //     selected !== null && selected in dataMap ? dataMap[selected] || [] : [];

  return (
    <div key={item.id} className={classes.card1}>
      <Swiper
        modules={[Navigation, Pagination]}
        // pagination={{ clickable: true }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className={classes.swiper}
        loop={true}
      >
        {item.img.map((image, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={image}
              alt={`${item.title} - ${idx + 1}`}
              className={classes.cardImg}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <img className={classes.favorite} src="/images/userLike_empty.png" />
      <div className={classes.cardButtons}>
        <button onClick={() => swiperRef.current?.slidePrev()}>
          <img src="/images/butLeft.png" alt="Prev" />
        </button>
        <button onClick={() => swiperRef.current?.slideNext()}>
          <img src="/images/butRight.png" alt="Next" />
        </button>
      </div>

      <div className={classes.cardContent}>
        <h3>{item.title}</h3>
        <span>
          Способ передвижения: <span>{item.transport}</span>{' '}
        </span>
        <span>
          Продолжительность: <span>{item.duration}</span>{' '}
        </span>
        <span>
          Время отправления: <span>{item.timeToStart}</span>{' '}
        </span>
        <span>
          Тип экскурсии: <span>{item.type}</span>{' '}
        </span>
        <span>
          Сложность: <span>{item.level}</span>{' '}
        </span>
        <div className={classes.addInfo}>
          <img src="/images/optional_black.png" />
          <span>{item.addInfo}</span>
        </div>
        <span className={classes.price}>
          Стоимость : <span>{Number(item.price).toLocaleString('ru-RU')} ₽</span>
        </span>
        <button 
        >Подробнее</button>
      </div>
    </div>
  );
}

export default Card1;
