import React from "react";
import classes from './Footer.module.css';
import CenterBlock from "../../Standart/CenterBlock/CenterBlock";
import WidthBlock from "../../Standart/WidthBlock/WidthBlock";

function Footer({ children, ...props }) {
    return ( 
        <>
          <div className={classes.back}>
            <CenterBlock>
                <WidthBlock>
                    <div className={classes.container}>
                        <
                    </div>
                </WidthBlock>
            </CenterBlock>
          </div>
        </>
     );
}

export default Footer;