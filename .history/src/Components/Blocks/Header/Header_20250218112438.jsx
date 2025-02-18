import React from "react";
import classes from './Header.module.css';
import CenterBlock from "../../Standart/CenterBlock/CenterBlock";

function Header({ children, ...props }) {
    return ( 
        <>
           <CenterBlock></CenterBlock>
        </>
     );
}

export default Header;