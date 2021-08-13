const express = require('express')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

const database = {
  users: [
    {
      id: '123',
      name: 'john doe',
      email: 'john@doe.se',
      password: '1234567',
      entries: 0,
      joined: new Date()
    },
    {
      id: '1243',
      name: 'jane doe',
      email: 'jane@doe.se',
      password: '1234567',
      entries: 0,
      joined: new Date()
    }
  ]
}

app.get('/', (req, res) => {
  res.send(database.users)
})

app.post('/signin', (req, res) => {
  if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
    res.json(res.json(database.users[0]))
  } else {
    res.status(400).json('Error logging in')
  }
})

app.post('/register', (req, res) => {
  const {name, email, password} = req.body
  database.users.push({
    id: database.length,
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date()
  })
  res.status(200).json(database.users[database.users.length-1])
})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params
  let found = false
  database.users.forEach(user => {
    if (user.id === id) {
      found = true
      return res.json(user)
    }
  });
  if (!found) {
    res.status(404).json("User not found")
  }
})

app.put('/image', (req, res) => {
  const { id } = req.body
  let found = false
  database.users.forEach(user => {
    if (user.id === id) {
      found = true
      user.entries++
      return res.json(user.entries)
    }
  });
  if (!found) {
    res.status(404).json("User not found")
  }
})


app.listen(3000, () => {
  console.log('App is running on port 3000')
})
