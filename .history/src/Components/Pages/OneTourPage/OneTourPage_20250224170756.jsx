import React from 'react';
import { useParams } from 'react-router-dom';
import classes from './OneTourPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import Header1 from '../../ui/RegionPage/Header/Header1';
import { multiDayTours, onerDayTours } from '../../../../bd'; // ✅ Проверь правильность пути!

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

  console.log('multiDayTours:', multiDayTours);
  console.log('onerDayTours:', onerDayTours);

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
        <img src={tour.img[1]} />
        <Header1 />

        <CenterBlock>
          <WidthBlock>
            <div className={classes.container}>
              <div className={classes.tourContent}>
                <h1>{tour.title}</h1>
                <p>{tour.addInfo}</p>

                <div className={classes.tourImages}>
                  {/* <img src={tour.img[1]} /> */}
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
