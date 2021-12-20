
import React, { useState } from 'react'
import { useCookies } from 'react-cookie'

const Context = React.createContext()

export default Context

export const Provider = ({
  children
}) => {
  const [cookies, setCookie, removeCookie] = useCookies([])
  const [oauth, setOauth] = useState(cookies.oauth)
  const [gravatar, setGravatar] = useState(cookies.gravatar)
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [channels, setChannels] = useState([])
  const [currentChannel, setCurrentChannel] = useState(null)
  return (
    <Context.Provider value={{
      oauth: oauth,
      setGrav: (grav) => {
        setGravatar(grav)
        setCookie('gravatar',grav)
      },
      setOauth: (oauth, id) => {
        if (oauth) {
          const payload = JSON.parse(
            Buffer.from(
              oauth.id_token.split('.')[1], 'base64'
            ).toString('utf-8')
          )
          oauth.email = payload.email
          oauth.id = id
          setCookie('oauth', oauth)
        } else {
          setCurrentChannel(null)
          setChannels([])
          removeCookie('oauth')
        }
        setOauth(oauth)
      },
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