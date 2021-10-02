const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/User')

const { SECRET } = process.env

loginRouter.post('/', async (request, response) => {
  try {
    const { body } = request
    const { username, password } = body

    const user = await User.findOne({ username })

    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
      response.status(401).json({
        error: 'invalid user or password'
      })
    }

    const userForToken = {
      id: user._id,
      username: user.username
    }

    const token = jwt.sign(userForToken, SECRET, {
      expiresIn: 60 * 60 * 24 * 7
    })

    response.send({
      username: user.username,
      name: user.name,
      token
    })
  } catch (error) {
    console.error(error)
    response.status(400).json(error)
  }
})

module.exports = loginRouter
