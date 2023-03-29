const DB = require('../Database/Database')

module.exports = {
    getAllBlog: async (req, res)=>{

        const q = "SELECT * FROM kitchenblog.blog"

        DB.query(q, (err, data)=>{
            if (err) return res.json({message: err.message})


            res.json(data)

        })
    },

    getOneBlog: async (req, res)=> {

        const blogId = req.params.id
        const q = "SELECT * FROM kitchenblog.blog WHERE blog_id =? "

        await DB.query(q,[blogId], (err, data)=>{
            if (err) return res.json({message: err.message})


            res.json(data)

        })
    },

    postOneBlog: async (req, res) => {

        const userId = req.body.userId
        const title = req.body.title
        const desc = req.body.desc
        const date = req.body.date
        const file = req.body.file

        var username

        const firstQuery = "SELECT * FROM  kitchenblog.users WHERE  `users_id`= ? "

        await DB.query(firstQuery, [userId], async(err, data)=>{
            if(err) return res.json({message: err.message})


            if(data.length <= 0){
              return  res.status(400).json({message: "Username doesn't exist yet"})
            }

            username = data[0].username

            const q = "INSERT INTO kitchenblog.blog (`user_id`, `title`, `desc`, `date`, `file`, `username`) VALUES (?)"
            const values = [
                userId,
                title,
                desc,
                date,
                file,
                username
            ]

            await DB.query(q, [values], (err,data)=>{
                if (err) return res.json({message: err.message})


                res.json({message: "Blog has been created successfully!"})
            })

        })

    },

    updateBlog: async (req, res)=>{

        const blogId = req.body.blogId
        const title = req.body.title
        const desc = req.body.desc
        const date = req.body.date
        const file = req.body.file

        const firstQuery = "SELECT * FROM  kitchenblog.blog WHERE  `blog_id`= ? "

        await DB.query(firstQuery, [blogId], async(err, data)=>{
            if(err) return res.json({message: err.message})


            if(data.length <= 0){
              return  res.status(400).json({message: "Blog doesn't exist yet"})
            }


            const q = "UPDATE kitchenblog.blog  SET  `title`= ?, `desc`= ?, `date`= ?, `file`= ? WHERE blog_id = ?"
            const values = [
                title,
                desc,
                date,
                file
            ]

            await DB.query(q, [...values, blogId], (err,data)=>{
                if (err) return res.json({message: err.message})


                res.json({message: "Blog has been created successfully!"})
            })

        })
    },

    deleteBlog: async (req, res)=>{
        const blogId = req.params.id

        const q = "DELETE FROM kitchenblog.blog WHERE blog_id = ?"

        await DB.query(q, [blogId], (err, data)=>{
            if(err) return res.json({message: err.message})

            res.json({message: "Blog has been deleted successfully!"})
        })
    }
}