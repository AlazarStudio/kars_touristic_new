import React, { useEffect, useRef, useState } from 'react';
import classes from './Container1.module.css';
import CenterBlock from '../../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../../Standart/WidthBlock/WidthBlock';

function Container1({ children, ...props }) {


  return (
    <>
      <CenterBlock>
        <WidthBlock>
  1234
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default Container1;
