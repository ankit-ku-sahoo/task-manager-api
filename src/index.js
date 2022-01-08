const express = require('express')
require('./db/mongoose.js')

const User = require('./models/user')
const Task = require('./models/task')
const userRouter = require('../routes/user')
const taskRouter = require('../routes/task')

const app = express()

const port = process.env.PORT

// app.use((req,res,next) => {
//     res.status(503).send('We are currently under maintainence. We\'ll get back to you soon')
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)



app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const myFunction = async () => {
    // const password = 'Red12345!'
    // const hashedPass = await bcrypt.hash(password,8)

    // console.log(password, hashedPass)

    // const isMatch = await bcrypt.compare('Red12345!', hashedPass)
    // console.log(isMatch)

    // const token = jwt.sign({ _id: 'abc123' }, 'hello!ThisisAnkit', { expiresIn: '5 days'})
    // console.log(token)
    // const data = jwt.verify(token, 'hello!ThisisAnkit')
    // console.log(data)
}



// myFunction()

// const Task = require('./models/task')

// const main = async () => {

//     // This was an example to find owner of a particular task
//     const task = await Task.findById('61d456187930ac2478ccc7a4')
//     await task.populate('owner').execPopulate()  // This finds the user associated with this task in given (as ref) database
//     console.log(task.owner)

//     // This was an example to find tasks of a particular particular user
//     const user = await User.findById('61d455243aba6d2af80c9491')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }

// main()




const multer = require('multer')

const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req,file,cb) {
        if(!file.originalname.match(/\.(doc|docx)$/)) {
            return cb(new Error('Please upload a Word document'))
        }
        cb(undefined, true)
    }
})

app.post('/upload', upload.single('upload'), (req,res) => {
    res.send()
})