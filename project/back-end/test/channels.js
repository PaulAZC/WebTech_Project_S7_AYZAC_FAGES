
const supertest = require('supertest')
const app = require('../lib/app')
const db = require('../lib/db')

describe('channels', () => {

  beforeEach( async () => {
    await db.admin.clear()
  })

    it('list empty', async () => {
      // Return an empty channel list by default
      const {body: channels} = await supertest(app)
      .get('/channels')
      .expect(200)
      channels.should.eql([])
    })

    it('list one element', async () => {
      // Create a channel
      await supertest(app)
      .post('/channels')
      .send({name: 'channel 1',users: ['admin@example.com']})
      // Ensure we list the channels correctly
      const {body: channels} = await supertest(app)
      .get('/channels')
      .expect(200)

      channels.should.match([{
        id: /^\w+-\w+-\w+-\w+-\w+$/,
        name: 'channel 1',
        users: []
      }])
    })

  it('create one element', async () => {
    // Create a channel
    const {body: channel} = await supertest(app)
    .post('/channels')
    .send({name: 'channel 1', users:['admin@example.com']})
    .expect(201)
    // Check its return value
    channel.should.match({
      id: /^\w+-\w+-\w+-\w+-\w+$/,
      name: 'channel 1',
      users: ['admin@example.com']
    })
    // Check it was correctly inserted
    const {body: channels} = await supertest(app)
    .get('/channels')
    channels.length.should.eql(1)
  })

  it('get channel', async () => {
    // Create a channel
    const {body: channel1} = await supertest(app)
    .post('/channels')
    .send({name: 'channel 1', users:['admin@example.com']})
    // Check it was correctly inserted
    const {body: channel} = await supertest(app)
    .get(`/channels/${channel1.id}`)
    .expect(200)

    channel.name.should.eql('channel 1')
  })

  it('delete a channel', async () => {
    // Create a channel
    const {body: channel1} = await supertest(app)
    .post('/channels')
    .send({name: 'channel 1', users:['admin@example.com']})
    // Check it was correctly inserted
    const {body: channel} = await supertest(app)
    .delete(`/channels/${channel1.id}`)
    .expect(200)

    channel.name.should.eql('channel 1')
  })

  it('edit a channel', async () => {
    // Create a channel
    const {body: channel1} = await supertest(app)
    .post('/channels')
    .send({name: 'channel 1', users:['admin@example.com']})
    // Check it was correctly inserted
    channel1.name = 'nvx'
    const {body: channel} = await supertest(app)
    .put(`/channels/${channel1.id}`)
    .send({name: channel1.name, users: channel1.users})
    .expect(200)
    channel.name.should.eql('nvx')
  })

  it('add user to channel', async () => {
    // Create a channel
    const {body: channel1} = await supertest(app)
    .post('/channels')
    .send({name: 'channel 1', users:[]})
    // Check it was correctly inserted 'admin@example.com'
    const users = [
      'admin@example.com',
      'qql@autre.com'
    ]
    const {body: channel} = await supertest(app)
    .put(`/channels/${channel1.id}/users`)
    .send({users})
    .expect(200)
    channel.id.should.match(/^\w+-\w+-\w+-\w+-\w+$/)
  })

  it('remove user from channel', async () => {
    // Create a channel
    const {body: channel1} = await supertest(app)
    .post('/channels')
    .send({name: 'channel 1', users:['admin@example.com']})
    // Check it was correctly inserted
    const {body: channel} = await supertest(app)
    .delete(`/channels/${channel1.id}/user/${channel1.users[0]}`)
    .expect(200)
  })

  it('cannnot create channel without users', async () => {
    // Create a channel
    const {body: channel1} = await supertest(app)
    .post('/channels')
    .send({name: 'channel 1'})
    .expect(403)
    channel1.should.eql('')
    // Check it was correctly inserted
  })

  it('cannot add user to channel twice', async () => {
    // Create a channel
    const {body: channel1} = await supertest(app)
    .post('/channels')
    .send({name: 'channel 1', users:['admin@example.com']})

    const users = ['admin@example.com']

    const {body: channel} = await supertest(app)
    .put(`/channels/${channel1.id}/users`)
    .send({users})
    .expect(403)

    channel.should.eql({})
    // Check it was correctly inserted
  })


})
