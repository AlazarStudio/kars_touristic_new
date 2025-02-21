import React, { useEffect } from 'react';
import classes from './Container1.module.css';
import CenterBlock from '../../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../../Standart/WidthBlock/WidthBlock';

function Container1({
  currentRegion,
  selected,
  setSelected,
  options,
  selected,
  options,
  multiDayTours,
  onerDayTours,
  hotels,
  places,
  events,
}) {
  useEffect(() => {
    if (selected !== null) {
      localStorage.setItem('selectedContainer', selected);
    }
  }, [selected]);

  const dataMap = {
    0: multiDayTours, // Многодневные туры
    1: onerDayTours, // Однодневные экскурсии
    2: [], // Авторские туры (замени на реальный массив)
    3: hotels, // Отели / Апартаменты
    4: places, // Что посетить
    5: events, // Региональные MICE ивенты
  };

  const selectedData =
    selected !== null && selected in dataMap ? dataMap[selected] : [];

  return (
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
        <div className={classes.container2}>
          <div className={classes.container2Title}>
            {selected !== null && selected >= 0 && selected < options.length ? (
              <div className={classes.container2TitleData}>
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

export default Container1;
