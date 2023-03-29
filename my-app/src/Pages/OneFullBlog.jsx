import React from 'react'
import Topnav from './Topnav'
import menu from '../Style/menu-5 1.jpg'
import pic from '../Style/image-jeanette.jpg'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { blogContext } from '../Hooks/BlogContext'
import { userContext } from '../Hooks/UserContext'
import {BsTwitter, BsGlobe} from 'react-icons/bs'
import {GrLinkedinOption} from 'react-icons/gr'
import {FaFacebookF} from 'react-icons/fa'


export default function OneFullBlog() {

    const navigate = useNavigate()
    const {blog} = useContext(blogContext)
    const {getUser}  = useContext(userContext)

    const location = window.location.href
    const words = location.split('')
    const blogId = words[words.length -1]
    var newPost 
    
    blog.map((el)=> {
        if(el.blog_id === Number(blogId)){
            newPost = el
        }
    })

    
    function handleClick(user){

        getUser(user)
        navigate('/user/profile/'+newPost.username)
    }

    function getText(html){
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
    }

  return (
    <div className='container'>
        <div className="head">
            <Topnav />
        </div>
        <div className="fullPost">
            <div className="postImg">
                <div className="dataImg">
                    <img src={menu} alt="" />
                </div>
                <div className="userInfo">
                    <div className="postUserImg" onClick={()=> handleClick(newPost.user_id)}>
                        <img src={pic} alt="user portait" />
                    </div>
                    <div className="postUserInfo">
                        <p>{newPost.username}</p>
                        <div className='social'>
                            <div><BsTwitter /></div> 
                            <div><FaFacebookF /></div>
                            <div><BsGlobe /></div>
                            <div><GrLinkedinOption /></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="content">
                <h1>{newPost.title}</h1>
                <p className="date">Date posted: {newPost.date}</p>
                <p className='desc'>{getText(newPost.desc)}</p>
                <div className="bottom">
                    <button onClick={()=> navigate(-1)}>Back</button>
                </div>
            </div>          
        </div>
    </div>
  )
}
