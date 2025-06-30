import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Navbar.css"
import { useAuth } from '../store/Auth'

function Navbar() {
    const {LoggedIn} = useAuth()

  return (
    <>
    <header>
        <div className="container">
            <div className="logo-brand">
                <a href="/">Logo</a>
            </div>
            <nav>
                <ul>
                    <li><NavLink to="/"> Home </NavLink></li>
                    <li><NavLink to="/about"> About </NavLink></li>
                    <li><NavLink to="/service"> Services </NavLink></li>
                    <li><NavLink to="/contact"> Contact </NavLink></li>
                    {LoggedIn ? 
                    <li><NavLink to="/logout"> Logout </NavLink></li> :
                    <>
                    <li><NavLink to="/login"> Login </NavLink></li>
                    <li><NavLink to="/registration"> Register </NavLink></li>
                    </>
                     }
                </ul>
            </nav>
        </div>
    </header>
    </>
  )
}

export default Navbar