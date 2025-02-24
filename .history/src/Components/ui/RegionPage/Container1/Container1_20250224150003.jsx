import React, { useEffect, useRef, useState } from 'react';
import classes from './Container1.module.css';
import CenterBlock from '../../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../../Standart/WidthBlock/WidthBlock';
import Header1 from '../Header/Header1';

// Подключаем стили Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Card1 from '../Cards/Tours/Card1/Card1';
import HotelCard from '../Cards/Hotels/HotelCard';
import PlacesCard from '../Cards/PlacesCard/PlacesCard';
import EventsCard from '../Cards/Events/EventsCard';

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

  // 🔹 Состояния для поиска и фильтрации
  const [searchQuery, setSearchQuery] = useState('');
  const [transportFilter, setTransportFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [levelFilter, setLevelFilter] = useState('');

  const options = [
    { img: '/images/baggage.webp', text: 'Многодневные туры' },
    { img: '/images/ekskurs.webp', text: 'Однодневные экскурсии' },
    { img: '/images/avtor.webp', text: 'Авторские туры' },
    { img: '/images/appart.webp', text: 'Отели / Апартаменты' },
    { img: '/images/searchLoc.webp', text: 'Что посетить' },
    { img: '/images/event.webp', text: 'Региональные Mice ивенты' },
  ];

  const selectedData =
    selected === 0
      ? multiDayTours.filter((tour) =>
          Array.isArray(tour.regionId)
            ? tour.regionId.includes(currentRegion.id)
            : tour.regionId === currentRegion.id
        )
      : selected === 1
      ? onerDayTours.filter((tour) =>
          Array.isArray(tour.regionId)
            ? tour.regionId.includes(currentRegion.id)
            : tour.regionId === currentRegion.id
        )
      : selected === 2
      ? []
      : selected === 3
      ? hotels.filter((hotel) => hotel.regionId === currentRegion.id)
      : selected === 4
      ? places.filter((place) => place.regionId === currentRegion.id)
      : selected === 5
      ? events.filter((event) => event.regionId === currentRegion.id)
      : [];

  // 🔹 Фильтрация данных по поиску и select'ам
  const filteredData = selectedData.filter((item) => {
    const matchesSearch =
      searchQuery.length === 0 ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.places &&
        item.places.some((place) =>
          place.toLowerCase().includes(searchQuery.toLowerCase())
        ));

    const matchesTransport =
      transportFilter === '' || (item.transport && item.transport === transportFilter);

    const matchesType =
      typeFilter === '' || (item.type && item.type === typeFilter);

    const matchesLevel =
      levelFilter === '' || (item.level && item.level === levelFilter);

    return matchesSearch && matchesTransport && matchesType && matchesLevel;
  });

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

      {/* 🔹 Фильтр и поиск */}
      <CenterBlock>
        <WidthBlock>
          <div className={classes.container2}>
            <div className={classes.container2Title}>
              {selected !== null && selected >= 0 && selected < options.length ? (
                <>
                  <span>{options[selected].text}</span>
                  <span>Найдено: {filteredData.length}</span>
                </>
              ) : (
                <span>Выберите категорию</span>
              )}
            </div>

            <div className={classes.filter}>
              <input
                type="text"
                placeholder="Поиск по названию или месту пребывания"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              <select value={transportFilter} onChange={(e) => setTransportFilter(e.target.value)}>
                <option value="">Способ передвижения</option>
                <option value="Автобус">Автобус</option>
                <option value="Поезд">Поезд</option>
                <option value="Самолет">Самолет</option>
                <option value="Автомобиль">Автомобиль</option>
              </select>

              <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                <option value="">Тип поездки</option>
                <option value="Фото Тур">Фото Тур</option>
                <option value="Экскурсионный">Экскурсионный</option>
                <option value="Активный отдых">Активный отдых</option>
              </select>

              <select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)}>
                <option value="">Сложность поездки</option>
                <option value="Базовая">Базовая</option>
                <option value="Средняя">Средняя</option>
                <option value="Высокая">Высокая</option>
              </select>
            </div>

            {/* 🔹 Отображение карточек */}
            <div className={classes.cards}>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  selected === 0 || selected === 1 || selected === 2 ? (
                    <Card1 item={item} swiperRef={swiperRef} key={item.id} />
                  ) : selected === 3 ? (
                    <HotelCard item={item} swiperRef={swiperRef} key={item.id} />
                  ) : selected === 4 ? (
                    <PlacesCard item={item} swiperRef={swiperRef} key={item.id} />
                  ) : selected === 5 ? (
                    <EventsCard item={item} swiperRef={swiperRef} key={item.id} />
                  ) : null
                ))
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
