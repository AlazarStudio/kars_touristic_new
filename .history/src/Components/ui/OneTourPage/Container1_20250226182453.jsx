import React, { useRef } from 'react';
import classes from './Container1.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';

function Container1({ tour }) {
  return (
    <>
      <CenterBlock>
        <WidthBlock>
          <div className={classes.container}>
<div className={classes.containerCheck}>
  <span>ЧЕК-ЛИСТ</span>
  <div className={classes.containerCheckEl}>
    {tour.checklists.map((el))}
  </div>
</div>
<div className={classes.containerDay}></div>
<div className={classes.containerSimilar}></div>
          </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default Container1;
