import React, { useEffect, useRef, useState } from "react";
import classes from "./Header.module.css";
import CenterBlock from "../../Standart/CenterBlock/CenterBlock";
import WidthBlock from "../../Standart/WidthBlock/WidthBlock";
import { Link, useNavigate } from "react-router";

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
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isMenuOpen]);

  return (
    <>
      <CenterBlock>
        <WidthBlock>
          <div className={classes.container}>
            <div className={classes.containerLeft} onClick={() => navigate("/")}>
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
              <div
                className={classes.containerRightColl}
                onClick={toggleMenu}
              >
                <img src="/images/coolicon.png" />
              </div>
              <div
                ref={menuRef}
                className={`${classes.dropdownMenu} ${isMenuOpen ? classes.show : ""}`}
              >
                <ul>
                  <li>
                    <Link to="/" onClick={toggleMenu}>
                      ГЛАВНАЯ
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" onClick={toggleMenu}>
                      Онас
                    </Link>
                  </li>
                  <li>
                    <Link to="/cases" onClick={toggleMenu}>
                      КЕЙСЫ
                    </Link>
                  </li>
                  <li>
                    <Link to="/shop" onClick={toggleMenu}>
                      МАГАЗИН
                    </Link>
                  </li>
                  <li>
                    <Link to="/information" onClick={toggleMenu}>
                      О НАС
                    </Link>
                  </li>
                  <li>
                    <Link to="/contacts" onClick={toggleMenu}>
                      КОНТАКТЫ
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
