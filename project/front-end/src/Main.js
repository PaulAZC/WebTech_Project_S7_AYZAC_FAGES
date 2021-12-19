
/** @jsxImportSource @emotion/react */
import {useContext, useEffect} from 'react'
import axios from 'axios';
// Layout
import { useTheme } from '@mui/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Drawer } from '@mui/material';
// Local
import Context from './Context'
import Channels from './Channels'
import Channel from './Channel'
import Welcome from './Welcome'
import NewChannel from './NewChannel'
import {
  Route,
  Routes,
} from 'react-router-dom'
import Settings from './Settings';

const useStyles = (theme) => ({
  root: {
    backgroundColor: '#f0f0f0',
    color:"#326e61",
    overflow: 'hidden',
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
  },
  drawer: {
    width: '10em',
    display: 'none',
  },
  drawerVisible: {
    display: 'block',
  },
})

export default function Main() {
  const {
    // currentChannel, not yet used
    drawerVisible,
    oauth,
    setOauth
  } = useContext(Context)
  const theme = useTheme()
  const styles = useStyles(theme)
  const alwaysOpen = useMediaQuery(theme.breakpoints.up('sm'))
  const isDrawerVisible = alwaysOpen || drawerVisible

  useEffect(() => {
    const fetch = async () => {
      await axios.get(`http://localhost:3001/user/${oauth.email}`)
      .then(async res => {
        if(res.data==="" || res.data == null){
          setOauth(null)
        }
      })
    }
    fetch()
  },[oauth.email, setOauth])
  
  return (
    <main css={styles.root}>
      <Drawer
        PaperProps={{ style: { position: 'relative' } }}
        BackdropProps={{ style: { position: 'relative' } }}
        ModalProps={{
          style: { position: 'relative' }
        }}
        variant="persistent"
        open={isDrawerVisible}
        css={[styles.drawer, isDrawerVisible && styles.drawerVisible]}
      >
        <Channels />
      </Drawer>
      <Routes>
        <Route path="/create" element={<NewChannel />}/>
        <Route path=":id" element={<Channel />}/>
        <Route path="*" element={<Welcome />}/>
      </Routes>
    </main>
  );
}
