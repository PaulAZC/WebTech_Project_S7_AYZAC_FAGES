
const {v4: uuid} = require('uuid')
const {clone, merge} = require('mixme')
const microtime = require('microtime')
const level = require('level')
const db = level(__dirname + '/../db')

module.exports = {
  channels: {
    create: async (channel) => {
      try{
        if(!channel.name || !channel.users) throw Error('Invalid channel')
        const id = uuid()
        await db.put(`channels:${id}`, JSON.stringify(channel))
        return merge(channel, {id: id})
      }catch(err){
        return merge(null)
      }

    },
    get: async (id) => {
      let channel;
      if(!id) throw Error('Invalid id')
      await new Promise(async (resolve,reject) => {
        await db.get(`channels:${id}`,(err,res) => {
          try{
            if(!res) throw Error('Not existing channel')
            else{
              channel = JSON.parse(res)
              resolve(channel)
            }
          }catch(err){
            reject(Error(err))
          }
        })
      })
    },
    list: async (id) => {
      return new Promise( (resolve, reject) => {
        const channels = []
        db.createReadStream({
          gt: "channels:",
          lte: "channels" + String.fromCharCode(":".charCodeAt(0) + 1),
        }).on( 'data', ({key, value}) => {
          channel = JSON.parse(value)
          channel.id = key.split(':')[1]
          if(channel.users.indexOf(id) !==-1)
            channels.push(channel)
        }).on( 'error', (err) => {
          reject(err)
        }).on( 'end', () => {
          resolve(channels)
        })
      })
    },
    update: async (id, channel) => {
      if(!id) throw Error('Unregistered channel id')
      await new Promise(async (resolve,reject) => {
        await db.get(`channels:${id}`,async (err,res) => {
          try{
            if(!res) throw Error("Channel doesn't exist")
            res = JSON.parse(res)
            await db.put(`channels:${id}`, JSON.stringify(channel))
            resolve()
          }catch(err){
            reject(Error(err))
          }
        })
      })
      return merge(channel, {id: id})
    },
    delete: async (id) => {
      if(!id) throw Error('No id')
      await db.get(`channels:${id}`, async (err,res) => {
        if(!res)
          throw Error("Channel doesn't exist")
        await db.del(`channels:${id}`,(err,res) => {
          console.log(err,res)
        })
      })
    },
    deleteUser: async (id, user) => {
      await new Promise(async (resolve,reject) => {
        await db.get(`channels:${id}`,async (err,data)=>{
          data = JSON.parse(data)
          const val = data.users.filter(i => i !== user)
          await db.put(`channels:${id}`, JSON.stringify({
            name: data.name,
            users: val
          }))
          resolve()
        })
      })
    },
    updateUser: async (id, users) => {
      await new Promise(async (resolve,reject) => {
        await db.get(`channels:${id}`,async (err,res) => {
          try{
            if(!res) throw Error("Channel doesn't exist")
            res = JSON.parse(res)
            users.users.map((user) => {
              if(res.users.includes(user))
                throw Error("User already in")
              res.users = [...res.users,user]
            })
            await db.put(`channels:${id}`, JSON.stringify({
              name: res.name,
              users: res.users
            }))
            resolve()
          }catch(err){
            reject(Error(err))
          }
        })
      })
      return merge(users, {id: id})
    },
  },
  messages: {
    create: async (channelId, message) => {
      if(!channelId) throw Error('Invalid channel')
      if(!message.author) throw Error('Invalid message')
      if(!message.content) throw Error('Invalid message')
      creation = microtime.now()
      await db.put(`messages:${channelId}:${creation}`, JSON.stringify({
        author: message.author,
        content: message.content
      }))
      return merge(message, {channelId: channelId, creation: creation})
    },
    list: async (channelId) => {
      return new Promise( (resolve, reject) => {
        const messages = []
        db.createReadStream({
          gt: `messages:${channelId}:`,
          lte: `messages:${channelId}` + String.fromCharCode(":".charCodeAt(0) + 1),
        }).on( 'data', ({key, value}) => {
          message = JSON.parse(value)
          const [, channelId, creation] = key.split(':')
          message.channelId = channelId
          message.creation = creation
          messages.push(message)
        }).on( 'error', (err) => {
          reject(err)
        }).on( 'end', () => {
          resolve(messages)
        })
      })
    },
    delete: async (channelId, creation) => {
      if(!creation) throw Error('Invalid message id')
      await db.del(`messages:${channelId}:${creation}`,(err)=>{
        if(err)
          console.log(err)
      })
      return merge(channelId, creation);
    },
    put: async (channelId, creation, message) => {
      await db.put(`messages:${channelId}:${creation}`, JSON.stringify({
        author: message.message.author,
        content: message.message.content
      }))
      return merge(message, {channelId: channelId, creation: creation})
    },
  },
  users: {
    create: async (user) => {
      if(!user.email) throw Error('Invalid user')
      const id = uuid()
      await db.put(`users:${id}`, JSON.stringify(user))
      return merge(user, {id: id})
    },
    get: async (id) => {
      if(!id) throw Error('Invalid email')
      return new Promise( (resolve, reject) => {
        let users = null;
        db.createReadStream({
          gt: "users:",
          lte: "users" + String.fromCharCode(":".charCodeAt(0) + 1),
        }).on( 'data', ({key, value}) => {
          user = JSON.parse(value)
          user.id = key.split(':')[1]
          if(user.email === id){
            users = user;
            resolve(users)
          }
        }).on( 'error', (err) => {
          reject(err)
        }).on( 'end', () => {
          if(users==null)
            reject(Error('No user like this'))
        })
      })
    },
    getId: async (id) => {
      if(!id) throw Error('Invalid id')
      const data = await db.get(`users:${id}`)
      const user = JSON.parse(data)
      return merge(user, {id: id})
    },
    getChannels: async (id)=> {
      try{
        const data = await db.get(`users:${id}`)
        const channels = JSON.parse(data).channels
        return merge(channels) 
      }catch(err){
        return merge(null)
      }
      
    },
    list: async () => {
      return new Promise( (resolve, reject) => {
        const users = []
        db.createReadStream({
          gt: "users:",
          lte: "users" + String.fromCharCode(":".charCodeAt(0) + 1),
        }).on( 'data', ({key, value}) => {
          user = JSON.parse(value)
          user.id = key.split(':')[1]
          users.push(user)
        }).on( 'error', (err) => {
          reject(err)
        }).on( 'end', () => {
          resolve(users)
        })
      })
    },
    update: async (id, user) => {
      if(!id) throw Error('Unregistered user id')
      await new Promise(async (resolve,reject) => {
        await db.get(`users:${id}`,(err,res) => {
          try{
            if(!res) throw Error("User doesn't exist")
            res = JSON.parse(res)
            if(res.email !== user.email){
                throw Error('Cannot edit email')
            }
            else{
              db.put(`users:${id}`, JSON.stringify(user))
              resolve()
            }
          }catch(err){
            reject(Error(err))
          }
        })
      })
      return merge(user, {id: id})
    },
    delete: (id, user) => {
      const original = store.users[id]
      if(!original) throw Error('Unregistered user id')
      delete store.users[id]
    },
    addChannel: async (idChannel,usemail) => {
      return new Promise( (resolve, reject) => {
        const users = []
        db.createReadStream({
          gt: "users:",
          lte: "users" + String.fromCharCode(":".charCodeAt(0) + 1),
        }).on( 'data', async ({key, value}) => {
          user = JSON.parse(value)
          user.id = key.split(':')[1]
          if(user.email === usemail.user){
            user.channels.push(idChannel)
            users.push(user)
            await db.put(`users:${user.id}`, JSON.stringify({
              email: usemail.user,
              firstName: user.firstName,
              lastName: user.lastName,
              channels: user.channels
            }))
          }
        }).on( 'error', (err) => {
          reject(err)
        }).on( 'end', () => {
          resolve(users)
        })
      })
    },
    removeChannel: async (user,id) => {
      await new Promise(async (resolve,reject) => {
        await db.get(`users:${user}`, async (err,res) => {
          try{
            res = JSON.parse(res)
            const index = res.channels.indexOf(id)
            if(index===-1){
              throw Error('not in this channel')
            }
            res.channels.splice(index,1)
            const data = await db.put(`users:${user}`, JSON.stringify({
              email: res.email,
              firstName: res.firstName,
              lastName: res.lastName,
              channels: res.channels
            }))
            resolve()
          }catch(err){
            reject(Error(err))
          }
        })
      })
    }
  },
  admin: {
    clear: async () => {
      await db.clear()
    }
  }
}
