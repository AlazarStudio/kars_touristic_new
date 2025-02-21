import React from 'react';
import classes from './Container2.module.css';
import CenterBlock from '../../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../../Standart/WidthBlock/WidthBlock';

function Container2({
  currentRegion,
  selected,
  options,
  multiDayTours,
  onerDayTours,
  hotels,
  places,
  events,
}) {
  return (
    <CenterBlock>
      <WidthBlock>
        <div className={classes.container}>
          <div className={classes.containerTitle}>
            {selected !== null && <span>{options[selected].}</span>}
          </div>
        </div>
      </WidthBlock>
    </CenterBlock>
  );
}

export default Container2;
