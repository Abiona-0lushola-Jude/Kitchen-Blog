import React, { useContext } from 'react'
import Topnav from './Topnav'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import rawdata from './rawdata'
import {blogContext} from '../Hooks/BlogContext';
import { useNavigate } from 'react-router-dom';


export default function Write() {

    const {blog} = useContext(blogContext)
    const navigate = useNavigate()
    const location = window.location.href
    const words = location.split('')
    const blogId = words[words.length -1]

    var newPost 
    
    blog.map((el)=> {
        if(el.blog_id === Number(blogId)){
            newPost=el
        }
    })

  const [ Editpost, EditsetPost] = useState({
    title:newPost &&  newPost.title,
    keyword: newPost && newPost.date,
    file:"",
  })


  console.log(newPost, blog)

  const [desc, setDesc] = useState(newPost && newPost.desc)


  const handleChange = (e) =>{
    const {name, value} = e.target

    EditsetPost(prev=>{
      return{
        ...prev,
        [name]:value
      }
    })
  }


  function handleSubmit(e){
    e.preventDefault()


    const allPost = {
      ...Editpost,
      desc
    }

    navigate(-1)
    
  }



  return (
    <div className='container'>
      <Topnav />
        <div className="postForm">
        <form >
          <label htmlFor="title">Title: </label>
          <input type="text" name="title" id="title" className='title' value={Editpost.title}  onChange={handleChange}
          />
         
          <label htmlFor="desc">Description: </label>
          <ReactQuill theme="snow"  name="desc" id="desc"  className='desc' value={desc} onChange={setDesc}
          />
          
          <label htmlFor="file" className='filename'>Upload image</label>
          <input type="file" name="file" id="file" className='file' value={Editpost.file}  onChange={handleChange}
          />
          <button className='btn' onClick={handleSubmit}>Save</button>
        </form>
        </div>
    </div>
  )
}
