import React from 'react';
import classes from './RegionPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import { regions } from '../../../../bd';

function RegionPage({ children, ...props }) {
  return (
    <>
      <div className={classes.back}>
        {regions.m}
        <CenterBlock>
          <WidthBlock>

          </WidthBlock>
        </CenterBlock>
      </div>
    </>
  );
}

export default RegionPage;
