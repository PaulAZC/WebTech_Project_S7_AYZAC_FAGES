
const supertest = require('supertest')
const app = require('../lib/app')
const db = require('../lib/db')
//channels test
describe('channels', () => {
//before each test clear db
  beforeEach(async () => {
    await db.admin.clear()
  })
//each test describe
  it('list empty', async () => {
    // Return an empty channel list by default
    const { body: channels } = await supertest(app)
      .get('/channels')
      .expect(200)
    channels.should.eql([])
  })

  it('list one element', async () => {
    // Create a channel
    await supertest(app)
      .post('/channels')
      .send({ name: 'channel 1', users: ['admin@example.com'] })
    // Ensure we list the channels correctly
    const { body: channels } = await supertest(app)
      .get('/channels')
      .expect(200)
    //check return value
    channels.should.match([{
      id: /^\w+-\w+-\w+-\w+-\w+$/,
      name: 'channel 1',
      users: []
    }])
  })

  it('create one element', async () => {
    // Create a channel
    const { body: channel } = await supertest(app)
      .post('/channels')
      .send({ name: 'channel 1', users: ['admin@example.com'] })
      .expect(201)
    // Check its return value
    channel.should.match({
      id: /^\w+-\w+-\w+-\w+-\w+$/,
      name: 'channel 1',
      users: ['admin@example.com']
    })
    // Check it was correctly inserted
    const { body: channels } = await supertest(app)
      .get('/channels')
    channels.length.should.eql(1)
  })

  it('get channel', async () => {
    // Create a channel
    const { body: channel1 } = await supertest(app)
      .post('/channels')
      .send({ name: 'channel 1', users: ['admin@example.com'] })
    // Check it was correctly inserted
    const { body: channel } = await supertest(app)
      .get(`/channels/${channel1.id}`)
      .expect(200)

    channel.name.should.eql('channel 1')
  })

  it('delete a channel', async () => {
    // Create a channel
    const { body: channel1 } = await supertest(app)
      .post('/channels')
      .send({ name: 'channel 1', users: ['admin@example.com'] })
    // delete it
    const { body: channel } = await supertest(app)
      .delete(`/channels/${channel1.id}`)
      .expect(200)

    channel.name.should.eql('channel 1')
  })

  it('edit a channel', async () => {
    // Create a channel
    const { body: channel1 } = await supertest(app)
      .post('/channels')
      .send({ name: 'channel 1', users: ['admin@example.com'] })
    // Change channel name
    channel1.name = 'nvx'
    // Edit channel
    const { body: channel } = await supertest(app)
      .put(`/channels/${channel1.id}`)
      .send({ name: channel1.name, users: channel1.users })
      .expect(200)
    channel.name.should.eql('nvx')
  })

  it('add user to channel', async () => {
    // Create a channel
    const { body: channel1 } = await supertest(app)
      .post('/channels')
      .send({ name: 'channel 1', users: [] })
    // create users
    const users = [
      'admin@example.com',
      'qql@autre.com'
    ]
    //add users in
    const { body: channel } = await supertest(app)
      .put(`/channels/${channel1.id}/users`)
      .send({ users })
      .expect(200)
    channel.id.should.match(/^\w+-\w+-\w+-\w+-\w+$/)
  })

  it('remove user from channel', async () => {
    // Create a channel
    const { body: channel1 } = await supertest(app)
      .post('/channels')
      .send({ name: 'channel 1', users: ['admin@example.com'] })
    // delete a user from channel
    const { body: channel } = await supertest(app)
      .delete(`/channels/${channel1.id}/user/${channel1.users[0]}`)
      .expect(200)
  })

  it('cannnot create channel without users', async () => {
    // Create a channel
    const { body: channel1 } = await supertest(app)
      .post('/channels')
      .send({ name: 'channel 1' })
      .expect(403)
    channel1.should.eql('')
    // Check can't delete
  })

  it('cannot add user to channel twice', async () => {
    // Create a channel
    const { body: channel1 } = await supertest(app)
      .post('/channels')
      .send({ name: 'channel 1', users: ['admin@example.com'] })
    //create a user
    const users = ['admin@example.com']
    //check can't add user twice in the channel
    const { body: channel } = await supertest(app)
      .put(`/channels/${channel1.id}/users`)
      .send({ users })
      .expect(403)

    channel.should.eql({})
    // Check it was correctly inserted
  })
})
