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
                <img src="/images/logo.png" />
                <span>Политика конфиденциальности</span>
                <span>Пользовательское соглашение</span>
              </div>
              <div className={classes.container2}>
                <span onClick={() => navigate('/')}>123</span>
              </div>
              <div className={classes.container3}></div>
              <div className={classes.container4}></div>
            </div>
          </WidthBlock>
        </CenterBlock>
      </div>
    </>
  );
}

export default Footer;
