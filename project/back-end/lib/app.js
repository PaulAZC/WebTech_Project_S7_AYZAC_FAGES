
const db = require('./db')
const express = require('express')
const cors = require('cors')
const authenticator = require('./authenticator')

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

app.get('/channels', authenticate, async (req, res) => {
  const channels = await db.channels.list(req.user.email)
  res.json(channels)
})

app.post('/channels', async (req, res) => {
  const channel = await db.channels.create(req.body)
  res.status(201).json(channel)
})

app.get('/channels/:id', async (req, res) => {
  const channel = await db.channels.get(req.params.id)
  res.json(channel)
})

app.delete('/channels/:id', async (req, res) => {
  const channel = await db.channels.delete(req.params.id)
  res.json(channel)
})

app.put('/channels/:id', async (req, res) => {
  const channel = await db.channels.update(req.body)
  res.json(channel)
})

app.delete('/channels/:id/user/:user', authenticate, async (req, res) => {
  const channel = await db.channels.deleteUser(req.params.id,req.params.user)
  res.json(channel)
})

app.put('/channels/:id/users', authenticate, async(req, res) => {
  const channel = await db.channels.updateUser(req.params.id,req.body)
  res.json(channel)
})//pas marcher

// Messages

app.get('/channels/:id/messages', authenticate, async (req, res) => {
  try{
    const channel = await db.channels.get(req.params.id)
  }catch(err){
    return res.status(404).send('Channel does not exist.')
  }
  const messages = await db.messages.list(req.params.id)
  res.json(messages)
})

app.post('/channels/:id/messages', async (req, res) => {
  const message = await db.messages.create(req.params.id, req.body)
  res.status(201).json(message)
})

app.delete('/channels/:id/message/:creation', authenticate, async (req,res) => {
  const message = await db.messages.delete(req.params.id, req.params.creation)
  res.status(200).json(message)
})

app.put('/channels/:id/message/:creation', authenticate, async (req,res) => {
  if(Object.keys(req.body).length === 0)
    return res.status(404).send('No body')
  const message = await db.messages.put(req.params.id, req.params.creation, req.body)
  res.status(200).json(message)
})

// Users

app.get('/users', authenticate, async (req, res) => {
  const users = await db.users.list()
  res.json(users)
})

app.get('/user/:id/channels', authenticate, async (req, res) => {
  const channels = await db.users.getChannels(req.params.id)
  res.json(channels)
})

app.post('/users', async (req, res) => {
  await db.users.list()
  .then(async response => {
    console.log(response)
    const index = response.findIndex(item => item.email === req.body.email)
    if(index !== -1)
      res.status(409).json('')
    else{
      const user = await db.users.create(req.body)
      res.status(201).json(user)
    }
  })
})

app.post('/users/channel/:id', async (req, res) => {
  const user = await db.users.addChannel(req.params.id,req.body)
  res.status(201).json(user)
})

app.delete('/user/:user/channel/:id', authenticate, async (req, res) => {
  const user = await db.users.removeChannel(req.params.user,req.params.id)
  res.status(200).json(user)
})

app.get('/user/:email', async (req, res) => {
  const user = await db.users.get(req.params.email)
  res.json(user)
})

app.put('/users/:id', async (req, res) => {
  const user = await db.users.update(req.body)
  res.json(user)
})

module.exports = app
