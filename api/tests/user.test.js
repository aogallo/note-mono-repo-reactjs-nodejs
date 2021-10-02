const User = require('../models/User')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const { server } = require('../index')
const { api } = require('./helpers')
const { response } = require('express')

describe('creating a new user', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('1111', 10)
    const user = new User({
      username: 'allanroot',
      passwordHash,
      name: 'Gallo'
    })

    await user.save()
  })

  test('works as expected creating a fresh username', async () => {
    const usersDB = await User.find({})
    const usersAtStart = usersDB.map((user) => user.toJSON())

    const newUser = {
      username: 'test1',
      name: 'tester 1',
      password: 'tw1tch'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersDBAfter = await User.find({})
    const usersAtEnd = usersDBAfter.map((user) => user.toJSON())

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((user) => user.username)

    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode adn message if username is already taken', async () => {
    const usersAtStart = await User.find({})

    const newUser = {
      username: 'allanroot',
      name: 'tester 1',
      password: 'tw1tch'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.errors.username.message).toContain(
      '`username` to be unique'
    )

    const usersAtEnd = await User.find({})

    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  afterAll(() => {
    mongoose.connection.close()
    server.close()
  })
})
