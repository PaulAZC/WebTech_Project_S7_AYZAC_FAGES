//requires
const db = require('./db')
const express = require('express')
const cors = require('cors')
const authenticator = require('./authenticator')
//launch express
const app = express()
const authenticate = authenticator({
  test_payload_email: process.env['TEST_PAYLOAD_EMAIL'],
  jwks_uri: 'http://127.0.0.1:5556/dex/keys'
})

app.use(require('body-parser').json())
app.use(cors())

app.get('/', (req, res) => {
  res.send([
    '<h1>ECE WebTech Chat</h1>'
  ].join(''))
})

// Channels
//get all channels
app.get('/channels', authenticate, async (req, res) => {
  const channels = await db.channels.list(req.user.email)
  res.json(channels)
})
//create a channel
app.post('/channels', async (req, res) => {
  const channel = await db.channels.create(req.body)
  if (!channel) {
    res.status(403).json('')
  }
  else
    res.status(201).json(channel)
})
//get a channel by id
app.get('/channels/:id', async (req, res) => {//peut etre rajouter channel =
  try{
    const channel = await db.channels.get(req.params.id)
    res.status(200).json(channel)
  }
  catch (err) {
    console.log(err)
  }
})
//delete a channel by id
app.delete('/channels/:id', authenticate, async (req, res) => {
  await db.channels.delete(req.params.id)
  res.status(200).json(channel)
})
//edit a channel (name for example)
app.put('/channels/:id', authenticate, async (req, res) => {
  const channel = await db.channels.update(req.params.id, req.body)
  res.status(200).json(channel)
})
//delete a user from list of a channel
app.delete('/channels/:id/user/:user', authenticate, async (req, res) => {
  const channel = await db.channels.deleteUser(req.params.id, req.params.user)
  res.json(channel)
})
//add a user to a channel
app.put('/channels/:id/users', authenticate, async (req, res) => {
  try {
    const channel = await db.channels.updateUser(req.params.id, req.body)
    res.status(200).json(channel)
  } catch (err) {
    res.status(403).json(err)
  }

})

// Messages
//get messages of a channel
app.get('/channels/:id/messages', authenticate, async (req, res) => {
  try {
    const channel = await db.channels.get(req.params.id)
    const messages = await db.messages.list(req.params.id)
    return res.status(200).json(messages)
  } catch (err) {
    return res.status(404).send('Channel does not exist.')
  }
})
//post a message in a channel
app.post('/channels/:id/messages', async (req, res) => {
  const message = await db.messages.create(req.params.id, req.body)
  res.status(201).json(message)
})
//delete a message from a channel
app.delete('/channels/:id/message/:creation', authenticate, async (req, res) => {
  const message = await db.messages.delete(req.params.id, req.params.creation)
  res.status(200).json(message)
})
//edit a message from a channel
app.put('/channels/:id/message/:creation', authenticate, async (req, res) => {
  if (Object.keys(req.body).length === 0)
    return res.status(404).send('No body')
  const message = await db.messages.put(req.params.id, req.params.creation, req.body)
  res.status(200).json(message)
})

// Users
//get all users
app.get('/users', authenticate, async (req, res) => {
  const users = await db.users.list()
  res.json(users)
})
//get channels of a user
app.get('/user/:id/channels', authenticate, async (req, res) => {
  //send the user from the authentification
  const temp = await db.users.get(req.user.email)
  const channels = await db.users.getChannels(temp.id)
  if(!channels)
    res.json('')
  else
    res.json(channels)
})
//create a user
app.post('/users', async (req, res) => {
  await db.users.list()
  .then(async response => {
    const index = response.findIndex(item => item.email === req.body.email)
    if(index !== -1)
      res.status(409).json('')
    else{
      const user = await db.users.create(req.body)
      res.status(201).json(user)
    }
    
  })
})
//add a channel id to user's channels list
app.post('/users/channel/:id', async (req, res) => {
  try {
    const channel = await db.channels.get(req.params.id)
    try {
      const temp = await db.users.get(req.body.user)
      const channels = await db.users.getChannels(temp.id)
      if (channels.includes(req.params.id)) {
        throw Error('User already in')
      }
      const user = await db.users.addChannel(req.params.id, req.body)
      res.status(201).json(user)
    }
    catch (err) {
      res.status(403).json(err)
    }
  }
  catch (err) {
    res.status(404).json(err)
  }

})
//delete a user from a channel
app.delete('/user/:user/channel/:id', authenticate, async (req, res) => {
  try {
    const user = await db.users.removeChannel(req.params.user, req.params.id)
    res.status(200).json(user)
  }
  catch (err) {
    res.status(404).json(err)
  }
})
//get a user according to its email
app.get('/user/:email', async (req, res) => {
  try {
    const user = await db.users.get(req.params.email)
    res.status(200).json(user)
  }
  catch (err) {
    res.json('')
  }
})
//get user by id
app.get('/userId/:id', authenticate, async (req, res) => {
  const user = await db.users.getId(req.params.id)
  res.status(200).json(user)
})
//edit a user
app.put('/users/:id', authenticate, async (req, res) => {
  try{
    const userTemp = await db.users.get(req.user.email)
    const user = await db.users.update(userTemp.id,req.body)
    res.status(200).json(user)
  } catch (err) {
    res.status(403).json(err)
  }
})

module.exports = app
