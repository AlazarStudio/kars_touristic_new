import React, { useEffect } from 'react';
import classes from './Container1.module.css';
import CenterBlock from '../../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../../Standart/WidthBlock/WidthBlock';

function Container1({
  currentRegion,
  selected,
  setSelected,
  options,
  multiDayTours = [],
  onerDayTours = [],
  hotels = [],
  places = [],
  events = [],
}) {
  // Объект для связи options с соответствующими данными
  const dataMap = {
    0: multiDayTours || [], // Многодневные туры
    1: onerDayTours || [], // Однодневные экскурсии
    2: [], // Авторские туры (замени на реальный массив)
    3: hotels || [], // Отели / Апартаменты
    4: places || [], // Что посетить
    5: events || [], // Региональные MICE ивенты
  };

  // Получаем данные по выбранному индексу (если `undefined`, используем `[]`)
  const selectedData = selected !== null && selected in dataMap ? dataMap[selected] || [] : [];

  useEffect(() => {
    if (selected !== null) {
      localStorage.setItem('selectedContainer', selected);
    }
  }, [selected]);

  return (
    <CenterBlock>
      <WidthBlock>
        <div className={classes.container}>
          {/* Левая часть (картинка и описание региона) */}
          <div className={classes.containerLeft}>
            <img src={currentRegion.img[0]} alt={currentRegion.title} />
            <span>{currentRegion.title}</span>
            <span>{currentRegion.description}</span>
          </div>

          {/* Правая часть (категории и данные) */}
          <div className={classes.containerRight}>
            {/* Выбор категорий */}
            <div className={classes.categories}>
              {options.map((el, index) => (
                <div
                  key={index}
                  className={`${classes.categoryItem} ${selected === index ? classes.selected : ''}`}
                  onClick={() => setSelected(index)}
                >
                  <img src={el.img} alt={el.text} />
                  <span>{el.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </WidthBlock>
    </CenterBlock>
  );
}

export default Container1;
