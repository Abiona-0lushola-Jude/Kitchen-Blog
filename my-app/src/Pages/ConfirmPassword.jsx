import React from 'react'
import { useContext } from 'react'
import { changeUser } from '../Hooks/ChangeUser'

export default function ConfirmPassword({prop, user}) {

  const {changePassword, handleChangePassword, handleSubmitPassword, errMessage} = useContext(changeUser)

  const changeOldPassword = (changePassword, id) =>{
    
    handleSubmitPassword(changePassword,id)

  }

  return (
    <div className="password">
        <form>
        <label htmlFor="oldPassword">Old Password: </label>
        <input type="password" 
        name="oldPassword" 
        id="oldPassword" 
        value={changePassword.oldPassword}
        onChange={handleChangePassword}
        />

        <label htmlFor="newPassword">New Pasword: </label>
        <input type="password" 
        name="newPassword" 
        id="newPassword" 
        value={changePassword.newPassword}
        onChange={handleChangePassword}
        />

        <label htmlFor="confirmPassword">Confirm new password: </label>
        <input type="password" 
        name="confirmPassword" 
        id="confirmPassword" 
        value={changePassword.confirmPassword}
        onChange={handleChangePassword}
        />
        </form>
        <div className="SubCan">
            <button className="submit" onClick={()=> changeOldPassword(changePassword, user)}>Submit</button>
            <button className="cancel" onClick={prop}>Cancel</button>
        </div>
        {errMessage ? <p className='error'>{errMessage}</p>: null}
    </div>
  )
}
