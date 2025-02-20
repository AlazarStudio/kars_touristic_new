import React, { useEffect, useRef, useState } from 'react';
import classes from './Header.module.css';

import { Link, useNavigate } from 'react-router';
import CenterBlock from '../../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../../Standart/WidthBlock/WidthBlock';

function Header({ children, ...props }) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isMenuOpen]);

  return (
    <>
      <CenterBlock>
        <WidthBlock>
          <div className={classes.container}>
            <div
              className={classes.containerLeft}
              onClick={() => navigate('/')}
            >
              <img src="/images/logo.png" />
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
                <img src="/images/header11.webp" />
              </Link>
              <Link to="/profile">
                <img src="/images/profile.webp" />
              </Link>
              <div className={classes.containerRightColl} onClick={toggleMenu}>
                <img src="/images/coolicon.png" />
              </div>
              <div
                ref={menuRef}
                className={`${classes.dropdownMenu} ${
                  isMenuOpen ? classes.show : ''
                }`}
              >
                <ul>
                  <li>
                    <Link to="/" onClick={toggleMenu}>
                      Главная
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" onClick={toggleMenu}>
                      О нас
                    </Link>
                  </li>
                  <li>
                    <Link to="/transfer" onClick={toggleMenu}>
                      Трансфер
                    </Link>
                  </li>
                  <li>
                    <Link to="/faq" onClick={toggleMenu}>
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link to="/contacts" onClick={toggleMenu}>
                      Контакты
                    </Link>
                  </li>
                  <li>
                    <Link to="/turagents" onClick={toggleMenu}>
                      Турагентам
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default Header;
