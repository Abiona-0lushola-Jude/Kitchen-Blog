const express = require('express')
const app = express()
const cors = require('cors')
const PORT  = process.env.PORT || 5000
const userRouter = require('./Routes/userRoute')

// middlewares
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended : false}))


// routes
// app.use('/', router)
app.use('/api', userRouter)

// app listening
app.listen(PORT, ()=> console.log(`SEVER IS RUNNING ON PORT ${PORT}`))