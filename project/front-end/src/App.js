
/** @jsxImportSource @emotion/react */
import { useContext, useState } from 'react'

// Local Components
import Oups from './Oups'
import Header from './Header'
import Main from './Main'
import Login from './Login'
import Context from './Context'
import Register from './Register'
import HeaderMenu from './HeaderMenu'
import Settings from './Settings'

// Rooter
import {
  Route,
  Routes,
  Navigate,
  useLocation
} from "react-router-dom"

const styles = {
  root: {
    width: '100%',
    heigtht: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: "#f0f0f0",
  },
}

export default function App() {
  const location = useLocation()
  const { oauth } = useContext(Context)
  const [drawerMobileVisible, setDrawerMobileVisible] = useState(false)
  const drawerToggleListener = () => {
    setDrawerMobileVisible(!drawerMobileVisible)
  }
  const gochannels = (<Navigate
    to={{
      pathname: "/channels",
      state: { from: location }
    }}
  />)
  const gohome = (<Navigate
    to={{
      pathname: "/",
      state: { from: location }
    }}
  />)
  return (
    <div className="App" css={styles.root}>
      <header>
        {oauth ? <Header drawerToggleListener={drawerToggleListener} /> : <HeaderMenu />}
      </header>
      <Routes>
        <Route exact path="/" element={oauth ? (gochannels) : (<Login />)} />
        <Route path="/register" element={oauth ? (gochannels) : (<Register />)} />
        <Route path="/channels/*" element={oauth ? (<Main />) : (gohome)} />
        <Route path="/Oups" element={<Oups />} />
        <Route path="/settings" element={oauth ? <Settings /> : (gochannels)} />
      </Routes>
    </div>
  );
}
