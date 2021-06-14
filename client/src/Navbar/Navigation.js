import React, { useState } from 'react';
import logo from '../images/logo.png';
import {Link} from 'react-router-dom';
import "./Navigation.css";

const Navigation = (props) => {
    return (
        <nav className = "nav">
            <div className="logo-image">
                <img clasName="logo" src={logo} alt="logo"/>
            </div>
            <div className="nav-bar">
                <ul className="nav-links">
                    <Link to="/home" className="nav-ind">
                        <li>Home</li>
                    </Link>
                    
                    <Link to="/about" className="nav-ind">
                        <li>About</li>
                    </Link>  

                    <Link to="/login" className="nav-ind"> 
                        <li>Login</li>
                    </Link>     
                </ul>
            </div>
        </nav>
    );
}

export default Navigation;