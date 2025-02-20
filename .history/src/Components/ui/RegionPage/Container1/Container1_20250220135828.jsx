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
  
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default Header;
