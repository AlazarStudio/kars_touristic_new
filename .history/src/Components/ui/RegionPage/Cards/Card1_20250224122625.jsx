import React, { useEffect, useRef } from 'react';
import classes from './.module.css';
import CenterBlock from '../../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../../Standart/WidthBlock/WidthBlock';
import Header1 from '../Header/Header1';

// Импортируем Swiper.js
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Подключаем стили Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function ({
  currentRegion,
  selected,
  setSelected,
  multiDayTours = [],
  onerDayTours = [],
  hotels = [],
  places = [],
  events = [],
}) {
  useEffect(() => {
    if (selected !== null) {
      localStorage.setItem('selectedContainer', selected);
    }
  }, [selected]);

  const swiperRef = useRef(null);

  const options = [
    { img: '/images/baggage.webp', text: 'Многодневные туры' },
    { img: '/images/ekskurs.webp', text: 'Однодневные экскурсии' },
    { img: '/images/avtor.webp', text: 'Авторские туры' },
    { img: '/images/appart.webp', text: 'Отели / Апартаменты' },
    { img: '/images/searchLoc.webp', text: 'Что посетить' },
    { img: '/images/event.webp', text: 'Региональные Mice ивенты' },
  ];

  const dataMap = {
    0: multiDayTours || [],
    1: onerDayTours || [],
    2: [],
    3: hotels || [],
    4: places || [],
    5: events || [],
  };

  const selectedData =
    selected !== null && selected in dataMap ? dataMap[selected] || [] : [];

  return (
    <>
      <div className={classes.containerImg}>
        <img
          src={currentRegion.img[1]}
          alt={currentRegion.title}
          className={classes.backImg}
        />
        <Header1 />
        <CenterBlock>
          <WidthBlock>
            <div className={classes.container}>
              <div className={classes.containerLeft}>
                <img src={currentRegion.img[0]} alt={currentRegion.title} />
                <span>{currentRegion.title}</span>
                <span>{currentRegion.description}</span>
              </div>
              <div className={classes.containerRight}>




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
                          Стоимость:{' '}
                          <span>
                            {Number(item.price).toLocaleString('ru-RU')} ₽
                          </span>
                        </span>
                        <button>Подробнее</button>
                      </div>
                    </div>

    </>
  );
}

export default ;
