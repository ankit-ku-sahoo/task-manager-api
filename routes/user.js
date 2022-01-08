const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const User = require('../src/models/user')
const { sendWelcomeEmail, goodByeEmail } = require('../src/emails/account')
const router = new express.Router()
const auth = require('../src/middleware/auth')


router.post('/users', async (req,res) => {
    const user = new User(req.body)

    try {
        const token = await user.generateAuthToken()
        user.tokens.concat(token)
        sendWelcomeEmail(user.email, user.name)
        await user.save()
        res.status(201).send({user,token})
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req,res) => {
    try {
        // console.log(req.body)
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.send({user,token})  // This stringify s the data... So, we can use toJSON function (which is inherently called when data is stringify ed)
    } catch (e) {
        // console.log(e)
        res.status(400).send(e)
    }
    

})

router.post('/users/logout', auth, async (req,res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {

            return token.token !== req.token
        })

        await req.user.save()

        res.send('Logged out successfully')
    } catch (e) {
        res.status(501).send()
    }
})

router.post('/users/logoutAll', auth, async (req,res) => {
    try {
        const user = req.user
        user.tokens = []
        await user.save()
        res.send('Logged out of all sessions')
    } catch (e) {
        res.status(501).send()
    }
})

router.get('/users/me', auth, async (req,res) => {

    try {
        // const users = await User.find({})
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})
// removed portion:
// router.get('/users/:id',async (req,res) => {
//     const _id = req.params.id
//     try {
//         const user = await User.findById(_id)
//         if(!user) {
//             return res.status(404).send()
//         }
//         res.send(user)
//     } catch (e) {
//         res.status(404).send(e)
//     }
// })

router.patch('/users/me', auth, async (req,res) => {
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const updates = Object.keys(req.body)

    var isValidOperation = 1
    updates.forEach((update) => {
        isValidOperation = isValidOperation && allowedUpdates.includes(update)
    })
    if(!isValidOperation) {
        return res.status(400).send('Error: Invalid Updates')
    }
    try {
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        // const user = await User.findById(req.params.id)
        updates.forEach((update) => req.user[update] = req.body[update] )
        await req.user.save()
        if(!req.user) {
            res.status(404).send()
        }
        res.send(req.user)
    } catch (e) {
        res.send(e)
    }
})

router.delete('/users/me', auth, async (req,res) => {
    try {
        // const user = await User.findByIdAndDelete(req.params.id)
        // if(!user) {
        //     res.status(404).send('No user to delete')
        // }
        goodByeEmail(req.user.email,req.user.name)
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(404).send(e)
    }
})

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req,file,cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image of the jpg, jpeg or png format'))
        }

        cb(undefined, true)
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req,res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.user.avatar = buffer
    // req.user.avatar = req.file.buffer
    await req.user.save()
    res.send()
}, (error, req,res,next) => {
    res.status(400).send({error: error.message})
})

router.delete('/users/me/avatar', auth, async (req,res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

router.get('/users/:id/avatar', async (req,res) => {
    try {
        const user = await User.findById(req.params.id)

        if(!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    }
    catch (e) {
        res.status(404).send()
    }
})

module.exports = router