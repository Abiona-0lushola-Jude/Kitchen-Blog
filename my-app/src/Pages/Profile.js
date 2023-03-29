import React, { useContext, useState } from 'react'
import Topnav from './Topnav'
import pic from '../Style/image-jeanette.jpg'
import menu from '../Style/menu-5 1.jpg'
import { useNavigate } from 'react-router-dom'
import {FaEdit} from 'react-icons/fa'
import {RiDeleteBin2Fill} from 'react-icons/ri'
import EditUser from './EditUser'
import ConfirmPassword from './ConfirmPassword'
import { userContext } from '../Hooks/UserContext'
import axios from 'axios'

const Profile = () => {

    const {userInfo, user, blogUser, setBlogUser} = useContext(userContext)

    const navigate = useNavigate()

    function backGroundChnage(){
        
    }

    const [onEdit, setOnEdit] = useState(false)
    const [confirmPass, setConfirmPass] = useState(false)


    function handleOnEditUser(id){
        setOnEdit(prev=> !prev)
    }

    function handleOnConfirmPassword(){
        setOnEdit(false) 
        setConfirmPass(true)
    }

    function handleClosePassword(){
        setConfirmPass(false)
    }


    async function handleDelete(id){
        // console.log(`Deleted the blog at id ${id}`)
        // const res = await axios.delete(`http://localhost:5000/api/delete/${id}`)
        // blogUser.filter(el.blog_id === id setBlogUser())
    }


    const userId  = user ? user.users_id : null
    const userName = user ? user.username : null
    const eMail = user ? user.email : null
    const Location = user ? user.location : null
    const webSite = user ? user.website : null
    const username = userInfo ? userInfo[0] : null

    function getText(html){
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
    }

  return (
    <div className='container'>
        <Topnav />
        <div className="profile">
            <div className='profile-head'>
                <div className="head">
                    {username === userName && <h1>Welcome, {userName}</h1>}
                    <div className="img">
                        <img src={pic} alt="user" />
                    </div>
                </div>
                <div className="detail">
                    <p><b>Username</b>: {userName}</p>
                    <p><b>Email:</b>: {eMail}</p>
                    <p><b>Location</b>: {Location}</p>
                    <p><b>Website</b>: {webSite}</p>
                    <div className='userDisplay'>
                        <div className='backGround'>
                            <button onClick={backGroundChnage}>Change Background</button>
                        </div>
                        {username === userName && <button className='editUser' onClick={()=> handleOnEditUser(userId)}>Edit user</button>}
                    </div>
            </div>
            </div>
            <div className="userBlog">
                {blogUser ? blogUser.map((el, i)=>{
                    return(
                        <div key={i} className="contain">
                            <div className="userBlog-img">
                                <img src={menu} alt="" />
                            </div>
                            <div className="userBlog">
                                <h2>{el.title}</h2>
                                <p>{getText(el.desc)}</p>
                                <div className='UserBtn'>
                                    <p>{el.date}</p>
                                   {username === userName && <div className='Btn'>
                                        <button onClick={()=> handleDelete(el.blog_id)}><RiDeleteBin2Fill color='white'/> Delete</button>
                                        <button onClick={()=> navigate('/edit/'+el.blog_id)}><FaEdit color='white' />Edit</button>
                                    </div>}
                                </div>
                                
                            </div>
                            
                        </div>
                    )
                }) :<h1>Loading...</h1> }
            </div>
        </div>

        {onEdit && <EditUser  prop={handleOnConfirmPassword} user={user} close={()=> setOnEdit(false)}/>}
        {confirmPass && <ConfirmPassword  prop={handleClosePassword} user={user.users_id}/>}
    </div>
  )
}

export default Profile
