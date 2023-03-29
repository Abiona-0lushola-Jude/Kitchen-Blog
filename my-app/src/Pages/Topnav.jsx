import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import pic from '../Style/image-jeanette.jpg'
import { userContext } from '../Hooks/UserContext'
import {RxHamburgerMenu} from 'react-icons/rx'
import { searchContext } from '../Hooks/Search'
import { useState } from 'react'


function Topnav() {

    const {userInfo,temporalLogout, getUser} = useContext(userContext) 
    const navigate = useNavigate()
    const {search, setSearch} = useContext(searchContext)
    const [open, setOpen] = useState(false)


    function HandleProfile(){
        getUser(userInfo[2])
        // console.log(userInfo)
        navigate('/user/profile/'+userInfo[0])

    }

    const handleSearch = () =>{
        navigate('/search')
    }

    function handleToggle(){
        setOpen(prev => !prev)
        // console.log(open)
    }


  return (
    <div className='head-container'>
        <div className="logo">
            <h1><a href="/home">KITCHEN BLOG</a></h1>
        </div>

            <div className="menu" onClick={handleToggle}>
                <RxHamburgerMenu className='meunBurger' fontSize={"1.5rem"}/>
            </div>

        <div className={`navShow ${open && "open"}`}>
            
            <div className="nav">
                <NavLink to='/allBlog/more'>All Blogs</NavLink>
                <NavLink to='/write'>Write</NavLink>
                <NavLink to='/search'>Search</NavLink>
            </div>
            <div className="search">
                <input type="search" name="search" id="search" value={search} onClick={handleSearch} onChange={(e)=> setSearch(e.target.value)} placeholder="Search using the title keyword"/>
            </div>
            <div className="user-info">

                {userInfo ? 
                <>
                    <div className="user-img" onClick={HandleProfile}>
                        <img src={pic} alt="" />
                    </div>
                    <p className="user-name">{userInfo[0]}</p>
                    <button className="logout" onClick={temporalLogout}>Logout</button>
                </>
                :
                <>
                    <button className='log'><a href="/login" onClick={temporalLogout}>Login</a></button>
                    <button className="reg"><a href="/register">Register</a></button>
                </>
                }
            </div>
        </div>
        
    </div>
  )
}

export default Topnav
