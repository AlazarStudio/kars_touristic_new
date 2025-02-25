import React, { useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import classes from './OneTourPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import Header1 from '../../ui/RegionPage/Header/Header1';
import { multiDayTours, onerDayTours } from '../../../../bd'; // ✅ Проверь правильность пути!
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

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
    ' ': '-',
    ъ: '',
    ь: `'`,
  };

  return text
    .split('')
    .map((char) => map[char] || char)
    .join('');
};

function OneTourPage() {
  const { title } = useParams();
  const decodedTitle = decodeURIComponent(title);
  const swiperRef = useRef(null); // Создаём уникальный useRef для каждой карточки

  // console.log('multiDayTours:', multiDayTours);
  // console.log('onerDayTours:', onerDayTours);

  // ✅ Проверяем, что `multiDayTours` и `onerDayTours` существуют и содержат массивы
  if (!Array.isArray(multiDayTours) || !Array.isArray(onerDayTours)) {
    return <h2>Ошибка загрузки данных</h2>;
  }

  // ✅ Ищем тур в обоих списках
  const tour = [...multiDayTours, ...onerDayTours].find(
    (item) =>
      transliterate(item.title).toLowerCase() === decodedTitle.toLowerCase()
  );

  if (!tour) {
    return <h2>Тур не найден</h2>;
  }

  return (
    <>
      <div className={classes.imgBack}>
        <img src={tour.img[1]} className={classes.back} />

        <CenterBlock>
          <WidthBlock>
            <div className={classes.container}>
              <Header1 />
              <div className={classes.tourContent}>
                <div className={classes.link}></div>
                <div className={classes.block1}>
                  <h1>{tour.title}</h1>
                  <div className={classes.card}></div>
                  <div className={classes.cardLeft}>
                    <div className={classes.cardLeftEl}>
                      <span>Способ передвижения:</span>
                      <span>{tour.transport}</span>
                    </div>
                    <div className={classes.cardLeftEl}>
                      <span>Продолжительность:</span>
                      <span>{tour.duration}</span>
                    </div>
                    <div className={classes.cardLeftEl}>
                      <span>Время отправления:</span>
                      <span>{tour.timeToStart}</span>
                    </div>
                    <div className={classes.cardLeftEl}>
                      <span>Тип экскурсии:</span>
                      <span>{tour.type}</span>
                    </div>
                    <div className={classes.cardLeftEl}>
                      <span>Сложность:</span>
                      <span>{tour.level}</span>
                    </div>
                    <div className={classes.cardLeftEl}>
                      <span>Стоимость:</span>
                      <span>{tour.price}</span>
                    </div>
                  
                  </div>
                  <div className={classes.cardRight}>
                  <Swiper
        modules={[Navigation, Pagination]}
        // pagination={{ clickable: true }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className={classes.swiper}
        loop={true}
      >
        {tour.img.map((image, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={image}
              alt={`${tour.title} - ${idx + 1}`}
              className={classes.cardImg}
            />
          </SwiperSlide>
        ))}
      </Swiper>
                  </div>
                </div>
              </div>
            </div>
          </WidthBlock>
        </CenterBlock>
      </div>
      
    </>
  );
}

export default OneTourPage;
