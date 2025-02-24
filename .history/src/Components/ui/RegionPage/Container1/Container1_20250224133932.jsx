import React, { useEffect, useRef } from 'react';
import classes from './Container1.module.css';
import CenterBlock from '../../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../../Standart/WidthBlock/WidthBlock';
import Header1 from '../Header/Header1';

// Импортируем Swiper.js
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination } from 'swiper/modules';

// Подключаем стили Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Card1 from '../Cards/Tours/Card1/Card1';
import HotelCard from '../Cards/Hotels/HotelCard';
// import CardHotels from '../Cards/CardHotels';
// import CardPlaces from '../Cards/CardPlaces';
// import CardEvents from '../Cards/CardEvents';

function Container1({
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

  // Определяем категории (многодневные, однодневные, отели, места, события)
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
    2: [], // Здесь можно добавить данные для "Авторских туров"
    3: hotels || [],
    4: places || [],
    5: events || [],
  };

  const selectedData =
  selected === 0
    ? multiDayTours.filter((tour) => tour.regionId === currentRegion.id)
    : selected === 1
    ? onerDayTours.filter((tour) => tour.regionId === currentRegion.id)
    : selected === 2
    ? [] // Если для авторских туров появятся данные, добавьте фильтр здесь
    : selected === 3
    ? hotels.filter((hotel) => hotel.regionId === currentRegion.id)
    : selected === 4
    ? places.filter((place) => place.regionId === currentRegion.id)
    : selected === 5
    ? events.filter((event) => event.regionId === currentRegion.id)
    : [];


      // console.log('Selected Data:', selectedData);


  // Можно использовать общий реф, если он нужен в карточках
  const swiperRef = useRef(null);

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
                {options.map((el, index) => (
                  <div
                    key={index}
                    className={`${classes.containerRightEl} ${
                      selected === index ? classes.selected : ''
                    }`}
                    onClick={() => setSelected(index)}
                  >
                    <img src={el.img} alt={el.text} />
                    <span>{el.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </WidthBlock>
        </CenterBlock>
      </div>

      {/* Блок с карточками */}
      <CenterBlock>
        <WidthBlock>
          <div className={classes.container2}>
            <div className={classes.container2Title}>
              {selected !== null &&
              selected >= 0 &&
              selected < options.length ? (
                <>
                  <span>{options[selected].text}</span>
                  <span>Найдено: {selectedData.length}</span>
                </>
              ) : (
                <span>Выберите категорию</span>
              )}
            </div>

            {/* Отображение карточек */}
            {/* Отображение карточек */}
            <div className={classes.cards}>
              {selectedData.length > 0 ? (
                selected === 0 || selected === 1 || selected === 2 ? (
                  selectedData.map((item) => (
                    <Card1 item={item} swiperRef={swiperRef} key={item.id} />
                  ))
                ) : selected === 3 ? (
                  selectedData.map((item) => (
                    <HotelCard
                      item={item}
                      swiperRef={swiperRef}
                      key={item.id}
                    />
                  ))
                ) : selected === 4 ? (
                  selectedData.map((item) => (
                    <CardPlaces
                      item={item}
                      swiperRef={swiperRef}
                      key={item.id}
                    />
                  ))
                ) : selected === 5 ? (
                  selectedData.map((item) => (
                    <CardEvents
                      item={item}
                      swiperRef={swiperRef}
                      key={item.id}
                    />
                  ))
                ) : (
                  // Если понадобится для других категорий
                  selectedData.map((item) => (
                    <Card1 item={item} swiperRef={swiperRef} key={item.id} />
                  ))
                )
              ) : (
                <p>Нет данных</p>
              )}
            </div>
          </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default Container1;
