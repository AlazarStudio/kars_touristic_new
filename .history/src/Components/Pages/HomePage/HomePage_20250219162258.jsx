import React from 'react';
import classes from './HomePage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import { republics } from '../../../../bd';
import { useNavigate } from 'react-router';
import translit from 'translit-js';

function HomePage({ children, ...props }) {
  const navigate = useNavigate();
  return (
    <>
      <CenterBlock>
        <WidthBlock>
          <div className={classes.container}>
            <div className={classes.containerTitle}>
              <span>ОРГАНИЗУЕМ ВАШ ОТДЫХ НА КАВКАЗЕ</span>
            </div>
            <div className={classes.containerSearch}>
              <input placeholder="Поиск" />
              <button>Найти</button>
            </div>
            <div className={classes.containerCards}>
              {republics.map((el) => (
                <div
                  className={classes.containerCardsEl}
                  key={el.id}
                  onClick={() =>
                    navigate(
                      `/service/${translit(el.title)
                        .toLowerCase()
                        .replaceAll(' ', '-')
                        .replaceAll('«', '')
                        .replaceAll('»', '')}`
                    )
                  }
                >
                  <img src={el.img2} />
                  <img src={el.img1} />
                  <span>{el.title}</span>
                </div>
              ))}
            </div>
          </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default HomePage;
