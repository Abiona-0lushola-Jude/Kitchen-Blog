import React, {useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { userContext } from '../Hooks/UserContext'

const Register = () => {

    const {registerUser, error, errMessage} = useContext(userContext)

  const [ user, setUser] = useState({
    username:"",
    email:"",
    password:""
  })


  const navigate = useNavigate()


  function handleChange(e){
    const {name, value} = e.target

    setUser(prev=>{
      return{
        ...prev,
        [name] : value
      }
    })
  }

  async function handleSubmit(e){
    e.preventDefault()
    try {
      const res = await registerUser(user)
    } catch (err) {
      console.log(err)
    }

    error === false && navigate('/login')
  }


  return (
    <form className='login' onSubmit={handleSubmit}>
       <h3>Register your account</h3>
      <label htmlFor="username">Username</label>
      <input type="text" name="username" id="username" value={user.username}  onChange={handleChange}/>
      <label htmlFor="email">Email</label>
      <input type="email" name="email" id="email"  value={user.email}  onChange={handleChange}/>
      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password"  value={user.password}  onChange={handleChange}/>
      <button type="submit">Register</button>
      <p>You already have an account, <a href="/login">Login</a> </p>
      {error && <p className="err">{errMessage}</p>}
    </form>
  )
}

export default Register
