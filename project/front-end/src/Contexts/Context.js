
import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
//import variable for context
const Context = React.createContext()

export default Context
//declare Provider
export const Provider = ({
  children
}) => {
  //declare useful variable for editing context
  const [cookies, setCookie, removeCookie] = useCookies([])
  const [oauth, setOauth] = useState(cookies.oauth)
  const [gravatar, setGravatar] = useState(cookies.gravatar)
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [channels, setChannels] = useState([])
  const [currentChannel, setCurrentChannel] = useState(null)
  return (
    <Context.Provider value={{
      //oauth for authentification
      oauth: oauth,
      //set Gravatar
      setGrav: (grav) => {
        setGravatar(grav)
        setCookie('gravatar',grav)
      },
      //set Authentification
      setOauth: (oauth, id) => {
        if (oauth) {
          //parse payload
          const payload = JSON.parse(
            Buffer.from(
              oauth.id_token.split('.')[1], 'base64'
            ).toString('utf-8')
          )
          //give id and email
          oauth.email = payload.email
          oauth.id = id
          //Set cookies
          setCookie('oauth', oauth)
        } else {
          setCurrentChannel(null)
          setChannels([])
          removeCookie('oauth')
        }
        setOauth(oauth)
      },
      //Set different values
      gravatar: gravatar,
      channels: channels,
      drawerVisible: drawerVisible,
      setDrawerVisible: setDrawerVisible,
      setChannels: setChannels,
      currentChannel: currentChannel,
      setCurrentChannel: (channelId) => {
        const channel = channels.find(channel => channel.id === channelId)
        setCurrentChannel(channel)
      },
    }}>{children}</Context.Provider>
  )
}