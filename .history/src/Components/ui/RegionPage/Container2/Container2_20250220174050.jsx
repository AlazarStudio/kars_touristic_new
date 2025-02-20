import React, { useEffect, useRef, useState } from 'react';
import classes from './Container2.module.css';
import CenterBlock from '../../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../../Standart/WidthBlock/WidthBlock';

function Container2({ currentRegion }) {
  const [selected, setSelected] = useState(() => {
    const saved = localStorage.getItem('selectedContainer');
    return saved !== null ? Number(saved) : null;
  });

  useEffect(() => {
    if (selected !== null) {
      localStorage.setItem('selectedContainer', selected);
    }
  }, [selected]);
  return (
    <>
      <CenterBlock>
        <WidthBlock>
asdsadfgjdglkdk
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default Container2;
