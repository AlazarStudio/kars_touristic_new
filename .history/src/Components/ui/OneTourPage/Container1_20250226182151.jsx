import React, { useRef } from 'react';
import classes from './Container1.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';

function Container1({ tour }) {
  return (
    <>
      <CenterBlock>
        <WidthBlock>
          <div className={classes.container1}>
            
          </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default Container1;
