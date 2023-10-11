import React, {useContext} from 'react'
import Topnav from './Topnav'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import { blogContext } from '../Hooks/BlogContext';
import { userContext } from '../Hooks/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function Write() {

  const navigate = useNavigate()
 const {userInfo} = useContext(userContext)
 const {setBlog} = useContext(blogContext)

  // console.log(userInfo)

  const day = new Date()
  const moment = day.getDate()
  const month = day.getMonth()
  const year = day.getFullYear()

  const newdate = [moment,month,year]

  const confirmDate = newdate.join('/')
 

  const [ post, setPost] = useState({
    title:"",
    keyword:"",
  })

  const [desc, setDesc] = useState('')


  const handleChange = (e) =>{
    const {name, value} = e.target

    setPost(prev=>{
      return{
        ...prev,
        [name]:value
      }
    })
  }

  const [file, setFile] = useState([]);
  const [imageUrl, setImageUrl] = useState(null)


  const handleGetUrl = async () =>{
    const formData = await new FormData()
    await formData.append('image', file)
    const {data} = await axios.post('/upload', formData)
    await setImageUrl(data.imageUrl)
  }

 console.log(imageUrl)

  async function handleSubmit(e){
    
    e.preventDefault()
    await handleGetUrl()
    // if(!userInfo){
    //   return navigate('/login')
    // }
    

    const  insertedPost = {
      title: post.title,
      desc: desc,
      file: imageUrl,
      date: confirmDate,
      user_id: userInfo[2],
      username: userInfo[0]
    }



    const postedAll = await axios.post('/api/postBlog', insertedPost)
    await setBlog(prev=> {
      return[
        ...prev,
        insertedPost
      ]
    })

    setBlog((prev)=> [
      ...prev,
      insertedPost
    ])
    // await navigate('/allBlog/more')
  }
    





  return (
    <div className='container'>
      <Topnav />
  
        <div className="postForm">
        <form >
          <label htmlFor="title">Title: </label>
          <input type="text" name="title" id="title" className='title' value={post.title}  onChange={handleChange}
          />
          <label htmlFor="desc">Description: </label>
          <ReactQuill theme="snow"  name="desc" id="desc"  className='desc' value={desc} onChange={setDesc}
          />
          
          <label htmlFor="file" className='filename' style={{paddingBlock:"1rem", cursor:"pointer"}}>Upload image: 
          <span className="imglink">{file?.name}</span>
          </label>
          <input type="file" style={{display:'none'}} name="file" id="file" className='file'  onChange={(e)=> setFile(e.target.files[0])}
          />
          <button className='btn' onClick={handleSubmit} disabled={!userInfo}>Post</button>
        </form>
        </div>
    </div>
  )
}
