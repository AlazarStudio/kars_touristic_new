import React, { useEffect, useRef, useState } from 'react';
import classes from './Container1.module.css';
import CenterBlock from '../../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../../Standart/WidthBlock/WidthBlock';

function Container1({ currentRegion }) {
  return (
    <>
      <CenterBlock>
        <WidthBlock>
          <div className={classes.container}>
            <div className={classes.containerLeft}>
              <img src={currentRegion.img[0]} />
              <span>{currentRegion.title}</span>
              <span>{currentRegion.description}</span>
            </div>
            <div className={classes.containerRight}>
              <div className={classes.containerRightEl}>
                <
              </div>
            </div>
          </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default Container1;
