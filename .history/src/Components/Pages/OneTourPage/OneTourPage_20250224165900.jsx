import React from 'react';
import { useParams } from 'react-router-dom';
import classes from './OneTourPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import Header1 from '../../ui/RegionPage/Header/Header1';
import { multiDayTours, onerDayTours } from '../../../../bd'; // ✅ Импорт данных

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
  console.log(multiDayTours);
  // ✅ Ищем тур в обоих списках
  const tour = [...multiDayTours, ...onerDayTours].find(
    (item) =>
      transliterate(item.title).toLowerCase() === decodedTitle.toLowerCase()
  );

  if (!tour) {
    <h2>/* eturn <h2>Тур не найден< *//h2>;
  }
  

  return (
    <>
      <CenterBlock>
        <WidthBlock>
          <div className={classes.container}>
            <Header1 />
            <div className={classes.tourContent}>
              <h1>{tour.title}</h1>
              <p>{tour.addInfo}</p>
              <span>Способ передвижения: {tour.transport}</span>
              <span>Продолжительность: {tour.duration}</span>
              <span>Время отправления: {tour.timeToStart}</span>
              <span>Тип экскурсии: {tour.type}</span>
              <span>Сложность: {tour.level}</span>
              <span>Цена: {Number(tour.price).toLocaleString('ru-RU')} ₽</span>

              <div className={classes.tourImages}>
                {tour.img.map((image, idx) => (
                  <img
                    key={idx}
                    src={image}
                    alt={`${tour.title} - ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default OneTourPage;
