import React from 'react';
import classes from './Header.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import { Link, useNavigate } from 'react-router';

function Header({ children, ...props }) {
  const navigate = useNavigate();
  return (
    <>
      <CenterBlock>
        <WidthBlock>
          <div className={classes.container}>
            <div className={classes.containerLeft} onClick={() => navigate('/')}>
              <img src="/images/logoBlack.png" />
            </div>
            <div className={classes.containerCenter}>
              <Link to="/">Главная</Link>
              <Link to="/about">О нас</Link>
              <Link to="/transfer">Трансфер</Link>
              <Link to="/faq">FAQ</Link>
              <Link to="/contacts">Контакты</Link>
              <Link to="/turagents">Турагентам</Link>
            </div>
            <div className={classes.containerRight}>
              <Link to="/favourites">
                <img src="/images/favorites.webp" />
              </Link>
              <Link to="/profile">
                <img src="/images/profile.webp" />
              </Link>
              <Link to="/profile" className={}><img src='/images/coolicon.png'/></Link>
            </div>
          </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default Header;
