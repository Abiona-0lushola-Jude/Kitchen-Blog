const DB = require('../Database/Database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { json } = require('express')
const secret = "newjmsmds"

module.exports = {
    loginUser : async (req, res)=> {
        
        const username = req.body.username
        const password = req.body.password

        const firstQuery = "SELECT * FROM  kitchenblog.users WHERE  `email`= ?"


        await  DB.query(firstQuery, [username], async (err, data)=>{

            try {

                 if(data.length === 0){
                   return res.status(400).json({message: "Email not registered!"})
                }

                
                // compare passwords
                const realPassword = await bcrypt.compare(password, data[0].password)

                if(!realPassword){
                   return res.status(400).json({message: "Incorrect Password!"})
                }

                 await jwt.sign({user: username}, secret, {},async ( err, token)=>{
                    if(err) throw err

                   await res.cookie('tokenId', token,{ httpOnly: true}).json(data)
               })

                
            } catch (err) {
                console.log({message: err.message})
            }
           
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

    },

    getUser: async (req,res)=>{
        const userId =  req.params.id
        var user
    
        const q = "SELECT * FROM kitchenblog.users  WHERE `users_id` = ? "

        await DB.query(q, [userId],async (err,data)=>{
            if(err) return res,json({message: err.message})

            user = data[0]
            const secondQuery = "SELECT * FROM kitchenblog.blog WHERE `user_id` = ? "
            
            await DB.query(secondQuery,[userId], (err,data)=>{
                if(err) return res.json({message : err.message})


                res.json({data,user})
            })
        })
    },

    confirmUser: async(req,res)=>{
        const{tokenId} =  req.cookies

        if(tokenId){
            jwt.verify(tokenId, secret, {}, (err, data)=>{
                if(err) throw err
                const query = "SELECT * FROM kitchenblog.users  WHERE `email` = ? "
                DB.query(query, [data.user], async (err, data)=>{
                    if (err) return res,json({message: err.message})


                    res.json(data)
                })

            })
        }else{
            res.json(null)
        }
    }

}