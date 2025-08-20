const mongoose = require('mongoose')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const { api } = require('../utils/list_helper')

describe('creating a new user', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('psw', 10)
        const user = new User({
            username: "JuanEsc17",
            passwordHash
        })

        await user.save()
    })

    test('works at expected creating a fresh username', async () => {
        const userDB = await User.find({})
        const usersAtStart = await userDB.map(user => user.toJSON())

        const newUser = {
            username: "JuanEsc17",
            name: 'Juan',
            password: 'ju4n'
        }

        await api.
            post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const userDBAfter = await User.find({})
        const usersAtEnd = userDBAfter.map(user => user.toJSON())

        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(user => user.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username is already taken', async () => {
        const users = await User.find({})
        const usersAtStart = users.map(user => user.toJSON())

        const newUser = {
            username: 'JuanEsc17',
            name: 'Juan',
            password: 'abc'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')

        const usersAtEnd = users.map(user => user.toJSON())
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })  
})

afterAll(async () => {
    await mongoose.connection.close()
})