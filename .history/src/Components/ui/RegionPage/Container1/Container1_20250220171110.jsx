import React, { useEffect, useRef, useState } from 'react';
import classes from './Container1.module.css';
import CenterBlock from '../../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../../Standart/WidthBlock/WidthBlock';

function Container1({ currentRegion }) {
  const [selected, setSelected] = useState(() => {
    const saved = localStorage.getItem('selectedContainer');
    return saved !== null ? Number(saved) : null;
  });

  useEffect(() => {
    if (selected !== null) {
      localStorage.setItem('selectedContainer', selected);
    }
  }, [selected]);co
  return (
    <>
      <CenterBlock>
        <WidthBlock>
          <div className={classes.container}>
            <div className={classes.containerLeft}>
              <img src={currentRegion.img[0]} alt={currentRegion.title} />
              <span>{currentRegion.title}</span>
              <span>{currentRegion.description}</span>
            </div>
            <div className={classes.containerRight}>
              {[
                { img: '/images/baggage.webp', text: 'Многодневные туры' },
                { img: '/images/ekskurs.webp', text: 'Однодневные экскурсии' },
                { img: '/images/avtor.webp', text: 'Авторские туры' },
                { img: '/images/appart.webp', text: 'Отели / Апартаменты' },
                { img: '/images/searchLoc.webp', text: 'Что посетить' },
                { img: '/images/event.webp', text: 'Региональные Mice ивенты' },
              ].map((el, index) => (
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
    </>
  );
}

export default Container1;
