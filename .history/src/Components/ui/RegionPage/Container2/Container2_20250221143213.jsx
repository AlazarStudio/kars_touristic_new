import React from 'react';
import classes from './Container2.module.css';
import CenterBlock from '../../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../../Standart/WidthBlock/WidthBlock';

function Container2({
  currentRegion,
  selected,
  multiDayTours,
  onerDayTours,
  hotels,
  places,
  events,
}) {
  const options = [
    'МНОГОДНЕВНЫЕ ТУРЫ',
    'ОДНОДНЕВНЫЕ ЭКСКУРСИИ',
    'АВТОРСКИЕ ТУРЫ',
    'ОТЕЛИ / АППАРТАМЕНТЫ',
    'Что посетить',
    'Региональные Mice ивенты',
  ];

  return (
    <CenterBlock>
      <WidthBlock>
        <div className={classes.container}>
          {/* <span>{currentRegion.title}</span> */}
          <div className={classes.containerTitle}>
            {selected !== null && <span>{options[selected]}</span>}
          </div>
        </div>
      </WidthBlock>
    </CenterBlock>
  );
}

export default Container2;
