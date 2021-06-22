import React from 'react';
import logo from '../images/logo.png';
import {Link} from 'react-router-dom';
import "./Navigation.css";

const Navigation = (props) => {
    return (
        <nav className = "nav">
            <div className="logo-image">
                <img className="logo" src={logo} alt="logo"/>
            </div>
            <div className="nav-bar">
                <ul className="nav-links">
                    <Link to="/" className="nav-ind">
                        <li>Home</li>
                    </Link>
                    
                    <Link to="/dashboard" className="nav-ind">
                        <li>Your Docs</li>
                    </Link>  

                    <Link to="/about" className="nav-ind"> 
                        <li>About</li>
                    </Link> 
                </ul>
            </div>
        </nav>
    );
}

export default Navigation;