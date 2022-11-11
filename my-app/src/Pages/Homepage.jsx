import React from 'react'
import Body from './Body'
import Footer from './Footer'
import Topnav from './Topnav'


const Homepage = () => {


  return (
    <div className='container'>
        <div className="head">
            <Topnav />
        </div>
        <div className="body">
            <Body />
        </div>
        <div className="footer">
            <Footer />
        </div>
    </div>
  )
}

export default Homepage
