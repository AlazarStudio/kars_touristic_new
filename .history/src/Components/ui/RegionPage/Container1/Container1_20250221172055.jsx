import React, { useEffect, useState } from 'react';
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

  const [currentImageIndex, setCurrentImageIndex] = useState({});

  const handlePrev = (id, images) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [id]: prev[id] > 0 ? prev[id] - 1 : images.length - 1,
    }));
  };

  const handleNext = (id, images) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [id]: prev[id] < images.length - 1 ? prev[id] + 1 : 0,
    }));
  };

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

  const selectedData =
    selected !== null && selected in dataMap ? dataMap[selected] || [] : [];

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
                  const currentIndex = currentImageIndex[item.id] || 0;

                  return (
                    <div key={item.id} className={classes.card1}>
                      <div className={classes.carousel}>
                        <button className={classes.prev} onClick={() => handlePrev(item.id, item.img)}>‹</button>
                        <img src={item.img[currentIndex]} alt={`${item.title} - ${currentIndex + 1}`} className={classes.cardImg} />
                        <button className={classes.next} onClick={() => handleNext(item.id, item.img)}>›</button>
                      </div>
                      <div className={classes.cardContent}>
                        <h3>{item.title}</h3>
                        <p>{item.description} | {item.transport}</p>
                        <p>{item.level} | {item.type}</p>
                        <p><strong>Цена:</strong> {item.price} ₽</p>
                      </div>
                    </div>
                  );
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
