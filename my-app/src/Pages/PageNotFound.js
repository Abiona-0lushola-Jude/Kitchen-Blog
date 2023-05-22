import React, { useEffect } from 'react'
import Topnav from './Topnav'
import Footer from './Footer'
import { useNavigate } from 'react-router'

function PageNotFound() {

    const naviagte = useNavigate()
    useEffect(()=>{
        setTimeout(() => {
            // return naviagte('/home')
        }, 6000);
    }, [])

  return (
    <div className='App container'>
        <Topnav />
        <div className='noPage'>
            <h1>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste nemo nostrum adipisci culpa inventore lorem egerfe ferivneirnfe reirnfgoernfe rvioerngjer ger iorfnieornerfe eriogneirngeirng reignjeirjgeirjge ngeingei0rgjerg eriger gejrg ei0rgejr gioerng0 officiis praesentium laboriosam odio, ipsam perspiciatis temporibus recusandae, beatae sapiente mollitia dolorem similique perferendis magnam accusantium quisquam quo expedita, aut suscipit veritatis molestias.</h1>

        </div>
        <Footer />
    </div>
  )
}

export default PageNotFound
