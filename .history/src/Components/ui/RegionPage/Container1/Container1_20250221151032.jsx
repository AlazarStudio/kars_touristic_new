import React, { useEffect } from 'react';
import classes from './Container1.module.css';
import CenterBlock from '../../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../../Standart/WidthBlock/WidthBlock';

function Container1({ currentRegion, selected, setSelected, options }) {
  useEffect(() => {
    if (selected !== null) {
      localStorage.setItem('selectedContainer', selected);
    }
  }, [selected]);

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

export default Container1;
