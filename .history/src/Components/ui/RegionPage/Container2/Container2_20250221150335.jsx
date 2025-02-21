import React from 'react';
import classes from './Container2.module.css';
import CenterBlock from '../../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../../Standart/WidthBlock/WidthBlock';

function Container2({
  currentRegion,
  selected,
  options,
  multiDayTours,
  onerDayTours,
  hotels,
  places,
  events,
}) {
  // Объект для связи options с соответствующими данными
  const dataMap = {
    0: multiDayTours, // Многодневные туры
    1: onerDayTours, // Однодневные экскурсии
    2: [], // Авторские туры (замени на реальный массив)
    3: hotels, // Отели / Апартаменты
    4: places, // Что посетить
    5: events, // Региональные MICE ивенты
  };

  // Получаем данные по выбранному индексу
  const selectedData = selected !== null && selected in dataMap ? dataMap[selected] : [];

  return (
    <CenterBlock>
      <WidthBlock>
        <div className={classes.container}>
          <div className={classes.containerTitle}>
            {selected !== null && selected >= 0 && selected < options.length ? (
              <div className={classes.containerTitleData}>
                <span>{options[selected].text}</span> 
                <span>Найдено: {selectedData.length}</span>
              </div>
            ) : (
              <span>Выберите категорию</span>
            )}
          </div>
        </div>
      </WidthBlock>
    </CenterBlock>
  );
}

export default Container2;
