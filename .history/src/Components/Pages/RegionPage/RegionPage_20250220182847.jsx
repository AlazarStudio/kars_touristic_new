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
import Header from '../../ui/RegionPage/Header/Header';
import Container1 from '../../ui/RegionPage/Container1/Container1';
import Container2 from '../../ui/RegionPage/Container2/Container2';

const transliterate = (text) => {
  const map = {
    а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'yo', ж: 'zh', з: 'z', и: 'i', й: 'y', 
    к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', 
    х: 'kh', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'shch', ы: 'y', э: 'e', ю: 'yu', я: 'ya', ъ: '', ь: '', 
    ' ': '-'
  };
  return text.split('').map((char) => map[char] || char).join('');
};

function RegionPage() {
  const { title } = useParams();
  const decodedTitle = decodeURIComponent(title);
  const currentRegion = regions.find((item) => transliterate(item.link) === decodedTitle);

  const [selected, setSelected] = useState(() => {
    const saved = localStorage.getItem('selectedContainer');
    return saved !== null ? Number(saved) : null;
  });

  if (!currentRegion) {
    console.error(`Ошибка: регион "${decodedTitle}" не найден в базе`);
    return <p>Регион не найден</p>;
  }

  return (
    <>
      <div className={classes.back}>
        <CenterBlock>
          <WidthBlock>
            <Header />
            <div className={classes.container}>
              <img
                src={currentRegion.img[1]}
                alt={currentRegion.title}
                className={classes.backImg}
              />
              <Container1 currentRegion={currentRegion} selected={selected} setSelected={setSelected} />
            </div>
            <div className={classes.containerData}>
              <Container2
                currentRegion={currentRegion}
                selected={selected}
                multiDayTours={multiDayTours}
                onerDayTours={onerDayTours}
                hotels={hotels}
                places={places}
                events={events}
              />
            </div>
          </WidthBlock>
        </CenterBlock>
      </div>
    </>
  );
}

export default RegionPage;
