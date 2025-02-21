import React, { useEffect } from 'react';
import classes from './Container1.module.css';
import CenterBlock from '../../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../../Standart/WidthBlock/WidthBlock';
import Header from '../Header/Header';

function Container1({ currentRegion, selected, setSelected }) {
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
    { img: '/images/event.webp', text: 'Региональные Mice ивенты' }
  ];

  return (
    <CenterBlock>
      <WidthBlock>
        <div className={classes.container}>
                        <img
                          src={currentRegion.img[1]}
                          alt={currentRegion.title}
                          className={classes.backImg}
                        />
                        <Header
          <div className={classes.containerLeft}>
            <img src={currentRegion.img[0]} alt={currentRegion.title} />
            <span>{currentRegion.title}</span>
            <span>{currentRegion.description}</span>
          </div>
          <div className={classes.containerRight}>
            {options.map((el, index) => (
              <div
                key={index}
                className={`${classes.containerRightEl} ${selected === index ? classes.selected : ''}`}
                onClick={() => setSelected(index)}
              >
                <img src={el.img} alt={el.text} />
                <span>{el.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={classes.container2}>
          12312312
          12312
        </div>
      </WidthBlock>
    </CenterBlock>
  );
}

export default Container1;
