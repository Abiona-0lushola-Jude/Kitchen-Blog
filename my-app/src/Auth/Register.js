import React, {useContext, useState} from 'react'
import { userContext } from '../Hooks/Register'

const Register = () => {

  const {registerUser, error } = useContext(userContext)

  const [ user, setUser] = useState({
    username:"",
    email:"",
    password:""
  })




  function handleChange(e){
    const {name, value} = e.target

    setUser(prev=>{
      return{
        ...prev,
        [name] : value
      }
    })
  }

  function handleSubmit(e){
    e.preventDefault()

    registerUser(user)
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
      {error && <p className="err">{error}</p>}
    </form>
  )
}

export default Register
