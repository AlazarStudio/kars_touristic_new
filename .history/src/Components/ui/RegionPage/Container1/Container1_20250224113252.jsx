import React, { useEffect, useRef } from 'react';
import classes from './Container1.module.css';
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
            <div className={classes.cards}>
              {selectedData.length > 0 ? (
                selectedData.map((item) => {
                  const swiperRef = useRef(null); // Каждый Swiper получает свой useRef

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
                        <span className={classes.addInfo}
                      </div>
                    </div>
                  );
                })
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
