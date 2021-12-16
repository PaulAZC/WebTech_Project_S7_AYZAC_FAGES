
/** @jsxImportSource @emotion/react */
import {useContext, useEffect} from 'react';
import axios from 'axios';
// Layout
import {Button, Link} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
// Local
import Context from './Context'
import {useNavigate} from 'react-router-dom'
import { border, padding, ThemeProvider, width } from '@mui/system';
import { useTheme } from '@mui/styles';

const drawerWidth = 240;

const useStyles = (theme) => ({
  root: {
    backgroundColor:'#121317',
    '& a': {
      padding: '.2rem .5rem',
      whiteSpace: 'nowrap', 
    },
    height: "100%",
    width:"100%"
  },
  channel:{
    display: "flex",
    flexDirection: "row",
    alignItem: "center",
    justifyContent: "center",
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(2),
  }
})

export default function Channels() {

  const {
    oauth,
    channels, setChannels
  } = useContext(Context)
  const naviate = useNavigate();
  useEffect( () => {
    const fetch = async () => {
      try{
        const {data: channels} = await axios.get('http://localhost:3001/channels', {
          headers: {
            'Authorization': `Bearer ${oauth.access_token}`
          },
          params: {
            id: oauth.email
          }
        })
        setChannels(channels)
      }catch(err){
        console.error(err)
      }
    }
    fetch()
  }, [oauth, setChannels])
  const styles = useStyles(useTheme())
  return (
    <ul css={styles.root}>
      <li css={styles.channel}>
        <Button to="/channels" variant="contained" color="secondary" component={RouterLink}>Welcome</Button>
      </li>
      { channels.map( (channel, i) => (
        <li key={i} css={styles.channel}>
          <Button
            href={`/channels/${channel.id}`}
            onClick={ (e) => {
              e.preventDefault()
              naviate(`/channels/${channel.id}`)
            }}
            variant="contained" color="secondary"
          >
            {channel.name}
          </Button>
        </li>
      ))}
    </ul>
  );
}
