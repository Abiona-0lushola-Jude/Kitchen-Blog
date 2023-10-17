import React, { useEffect, useState } from 'react'
import Topnav from './Topnav'
import menu from '../Style/menu-5 1.jpg'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { blogContext } from '../Hooks/BlogContext'
import { userContext } from '../Hooks/UserContext'
import {BsTwitter, BsGlobe} from 'react-icons/bs'
import {GrLinkedinOption} from 'react-icons/gr'
import {FaFacebookF} from 'react-icons/fa'

import blogImg from "../uploads/1697513593625127.0.0.1_5500_index.html (3).png"


export default function OneFullBlog() {

    const navigate = useNavigate()
    const {blog} = useContext(blogContext)
    const {getUser}  = useContext(userContext)
    const [newPost, setNewPost] = useState(null)
    const location = window.location.href
    const words = location.split('/')

    const blogId = words[words.length -1]
    
    useEffect(()=>{
        blog.map((el)=> {
                if(el.blog_id === Number(blogId)){
                    setNewPost(el)
                }
        })
    }, [])
    

    
    function handleClick(user){

        getUser(user)
        navigate('/user/profile/'+newPost.username)
    }

    function getText(html){
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
    }

    console.log(`../uploads/${newPost?.file}`)
   
  return (
    <div className='container'>
        <div className="head">
            <Topnav />
        </div>
        {!newPost ? "Loading...." : <div className="fullPost">
            <div className="postImg">
                <div className="dataImg">
                    {/* <img src={encodeURI(`../uploads/${newPost?.file}`)} alt="main" title={newPost?.file} /> */}
                    {/* <img src={blogImg} alt="main" title="new image" /> */}
                    
                </div>
                <div className="userInfo">
                    <div className="postUserImg" onClick={()=> handleClick(newPost.user_id)}>
                    <h1>{newPost.username.split('')[0].toUpperCase()}</h1>
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
        </div>}
    </div>
  )
}
