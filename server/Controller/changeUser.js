const DB = require('../Database/Database')
const bcrypt = require('bcrypt')

module.exports = {
    changeDetails: async (req, res) =>{

        const userId = req.params.id
        const newUsername = req.body.newUsername
        const location = req.body.location
        const website = req.body.website

        const firstQuery = "SELECT * FROM kitchenblog.users  WHERE `users_id` = ? "

        const value = [
            userId
        ]

        await DB.query(firstQuery, [value, userId], async(err, data)=>{
            if(err) return res.json({message: err.message})


            if(data.length <= 0){
              return  res.status(400).json({message: "Username doesn't exist yet"})
            }

            const secondQuery = "UPDATE kitchenblog.users SET  `username`= ?, `location`=? , `website`=?  where users_id= "+userId 

            const values =[
                newUsername,
                location,
                website
            ]

            DB.query(secondQuery, [...values], (err, data)=>{
                
                if(err) return res.json({message: err.message})

                res.json(data)

                // const thirdQuery = "UPDATE kitchenblog.blog SET  `username`= ?  where user_id= "+userId 

                // const valueThird =[
                //     newUsername
                // ]
                // DB.query(thirdQuery, [valueThird], (err, data)=>{
                //     if(err) return res.json({message: err.message})
    
                //     res.json(data)
                // })
            })

        })
        

    },

    changePassword: async (req, res)=>{

        const userId = req.params.id
        const oldPassword = req.body.oldPassword
        const newPassword = req.body.newPassword
        const confirmPassword = req.body.confirmPassword


        if(newPassword !== confirmPassword){
            return res.json({message: "New password didn't match"})
        }

        const firstQuery = "SELECT * FROM  kitchenblog.users WHERE  `users_id`= ?"


        await  DB.query(firstQuery, [userId], async (err, data)=>{

            try {

                 if(data.length === 0){
                   return res.json({message: "username not registered!"})
                }

                // compare passwords
                const realPassword = await bcrypt.compare(oldPassword, data[0].password)
                
                console.log(realPassword)
    
                if(!realPassword){
                   return res.json({message: "Incorrect Password!"})
                }


                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(newPassword, salt)


                const q = "UPDATE kitchenblog.users SET `password`= ? where users_id= "+data[0].users_id 

                DB.query(q, [hashedPassword], (err, data)=> {
                    if (err) return res.json({message: err.message})

                    res.json({message: "Password has been changed!"})
                })
                
            } catch (err) {
                console.log({message: err.message})
            }
           
        })
        
        
                
    }
}