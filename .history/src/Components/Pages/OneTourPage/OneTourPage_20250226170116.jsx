import React, { useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import classes from './OneTourPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import Header1 from '../../ui/RegionPage/Header/Header1';
import { multiDayTours, onerDayTours, regions } from '../../../../bd'; // ✅ Добавили regions
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

const transliterate1 = (text) => {
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
    ь: '',
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

function OneTourPage() {
  const { title } = useParams();
  const decodedTitle = decodeURIComponent(title);
  const swiperRef = useRef(null);

  if (!Array.isArray(multiDayTours) || !Array.isArray(onerDayTours)) {
    return <h2>Ошибка загрузки данных</h2>;
  }

  // Найти тур по названию
  const tour = [...multiDayTours, ...onerDayTours].find(
    (item) =>
      transliterate(item.title).toLowerCase() === decodedTitle.toLowerCase()
  );

  if (!tour) {
    return <h2>Тур не найден</h2>;
  }

  // Найти регион тура
  const currentRegion = regions.find((region) => region.id === tour.regionId);

  return (
    <>
      <div className={classes.imgBack}>
        <img src={tour.img[1]} className={classes.back} />

        <div className={classes.container}>
          <Header1 />
          <CenterBlock>
            <WidthBlock>
              <div className={classes.tourContent}>
                <div className={classes.link}>
                  <Link to="/">Главная</Link>
                  {'/'}
                  {currentRegion && (
                    <Link to={`/region/${transliterate1(currentRegion.link)}`}>
                      {currentRegion.title}
                    </Link>
                  )}
                  {'/'}
                  <span>{tour.title}</span>
                </div>
                <div className={classes.block1}>
                  <h1>{tour.title}</h1>
                  <div className={classes.card}>
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
                      <div className={classes.cardButtons}>
                        <button onClick={() => swiperRef.current?.slidePrev()}>
                          <img src="/images/butLeft.png" alt="Prev" />
                        </button>
                        <button onClick={() => swiperRef.current?.slideNext()}>
                          <img src="/images/butRight.png" alt="Next" />
                        </button>
                      </div>
                    </div>
                    
                  </div>
                  <div className=
                </div>
              </div>
            </WidthBlock>
          </CenterBlock>
        </div>
      </div>
    </>
  );
}

export default OneTourPage;
