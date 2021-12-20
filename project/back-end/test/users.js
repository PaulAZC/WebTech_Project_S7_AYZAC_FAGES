
const supertest = require('supertest')
const app = require('../lib/app')
const db = require('../lib/db')

describe('users', () => {

  beforeEach(async () => {
    await db.admin.clear()
  })

  it('list empty', async () => {
    // Return an empty user list by default
    const { body: users } = await supertest(app)
      .get('/users')
      .expect(200)
    users.should.eql([])
  })

  it('list one element', async () => {
    // Create a user
    await supertest(app)
      .post('/users')
      .send({ email: 'user_1', lastName: 'fages', firstName: 'clement', channels: [] })
    // Ensure we list the users correctly
    const { body: users } = await supertest(app)
      .get('/users')
      .expect(200)
    users.should.match([{
      id: /^\w+-\w+-\w+-\w+-\w+$/,
      email: 'user_1',
      lastName: 'fages',
      firstName: 'clement',
      channels: []
    }])
  })

  it('add one element', async () => {
    // Create a user
    const { body: user } = await supertest(app)
      .post('/users')
      .send({ email: 'user_1', lastName: 'fages', firstName: 'clement', channels: [] })
      .expect(201)
    // Check its return value
    // Check it was correctly inserted
    const { body: users } = await supertest(app)
      .get('/users')
    users.length.should.eql(1)
  })

  it('get user with email', async () => {
    // Create a user
    const { body: user1 } = await supertest(app)
      .post('/users')
      .send({ email: 'user_1', lastName: 'fages', firstName: 'clement', channels: [] })
    // Check it was correctly inserted
    const { body: user } = await supertest(app)
      .get(`/user/${user1.email}`)
      .expect(200)
    user.email.should.eql('user_1')
  })

  it('get user with id', async () => {
    // Create a user
    const { body: user1 } = await supertest(app)
      .post('/users')
      .send({ email: 'user_1', lastName: 'fages', firstName: 'clement', channels: [] })
    // Check it was correctly inserted
    const { body: user } = await supertest(app)
      .get(`/userId/${user1.id}`)
      .expect(200)
    user.id.should.eql(user1.id)
  })

  it('get user with id', async () => {
    // Create a user
    const { body: user1 } = await supertest(app)
      .post('/users')
      .send({ email: 'user_1', lastName: 'fages', firstName: 'clement', channels: [] })
    // Check it was correctly inserted
    const { body: user } = await supertest(app)
      .get(`/userId/${user1.id}`)
      .expect(200)
    user.id.should.eql(user1.id)
  })

  it('get channels of a user', async () => {
    // Create a user
    const { body: user1 } = await supertest(app)
      .post('/users')
      .send({ email: 'user_1', lastName: 'fages', firstName: 'clement', channels: [] })
    // Check it was correctly inserted
    const { body: channels } = await supertest(app)
      .get(`/user/${user1.id}/channels`)
      .expect(200)
    channels.should.eql([])
  })

  it('update firstName/lastName of a user', async () => {
    // Create a user
    const { body: user1 } = await supertest(app)
      .post('/users')
      .send({ email: 'user_1', lastName: 'fages', firstName: 'clement', channels: [] })
    // Check it was correctly inserted
    user1.lastName = 'nouveaux'
    user1.firstName = 'prenom'
    const { body: user } = await supertest(app)
      .put(`/users/${user1.id}`)
      .send({ email: user1.email, lastName: user1.lastName, firstName: user1.firstName, channels: user1.channels })
      .expect(200)
    user.lastName.should.eql(user1.lastName)
  })

  it('update firstName/lastName of a user', async () => {
    // Create a user
    const { body: user1 } = await supertest(app)
      .post('/users')
      .send({ email: 'user_1', lastName: 'fages', firstName: 'clement', channels: [] })
    // Check it was correctly inserted
    user1.lastName = 'nouveaux'
    user1.firstName = 'prenom'
    const { body: user } = await supertest(app)
      .put(`/users/${user1.id}`)
      .send({ email: user1.email, lastName: user1.lastName, firstName: user1.firstName, channels: user1.channels })
      .expect(200)
    user.lastName.should.eql(user1.lastName)
  })

  it('add channel to a user', async () => {
    //create a channel
    const { body: channel } = await supertest(app)
      .post('/channels')
      .send({ name: 'channel 1', users: [] })
    // Create a user
    const { body: user1 } = await supertest(app)
      .post('/users')
      .send({ email: 'user_1', lastName: 'fages', firstName: 'clement', channels: [] })
    // Add a channel
    const { body: chan } = await supertest(app)
      .post(`/users/channel/${channel.id}`)
      .send({ user: user1.email })
      .expect(201)

    chan[0].channels.length.should.eql(1)
  })

  it('leave a channel', async () => {
    //create a channel
    const { body: channel } = await supertest(app)
      .post('/channels')
      .send({ name: 'channel 1', users: [] })
    // Create a user
    const { body: user1 } = await supertest(app)
      .post('/users')
      .send({ email: 'user_1', lastName: 'fages', firstName: 'clement', channels: [] })
    // Add a channel
    await supertest(app)
      .post(`/users/channel/${channel.id}`)
      .send({ user: user1.email })
    //Leave channels
    const { body: chan } = await supertest(app)
      .delete(`/user/${user1.id}/channel/${channel.id}`)
      .expect(200)
    chan.length.should.eql(0)
  })

  it("can't edit user's email", async () => {
    // Create a user
    const { body: user1 } = await supertest(app)
      .post('/users')
      .send({ email: 'user_1', lastName: 'fages', firstName: 'clement', channels: [] })
    // Edit
    user1.email = 'nouveaux@email.com'
    const { body: user } = await supertest(app)
      .put(`/users/${user1.id}`)
      .send({ email: user1.email, lastName: user1.lastName, firstName: user1.firstName, channels: user1.channels })
      .expect(403)
    user.should.be.empty()
  })

  it("can't edit user without id", async () => {
    const { body: user } = await supertest(app)
      .put(`/users/`)
      .send({ email: 'test', lastName: 'test', firstName: 'test', channels: [] })
      .expect(404)

    user.should.be.empty()
  })

  it("can't update non existing user", async () => {// Edit
    // Create a user
    const { body: user1 } = await supertest(app)
      .post('/users')
      .send({ email: 'user_1', lastName: 'fages', firstName: 'clement', channels: [] })

    const { body: user } = await supertest(app)
      .put(`/users/111`)
      .send({ email: user1.email, lastName: user1.lastName, firstName: user1.firstName, channels: user1.channels })
      .expect(403)

    user.should.be.empty()
  })

  it("can't add to channel not existing", async () => {
    // Create a user
    const { body: user1 } = await supertest(app)
      .post('/users')
      .send({ email: 'user_1', lastName: 'fages', firstName: 'clement', channels: [] })
    // Add a channel
    const { body: chan } = await supertest(app)
      .post(`/users/channel/111`)
      .send({ user: user1.email })
      .expect(404)
    chan.should.eql({})
  })

  it("can't leave channel he is not in", async () => {
    // Create a user
    const { body: user1 } = await supertest(app)
      .post('/users')
      .send({ email: 'user_1', lastName: 'fages', firstName: 'clement', channels: [] })
    // Add a channel
    const { body: chan } = await supertest(app)
      .delete(`/user/${user1.id}/channel/111`)
      .expect(404)
    chan.should.eql({})
  })

  it("can't add someone in channel twice", async () => {
    const { body: channel } = await supertest(app)
      .post('/channels')
      .send({ name: 'channel 1', users: [] })
    // Create a user
    const { body: user1 } = await supertest(app)
      .post('/users')
      .send({ email: 'user_1', lastName: 'fages', firstName: 'clement', channels: [] })
    // Add a channel
    const { body: chan } = await supertest(app)
      .post(`/users/channel/${channel.id}`)
      .send({ user: user1.email })

    //try to readd in channels
    const { body: chan2 } = await supertest(app)
      .post(`/users/channel/${channel.id}`)
      .send({ user: user1.email })
      .expect(403)

    chan2.should.eql({})
  })

})
