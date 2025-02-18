import React from 'react';
import classes from './HomePage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';

function HomePage({ children, ...props }) {
  return (
    <>
      <CenterBlock>
        <WidthBlock>
          <div className={classes.container}>
            <div className={classes.containerTitle}>
              <span>Организуем ваш отдых на Кавказе</span>
            </div>
            <div className={classes.containerSearch}>
              <input placeholder="Поиск" />
              <button
            </div>
          </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default HomePage;
