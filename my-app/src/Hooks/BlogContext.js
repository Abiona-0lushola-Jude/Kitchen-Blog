import axios from "axios"
import { createContext, useEffect, useState } from "react"


export const blogContext = createContext()



export default function BlogContext({children}) {
    const [error, setError] = useState(false)
    const [blog, setBlog] = useState([])
    const [info, setInfo] = useState(null)


    useEffect(()=>{
        getAllBlog()
    }, [])

    async function getAllBlog(){
        const getAll = await axios.get('/api/getAll')
        setBlog(getAll.data)
    }


    async function handleSend(blog){
      const sendBlog = await axios.post('/api/postBlog', blog)
      setInfo(sendBlog.message)
    }

  return (
    <blogContext.Provider value={{error, blog, handleSend}}>
        {children}
    </blogContext.Provider>
  )
}
