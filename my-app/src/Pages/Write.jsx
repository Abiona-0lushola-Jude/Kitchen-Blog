import React from 'react'
import Topnav from './Topnav'

export default function Write() {
  return (
    <div className='container'>
      <Topnav />
      <div className="postForm">
       <form >
        <label htmlFor="title">Title: </label>
        <input type="text" name="" id="" />
        <label htmlFor="desc">Description: </label>
        <textarea name="desc" id="desc"></textarea>
        <label htmlFor="keyword">Enter keywords</label>
        <input type="text" name="keyword" id="keyword" />
        <label htmlFor="file">Upload image</label>
        <input type="file" name="file" id="file" />
        <button>Post</button>
       </form>
      </div>
    </div>
  )
}
