import React, { useEffect, useRef, useState } from 'react';
import classes from './Header.module.css';

import { Link, useNavigate } from 'react-router';
import CenterBlock from '../../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../../Standart/WidthBlock/WidthBlock';

function Header({ children, ...props }) {


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
