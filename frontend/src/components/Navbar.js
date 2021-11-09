import React from 'react'
import logo from "../images/logo.png";

const Navbar = () => {
    return (
        <nav className='nav'>
            <div className="nav-center">
                <div className="nav-header">
                    <img src={logo} className="nav-logo" alt="logo" />
                </div>
            </div>
        </nav>
    )
}

export default Navbar
