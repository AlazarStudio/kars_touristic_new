import React, { useEffect } from 'react';
import classes from './Container1.module.css';
import CenterBlock from '../../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../../Standart/WidthBlock/WidthBlock';
import Header1 from '../Header/Header1';

function Container1({
  currentRegion,
  selected,
  setSelected,
  multiDayTours = [],
  onerDayTours = [],
  hotels = [],
  places = [],
  events = [],
}) {
  useEffect(() => {
    if (selected !== null) {
      localStorage.setItem('selectedContainer', selected);
    }
  }, [selected]);

  const options = [
    { img: '/images/baggage.webp', text: 'Многодневные туры' },
    { img: '/images/ekskurs.webp', text: 'Однодневные экскурсии' },
    { img: '/images/avtor.webp', text: 'Авторские туры' },
    { img: '/images/appart.webp', text: 'Отели / Апартаменты' },
    { img: '/images/searchLoc.webp', text: 'Что посетить' },
    { img: '/images/event.webp', text: 'Региональные Mice ивенты' },
  ];

  const dataMap = {
    0: multiDayTours || [],
    1: onerDayTours || [],
    2: [], 
    3: hotels || [],
    4: places || [],
    5: events || [],
  };

  const selectedData = selected !== null && selected in dataMap ? dataMap[selected] || [] : [];

  return (
    <>
      <div className={classes.containerImg}>
        <img
          src={currentRegion.img[1]}
          alt={currentRegion.title}
          className={classes.backImg}
        />
        <Header1 />
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
          </WidthBlock>
        </CenterBlock>
      </div>

      {/* Блок с карточками */}
      <CenterBlock>
        <WidthBlock>
          <div className={classes.container2}>
            <div className={classes.container2Title}>
              {selected !== null && selected >= 0 && selected < options.length ? (
                <>
                  <span>{options[selected].text}</span>
                  <span>Найдено: {selectedData.length}</span>
                </>
              ) : (
                <span>Выберите категорию</span>
              )}
            </div>

            {/* Отображение карточек */}
            <div className={classes.cards}>
              {selectedData.length > 0 ? (
                selectedData.map((item) => {
                  if (selected === 0 || selected === 1) {
                    return (
                      <div key={item.id} className={classes.card1}>
                        <img src={item.img[0]} alt={item.title} className={classes.cardImg} />
                        <div className={classes.cardContent}>
                          <h3>{item.title}</h3>
                          <p>{item.description} | {item.transport}</p>
                          <p>{item.level} | {item.type}</p>
                          <p><strong>Цена:</strong> {item.price} ₽</p>
                        </div>
                      </div>
                    );
                  }

                  if (selected === 3) {
                    return (
                      <div key={item.id} className={classes.card2}>
                        <img src={item.img[0]} alt={item.title} className={classes.cardImg} />
                        <div className={classes.cardContent}>
                          <h3>{item.title}</h3>
                          <p>{item.city}</p>
                          <p><strong>Адрес:</strong> {item.address}</p>
                          <p><strong>Звезды:</strong> {item.numStars}</p>
                        </div>
                      </div>
                    );
                  }

                  if (selected === 4) {
                    return (
                      <div key={item.id} className={classes.card3}>
                        <img src={item.img[0]} alt={item.title} className={classes.cardImg} />
                        <div className={classes.cardContent}>
                          <h3>{item.title}</h3>
                          <p>{item.description}</p>
                          <a href={item.links} target="_blank" rel="noopener noreferrer">Подробнее</a>
                        </div>
                      </div>
                    );
                  }

                  if (selected === 5) {
                    return (
                      <div key={item.id} className={classes.card4}>
                        <img src={item.img[0]} alt={item.title} className={classes.cardImg} />
                        <div className={classes.cardContent}>
                          <h3>{item.title}</h3>
                          <p>{item.description}</p>
                          <a href={item.link} target="_blank" rel="noopener noreferrer">Подробнее</a>
                        </div>
                      </div>
                    );
                  }

                  return null;
                })
              ) : (
                <p className={classes.noData}>Нет доступных данных</p>
              )}
            </div>
          </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default Container1;
