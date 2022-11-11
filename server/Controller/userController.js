const DB = require('../Database/Database')
const bcrypt = require('bcrypt')

module.exports = {
    loginUser : async (req, res)=> {
        
        const username = req.body.username
        const password = req.body.password

        const firstQuery = "SELECT * FROM  kitchenblog.users WHERE  `username`= ? "


        await  DB.query(firstQuery, [username], async (err, data)=>{

            try {

                 if(data.length === 0){
                   return res.status(400).json({message: "user not registered!"})
                }

                
                // compare passwords
                const realPassword = await bcrypt.compare(password, data[0].password)

                if(!realPassword){
                    res.status(400).json({message: "Incorrect Password!"})
                }


                await res.json({
                    id:data[0].users_id,
                    username: username
                })
            } catch (err) {
                console.log({message: err.message})
            }
            // res.json(data)

            // console.log(username)
           
        })
    },

    regsiterUser: async (req, res)=> {

        const username = req.body.username
        const email = req.body.email
        const password = req.body.password

        const q = "SELECT * FROM kitchenblog.users WHERE username = ? OR email = ?"
        
        await DB.query(q, [username, email], async (err, data)=>{
            try {
                

                if(data.length > 0 && data[0].username === username){
                    return res.status(400).json({message: "username has been registered"})
                }

                if(data.length > 0 && data[0].email === email){
                    return res.status(400).json({message:"email address has been registered"})
                }

                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(password, salt)
                
                const secondQuery = "INSERT INTO kitchenblog.users (`username`, `email` , `password`)  VALUES (?) "
                const values = [
                    username,
                    email,
                    hashedPassword
                ]

                DB.query(secondQuery, [values], async (err, data)=>{
                    if(err) return res.json({message: err.message})


                    res.json(data)
                })

            } catch (err) {
                await res.json({message: err.message})
            }
            
            
        })
        
    },

    signout: async (req, res)=>{
        const username = req.body.username
        const user_id = req.params.id

        const q = "SELECT * FROM kitchenblog.users WHERE `users_id` = ?"

        await DB.query(q, [user_id],async (err, data)=>{
            if(err) return res.status(500).json({message: err.message})

            if(data.length === 0){
              return  res.status(400).json({message: "You are not registered, fam"})
            }

            const secondQuery = "DELETE FROM kitchenblog.users  WHERE `users_id` = ?"

            await DB.query(secondQuery, [user_id], (err, data)=> {
                if(err) return res.json({message : err.message})


                res.json({message: `user of id ${user_id} has been signout and totally removed from our databse`})
            })
        })

    }
}