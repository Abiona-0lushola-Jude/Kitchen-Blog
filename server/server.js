const express = require('express')
const app = express()
const cors = require('cors')
const PORT  = process.env.PORT || 5000
const userRouter = require('./Routes/userRoute')
const changeRouter = require('./Routes/ChangeRoute')
const blogRoute = require('./Routes/blogRoute')
const multer = require('multer')
const cookieParser = require('cookie-parser')
const path = require('path')


// middlewares
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(cookieParser())



  const storage = multer.diskStorage({
    destination:async (req, file, cb) => {
     await cb(null, '../my-app/src/uploads')
    },
    filename: async (req, file, cb)=> {
      await cb(null, Date.now()+file.originalname)
    }

  });


 const upload = multer({ storage });

 app.post('/upload', upload.single('image'), async(req, res) => {
    try {
      const imageUrl = await `${req.file.filename}`;
      await res.json({ imageUrl });
    } catch (err) {
      await res.json({message:err.message})
    }
   
});


// routes
// app.use('/', router)
app.use('/api', userRouter)
app.use('/change', changeRouter)
app.use('/api', blogRoute)


// app listening
app.listen(PORT, ()=> console.log(`SEVER IS RUNNING ON PORT ${PORT}`))