const usersRouter = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {
        title: 1,
        url: 1,
        likes: 1,
        id: 1
    })
    response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
    const { username, name, password } = request.body

    console.log('password: ', password.length)
    console.log('username: ', username.length)

    if (username.length < 3 || password.length < 3){
            return response.status(401).json({
                error: 'username and password must be at least 3 characters long'
            })
        }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })

    try{
        const savedUser = await user.save()
        response.status(201).json(savedUser)
    }catch(error){
        next(error)
    }
})

module.exports = usersRouter