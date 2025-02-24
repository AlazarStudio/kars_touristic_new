import React, { useState } from 'react';
import classes from './RegionPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import {
  regions,
  multiDayTours,
  onerDayTours,
  hotels,
  places,
  events,
} from '../../../../bd';
import { useParams } from 'react-router';
// import Header from '../../ui/RegionPage/Header/Header';
import Container1 from '../../ui/RegionPage/Container1/Container1';

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

function RegionPage() {
  const { title } = useParams();
  const decodedTitle = decodeURIComponent(title);
  const currentRegion = regions.find(
    (item) =>
      transliterate(item.link).toLowerCase() === decodedTitle.toLowerCase()
  );

  const [selected, setSelected] = useState(() => {
    const saved = localStorage.getItem('selectedContainer');
    return saved !== null ? Number(saved) : null;
  });

  if (!currentRegion) {
    console.error(`Ошибка: регион "${decodedTitle}" не найден в базе`);
    return <p>Регион не найден</p>;
  }

  // Определяем список категорий
  const options = [
    { img: '/images/baggage.webp', text: 'Многодневные туры' },
    { img: '/images/ekskurs.webp', text: 'Однодневные экскурсии' },
    { img: '/images/avtor.webp', text: 'Авторские туры' },
    { img: '/images/appart.webp', text: 'Отели / Апартаменты' },
    { img: '/images/searchLoc.webp', text: 'Что посетить' },
    { img: '/images/event.webp', text: 'Региональные Mice ивенты' },
  ];

  return (
    <>
 

              <Container1
                currentRegion={currentRegion}
                selected={selected}
                setSelected={setSelected}
                options={options} // Передаем options в Container1
                multiDayTours={multiDayTours}
                onerDayTours={onerDayTours}
                hotels={hotels}
                places={places}
                events={events}
              />

    </>
  );
}

export default RegionPage;
