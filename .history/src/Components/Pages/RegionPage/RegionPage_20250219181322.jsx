import React from 'react';
import classes from './RegionPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import { regions } from '../../../../bd';
import { useParams } from 'react-router';

// Функция обратной транслитерации (из латиницы в русский)
const reverseTransliterate = (text) => {
  const map = {
    "a": "а", "b": "б", "v": "в", "g": "г", "d": "д", "e": "е", "yo": "ё", "zh": "ж",
    "z": "з", "i": "и", "y": "й", "k": "к", "l": "л", "m": "м", "n": "н", "o": "о",
    "p": "п", "r": "р", "s": "с", "t": "т", "u": "у", "f": "ф", "kh": "х", "ts": "ц",
    "ch": "ч", "sh": "ш", "shch": "щ", "y": "ы", "e": "э", "yu": "ю", "ya": "я", "-": " "
  };

  return text
    .toLowerCase()
    .replace(/yo|zh|kh|ts|ch|shch|sh|yu|ya|[a-z-]/g, (match) => map[match] || match);
};

function RegionPage({ children, ...props }) {
  const { title } = useParams();
  const decodedTitle = decodeURIComponent(title);

  // Обратная транслитерация
  const regionTitle = reverseTransliterate(decodedTitle);

  // Проверяем, есть ли такой регион
  const currentRegion = regions.find(
    (item) => item.title.toLowerCase() === regionTitle.toLowerCase()
  );

  if (!currentRegion) {
    return <p>Регион не найден</p>;
  }

  return (
    <div className={classes.back}>
      <h1>{currentRegion.title}</h1>
      <CenterBlock>
        <WidthBlock>
          <p>{currentRegion.description}</p>
          <img src={currentRegion.img[0]} alt={currentRegion.title} />
        </WidthBlock>
      </CenterBlock>
    </div>
  );
}

export default RegionPage;
