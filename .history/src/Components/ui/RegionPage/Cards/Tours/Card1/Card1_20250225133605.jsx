import React, { useRef, useCallback } from 'react';
import classes from './Card1.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useNavigate } from 'react-router-dom';

function Card1({ swiperRef, item }) {
  const navigate = useNavigate();
  const swiperRef = useRef(null); // Создаём уникальный useRef для каждой карточки

  const transliterate = useCallback((text) => {
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
      ' ': '-',
      ъ: '',
      ь: `'`,
    };

    return text
      .split('')
      .map((char) => map[char] || char)
      .join('');
  }, []);

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
          Способ передвижения: <span>{item.transport}</span>
        </span>
        <span>
          Продолжительность: <span>{item.duration}</span>
        </span>
        <span>
          Время отправления: <span>{item.timeToStart}</span>
        </span>
        <span>
          Тип экскурсии: <span>{item.type}</span>
        </span>
        <span>
          Сложность: <span>{item.level}</span>
        </span>

        <span className={classes.price}>
          Стоимость: <span>{Number(item.price).toLocaleString('ru-RU')} ₽</span>
        </span>

        <button onClick={() => navigate(`/tours/${transliterate(item.title)}`)}>
          Подробнее
        </button>
      </div>
    </div>
  );
}

export default Card1;
