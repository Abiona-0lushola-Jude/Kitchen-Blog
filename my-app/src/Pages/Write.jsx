import React from 'react'
import Topnav from './Topnav'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
// import { useContext } from 'react';
// import { blogContext } from '../Hooks/BlogContext';
// import { userContext } from '../Hooks/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// var FormData = require('form-data')

export default function Write() {

 
  const day = new Date()
  const moment = day.getDate()
  const month = day.getMonth()
  const year = day.getFullYear()

  const newdate = [moment,month,year]

  // const confirmDate = newdate.join('/')
  // console.log(moment,month,year)

  // const {handleSend} =useContext(blogContext)
  // const {userInfo} = useContext(userContext)

  const navigate  = useNavigate()

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

  const [file, setFile] = useState(null);

  const handleFileChange =async  (event) => {
    await setFile(event.target.files[0]);
  };


  async function handleSubmit(e){
    e.preventDefault()

    //   if(userInfo=== null){
    //     return navigate('/register')
    //   }

    // const allPost = {
    //   ...post,
    //   userId:userInfo[2],
    //   date:confirmDate,
    //   desc
    // }

    // console.log(allPost)
    const formData = new FormData();
    formData.append('image', file);
    const response = await axios.post('/upload', formData);
    
    console.log(response.data.imageUrl)
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
          
          <label htmlFor="file" className='filename'>Upload image</label>
          <input type="file" name="file" id="file" className='file' value={file}  onChange={(e)=> handleFileChange(e)}
          />
          <button className='btn' onClick={handleSubmit}>Post</button>
        </form>
        </div>
    </div>
  )
}
