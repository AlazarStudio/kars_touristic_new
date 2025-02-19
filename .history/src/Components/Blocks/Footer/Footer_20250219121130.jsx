import React from "react";
import classes from './Footer.module.css';
import CenterBlock from "../../Standart/CenterBlock/CenterBlock";
import WidthBlock from "../../Standart/WidthBlock/WidthBlock";

function Footer({ children, ...props }) {
    return ( 
        <>
          <div className={classes.container}>
            <CenterBlock>
                <WidthBlock
            </CenterBlock>
          </div>
        </>
     );
}

export default Footer;