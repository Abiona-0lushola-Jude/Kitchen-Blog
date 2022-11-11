const express = require('express')
const router = express.Router()
const database = require('../Database/Database')

router.get('/api', (req, res)=>{
    const q = "SELECT * FROM developer.personel"

    database.query(q, (err, data)=>{
        if(err){
            console.log({message: err.message})
        }

        res.status(200).json(data)
    })
})





module.exports = router