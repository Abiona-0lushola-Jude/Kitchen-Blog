import React from 'react'
import { useContext } from 'react'
import { blogContext } from '../Hooks/BlogContext'
import Data from './Data'

export default function Body() {

  const {blog, error} = useContext(blogContext)

  // console.log(blog)
  return (
    <div className='body'>
      {blog.slice(1,5).map((el,i)=>{
        return(
            <Data key={i} data={el} />
        )
      })}
    </div>
  )
}
