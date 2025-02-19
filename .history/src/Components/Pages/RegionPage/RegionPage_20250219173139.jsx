import React from 'react';
import classes from './RegionPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';

function RegionPage({ children, ...props }) {
  return <>
  <div className={classes.back}>
    <CenterBlock>
        <WidthBlock
    </CenterBlock>
  </div>
  </>;
}

export default RegionPage;
