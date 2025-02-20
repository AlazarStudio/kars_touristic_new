import React, { useEffect, useRef, useState } from 'react';
import classes from './Container2.module.css';
import CenterBlock from '../../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../../Standart/WidthBlock/WidthBlock';

function Container2({ currentRegion }) {

  return (
    <>
      <CenterBlock>
        <WidthBlock>
          <div className={classes.container}>
<span>{currentRegion.title</span>
          </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default Container2;
