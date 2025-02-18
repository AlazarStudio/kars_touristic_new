import React from 'react';
import classes from './Header.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';
import { Link } from 'react-router';

function Header({ children, ...props }) {
  return (
    <>
      <CenterBlock>
        <WidthBlock>
            <div className={classes.container}>
                <div className={classes.containerLeft}>
                    <img src='/images/logo.png'/>
                </div>
                <div className={classes.containerCenter}>
                    <Link to='/'></Link>
                    <Link to='/'></Link>
                    <Link to='/'></Link>
                    <Link to='/'></Link>
                    <Link to='/'></Link>
                </div>
                <div className={classes.containerRight}>
                  
                </div>
            </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}

export default Header;
