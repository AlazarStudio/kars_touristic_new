import React from 'react';
import classes from './Footer.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import { useNavigate } from 'react-router';

function Footer({ children, ...props }) {
  const navigate = useNavigate();
  return (
    <>
      <div className={classes.back}>
        <CenterBlock>
          <WidthBlock>
            <div className={classes.container}>
              <div className={classes.container1}>
                <img src="/images/logo.png" onClick={() => naavigate('/')} />
                <span>Политика конфиденциальности</span>
                <span>Пользовательское соглашение</span>
              </div>
              <div className={classes.container2}>
                <span onClick={() => navigate('/')}>Главная</span>
                <span onClick={() => navigate('/about')}>О нас</span>
                <span onClick={() => navigate('/transfer')}>Трансфер</span>
                <span onClick={() => navigate('/faq')}>FAQ</span>
                <span onClick={() => navigate('/contacts')}>Контакты</span>
              </div>
              <div className={classes.container3}>
                <span>8-800-550-40-17</span>
                <span>Телефон поддержки</span>
                <span>
                  <img src="/images/tg.png" />
                </span>
                <span>
                  <img src="/images/vk.png" />
                </span>
              </div>
              <div className={classes.container4}>
                <img src="/images/alazaR.webp" />
              </div>
            </div>
          </WidthBlock>
        </CenterBlock>
      </div>
    </>
  );
}

export default Footer;
