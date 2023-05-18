import axios from "axios"
import { createContext, useEffect, useState } from "react"
import Cookies from 'js-cookie'
import { useNavigate } from "react-router"

export const userContext = createContext()

export default function UserProvider({children}){

const navigate = useNavigate('/')
const [userInfo, setUsers ] = useState(null)
const [error, setError] = useState(false)
const [errMessage, setErrMessage] = useState('')
const [user, setUser] = useState()
const [blogUser, setBlogUser] = useState()


    const registerUser = async (details)=> {
      try {
        const res =  await axios.post('/api/register', details)
          setUsers(res.data.username)
          setError(false)
          setErrMessage('')
          navigate('/login')
      } catch (err) {
        setUsers(null)
          setError(true)
          setErrMessage(err.response.data.message) 
      }

      
    }

  
    async function loginUser(details){
          try {
          const res = await axios.post('/api/login', details)
          await setUsers([res.data[0].username, res.data[0].email, res.data[0].users_id])  
          await setError(false)
          await setErrMessage('')
          await navigate('/home')
        } catch (err) {
          await setUsers(null)
          await setError(true)
          setErrMessage(err.response.data.message) 
        }
    }


    useEffect(()=>{
      const checkUser = async ()=>{
        const {data} = await axios.get('/api/profile')
        if(!userInfo){
          setUsers([data[0]?.username, data[0]?.email, data[0]?.users_id])
        }
        
      }

      checkUser()
    }, [])
    
    


    const temporalLogout = async () =>{
       await setUsers(null)
       Cookies.remove('tokenId')
      
    }

    async function getUser(id){
      const res = await axios.get(`/api/getUser/${id}`)
      await setUser(res.data.user)
      await setBlogUser(res.data.data)
    }

  return(
  <userContext.Provider value={{userInfo, error,setBlogUser,  setErrMessage, setError,  registerUser, loginUser, temporalLogout, errMessage, user, getUser, blogUser}}> 
    {children}
  </userContext.Provider>
  )
}
