import React from "react";
import classes from './Header.module.css';
import CenterBlock from "../../Standart/CenterBlock/CenterBlock";
import WidthBlock from "../../Standart/WidthBlock/WidthBlock";

function Header({ children, ...props }) {
    return ( 
        <>
           <CenterBlock><WidthBlock>12312</WidthBlock></CenterBlock>
        </>
     );
}

export default Header;