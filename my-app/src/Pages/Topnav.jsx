import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import pic from '../Style/image-jeanette.jpg'
import { userContext } from '../Hooks/Register'

function Topnav() {

    const {userInfo,temporalLogout} = useContext(userContext) 


  return (
    <div className='head-container'>
        <div className="logo">
            <h1><a href="/home">KITCHEN BLOG</a></h1>
        </div>
        <div className="nav">
            <NavLink to='/more'>All Blogs</NavLink>
            <NavLink to='/write'>Write</NavLink>
            <NavLink to='/search'>Search</NavLink>
        </div>
        <div className="search">
            <input type="text" name="search" id="search" />
        </div>
        <div className="user-info">

            {userInfo ? 
            <>
                <div className="user-img">
                    <img src={pic} alt="" />
                </div>
                <p className="user-name">Adetola</p>
                <button className="logout">Logout</button>
            </>
             :
             <>
                <button className='log'><a href="/login" onClick={temporalLogout}>Login</a></button>
                <button className="reg"><a href="/register">Register</a></button>
             </>
            }
        </div>
    </div>
  )
}

export default Topnav
