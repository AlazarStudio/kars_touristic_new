import React, { useEffect, useRef, useState } from 'react';
import classes from './OneTourPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import { Link, useNavigate } from 'react-router';
import Header1 from '../../ui/RegionPage/Header/Header1';

function OneTourPage({ children, ...props }) {
  return (
    <>
      <CenterBlock>
        <WidthBlock>
          <></>
          <div className={classes.container}>
          <Header1 />
          </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default OneTourPage;
