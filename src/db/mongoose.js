const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true
})

// const User = mongoose.model('User', {
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     email: {
//         type: String,
//         validate(value) {
//             if(!validator.isEmail(value)){
//                 throw new Error('Email invalid')
//             }
//         },
//         required: true
//     },
//     password: {
//         type: String,
//         minlength: 7,
//         validate(value) {
//             if(value.toLowerCase().includes('password')) {
//                 throw new Error('Invalid Password')
//             }
//         },
//         required: true,
//         trim: true,
//     },
//     age: {
//         type: Number
//     }
// })

// const user = new User({
//     name: '   Adam Healy   ',
//     password: '    abc    ',
//     email: 'iamadam@gmail.com',
// })

// user.save().then(()=> {
//     console.log(user)
// }).catch((e)=> {
//     console.log('Error!', e)
// })


// const Task = mongoose.model('Task', {
//     description: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     }
// })

// const task = new Task({
//     description: 'Have dinner'
// })


// task.save().then(()=>{
//     console.log(task)
// }).catch((e)=>{
//     console.log(e)
// })