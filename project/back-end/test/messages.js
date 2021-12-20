
const supertest = require('supertest')
const microtime = require('microtime')
const app = require('../lib/app')
const db = require('../lib/db')
//messages tests
describe('messages', () => {
//before each test flush db
  beforeEach(async () => {
    await db.admin.clear()
  })

  it('list empty', async () => {
    // Create a channel
    const { body: channel } = await supertest(app)
      .post('/channels')
      .send({ name: 'channel 1', users: [] })
    // Get messages
    const { body: messages } = await supertest(app)
      .get(`/channels/${channel.id}/messages`)
      .expect(200)

    messages.should.eql([])
  })

  it('list one message', async () => {
    // Create a channel
    const { body: channel } = await supertest(app)
      .post('/channels')
      .send({ name: 'channel 1', users: [] })
    // and a message inside it
    await supertest(app)
      .post(`/channels/${channel.id}/messages`)
      .send({ author: 'whoami', content: 'Hello ECE' })
    // Get messages
    const { body: messages } = await supertest(app)
      .get(`/channels/${channel.id}/messages`)
      .expect(200)
    messages.should.match([{
      author: 'whoami',
      creation: (it) => it.should.be.approximately(microtime.now(), 1000000),
      content: 'Hello ECE'
    }])
  })

  it('add one element', async () => {
    // Create a channel
    const { body: channel } = await supertest(app)
      .post('/channels')
      .send({ name: 'channel 1', users: [] })
    // Create a message inside it
    const { body: message } = await supertest(app)
      .post(`/channels/${channel.id}/messages`)
      .send({ author: 'whoami', content: 'Hello ECE' })
      .expect(201)
    //check insertion
    message.should.match({
      author: 'whoami',
      creation: (it) => it.should.be.approximately(microtime.now(), 1000000),
      content: 'Hello ECE'
    })
    // Check it was correctly inserted
    const { body: messages } = await supertest(app)
      .get(`/channels/${channel.id}/messages`)
    messages.length.should.eql(1)
  })

  it('access invalid channel', async () => {
    // Get messages
    const { body: messages } = await supertest(app)
      .get(`/channels/1234/messages`)
      .expect(404)
  })

  it('delete one element', async () => {
    // Create a channel
    const { body: channel } = await supertest(app)
      .post('/channels')
      .send({ name: 'channel 1', users: [] })
    // Create a message inside it
    const { body: message } = await supertest(app)
      .post(`/channels/${channel.id}/messages`)
      .send({ author: 'whoami', content: 'Hello ECE' })
      .expect(201)
    //delete the message
    const { body: sms } = await supertest(app)
      .delete(`/channels/${channel.id}/message/${message.creation}`)
      .expect(200)
    sms.should.equal(message.creation.toString())
  })

  it('cannot delete unexisting element', async () => {
    // Create channel
    const { body: channel } = await supertest(app)
      .post('/channels')
      .send({ name: 'channel 1', users: [] })
    //try delete channel
    const { body: sms } = await supertest(app)
      .delete(`/channels/${channel.id}/message/`)
    sms.should.be.empty()
  })

  it('update one element', async () => {
    // Create a channel
    const { body: channel } = await supertest(app)
      .post('/channels')
      .send({ name: 'channel 1', users: [] })
    // Create a message inside it
    const { body: message } = await supertest(app)
      .post(`/channels/${channel.id}/messages`)
      .send({ author: 'whoami', content: 'Hello ECE' })
      .expect(201)
    //change value of content
    message.content = 'something else'
    //edit the message
    const { body: sms } = await supertest(app)
      .put(`/channels/${channel.id}/message/${message.creation}`)
      .send({ message })
      .expect(200)
    sms.should.match({
      message: {
        author: message.author,
        content: message.content,
        channelId: channel.id,
        creation: message.creation
      },
      channelId: channel.id,
      creation: message.creation.toString()
    })
  })

  it('cannot update empty element', async () => {
    // Create channel
    const { body: channel } = await supertest(app)
      .post('/channels')
      .send({ name: 'channel 1', users: [] })
    // Create a message inside it
    const { body: message } = await supertest(app)
      .post(`/channels/${channel.id}/messages`)
      .send({ author: 'whoami', content: 'Hello ECE' })
      .expect(201)
    //change
    message.content = 'something else'
    //try to update emtpy
    const { body: sms } = await supertest(app)
      .put(`/channels/${channel.id}/message/${message.creation}`)
      .expect(404)
    sms.should.be.empty()

  })


})
