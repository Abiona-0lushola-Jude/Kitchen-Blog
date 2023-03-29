import axios from "axios"
import { createContext, useState } from "react"


export const changeUser = createContext()


export default function ChangeUser({children}) {


    async function updateUser(data, id){
      const res = await axios.post('/change/changeUser/'+id, data)
      console.log(res)
      // console.log(data,id)
    }

      function handleSubmit(value){
        
      }


      const [errMessage, setErrMessage] = useState(null)

      const [changePassword, setChangePassword] = useState({
        oldPassword:"",
        newPassword:"",
        confirmPassword:""

      })

      function handleChangePassword(e){
        const {name, value} = e.target

        setChangePassword(prev=>{
          return{
            ...prev,
            [name]:value
          }
        })
      }

      async function handleSubmitPassword(value, id){

        const res = await axios.post('/change/changePassword/'+id, value)
        await setErrMessage(res.data.message)
        console.log(res.data.message)
      }




  return (
    <changeUser.Provider value={{updateUser, handleSubmit, changePassword, handleChangePassword, handleSubmitPassword, errMessage}}>
        {children}
    </changeUser.Provider>
  )
}
