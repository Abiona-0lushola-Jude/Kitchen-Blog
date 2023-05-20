import React, {useContext} from 'react'
import Topnav from './Topnav'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import { blogContext } from '../Hooks/BlogContext';
import { userContext } from '../Hooks/UserContext';
import { useNavigate } from 'react-router-dom';
import { getDownloadURL, list, listAll, ref, uploadBytes } from 'firebase/storage';
import { Storage } from '../Firebase/Storage';
import axios from 'axios';

export default function Write() {

  const navigate = useNavigate()
 const {userInfo} = useContext(userContext)
 const {setBlog} = useContext(blogContext)

  console.log(userInfo)

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
  const [imageUrl, setImageUrl] = useState([])



  const imagePath = ref(Storage, 'images/')

  const handleGetUrl = async () =>{
      const IamgeRef = ref(Storage, `images/${file.name+post?.title}`)
      await uploadBytes(IamgeRef, file)
      const toGetImage =  await list(imagePath)
      await toGetImage.items.forEach(async (item)=>{
      const urlSet = await getDownloadURL(item)
      await setImageUrl(urlSet)
    })
  }

 

  async function handleSubmit(e){

    e.preventDefault()

    if(!userInfo){
      return navigate('/login')
    }

    await handleGetUrl()
    
    

    const  insertedPost = {
      title: post.title,
      desc: desc,
      file: await imageUrl,
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

    await !file && navigate('/allBlog')


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
          <input type="file" name="file" id="file" className='file'  onChange={(e)=> setFile(e.target.files[0])}
          />
          <button className='btn' onClick={handleSubmit}>Post</button>
        </form>
        </div>
    </div>
  )
}
