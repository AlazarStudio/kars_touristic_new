import React, { useRef } from 'react';
import classes from './PlacesCard.module.css';

// Импортируем Swiper.js
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Подключаем стили Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useNavigate } from 'react-router';

function PlacesCard({ item }) {
  const navigate = useNavigate();
  const swiperRef = useRef(null); // Создаём уникальный useRef для каждой карточки

  return (
    <div key={item.id} className={classes.PlacesCard}>
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
        <button onClick={() => navigate}>Подробнее</button>
      </div>
    </div>
  );
}

export default PlacesCard;
