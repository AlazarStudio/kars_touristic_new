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
                    <div className={classes.container1}>
                        <img src="/images/logo.png"
                    </div>
                    <div className={classes.container2}></div>
                    <div className={classes.container3}></div>
                    <div className={classes.container4}></div>
                    </div>
                </WidthBlock>
            </CenterBlock>
          </div>
        </>
     );
}

export default Footer;