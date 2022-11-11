import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userContext } from '../Hooks/Register'

const Login = () => {

  // user context is ctored here
  const {userInfo, error, loginUser} = useContext(userContext)

  const [ user, setUser] = useState({
    username:"",
    password:""
  })

  // to navigate to home page
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

   function handleSubmit(e){
    e.preventDefault()

     loginUser(user)
    !userInfo && navigate('/home')
  }

  return (
    <form className='login' onSubmit={handleSubmit}>
       <h3>Login your account</h3>
      <label htmlFor="username">Username</label>
      <input type="text" name="username" id="username" value={user.username} onChange={handleChange} />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password" value={user.password} onChange={handleChange} />
      <button type="submit">Log In</button>
      <p>You don't have an account, <a href="/register">Register</a></p>
      {error && <p className="err">{error}</p>}
    </form>
  )
}

export default Login
