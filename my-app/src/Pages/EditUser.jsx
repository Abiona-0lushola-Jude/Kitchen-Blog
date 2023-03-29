import React, { useContext, useState } from 'react'
import { changeUser } from '../Hooks/ChangeUser'

export default function EditUser({prop, user, close}) {
   
  const {updateUser} = useContext(changeUser)

  const [userChange, setUserChange] = useState({
    newUsername:user.username,
    location:user.location,
    website:user.website,
    img:""
  })

  function handleChange(e){
    const {name, value} = e.target

    setUserChange(prev=>{
      return{
        ...prev,
        [name]: value
      }
    })

  }


    function handleSubmit(id){
      const newUser ={
        ...userChange
      }
      updateUser(newUser, id)
      close()
    }

  return (
    <div className='userForm'>
      <form className="user">
        <input type="file" name="img" id="img"  />

        <label htmlFor="username">Username:</label>
        <input type="text" 
        name="newUsername" 
        id="newUsername" 
        value={userChange.newUsername}
        onChange={handleChange}
        />

        <label htmlFor="location">Location: </label>
        <input type="text" 
        name="location" 
        id="location" 
        value={userChange.location}
        onChange={handleChange}
        />
        
        <label htmlFor="website">Website: </label>
        <input type="text" 
        name="website" 
        id="website" 
        value={userChange.website}
        onChange={handleChange}
        />
      </form>
      <div className="Btn">
        <button className="changePassword" onClick={prop}>Change Password</button>
        <button className="save" onClick={()=> handleSubmit(user.users_id)}>Save</button>
      </div>
    </div>
  )
}
