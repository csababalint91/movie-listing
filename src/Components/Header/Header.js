import React from 'react';
import './Header.css'
import Logo from './logo.png';


function Header() {
    return(
        <div className="header">
            <img className="logo" src={Logo} alt="Logo"></img>
            <h1>New Movies in Theaters Now</h1>
        </div>
    )
}


export default Header;