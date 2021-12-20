
/** @jsxImportSource @emotion/react */
import { useContext, useEffect } from 'react';
import axios from 'axios';
// Layout MUI
import { Button } from '@mui/material';
import { useTheme } from '@mui/styles';
import { Avatar, Badge } from '@mui/material';
import { styled } from '@mui/material/styles';

// Local
import Context from './Context';
import { useNavigate } from 'react-router-dom';

import Gravatar from 'react-gravatar';


const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 10,
  height: 10,
  border: `1px solid`,
}));

const useStyles = (theme) => ({
  root: {
    backgroundColor: '#f0f0f0',
    height: "100%",
    width: "calc(100% - 7px)",
    overflow: 'hidden',
    borderRight: "solid 1px #326e61",
    padding: "3px",
  },
  channel: {
    display: "flex",
    flexDirection: "row",
    alignItem: "center",
    justifyContent: "center",
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(2),
  },
  listItem: {
    backgroundColor: '#326e61',
    color: '#f0f0f0',
    boderRadius: "5px"
  }
})

export default function Channels() {

  const {
    oauth,
    channels, setChannels
  } = useContext(Context)
  const naviate = useNavigate();
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data: channels } = await axios.get('http://localhost:3001/channels', {
          headers: {
            'Authorization': `Bearer ${oauth.access_token}`
          },
          params: {
            id: oauth.email
          }
        })
        setChannels(channels)
      } catch (err) {
        console.error(err)
      }
    }
    fetch()
  }, [oauth, setChannels])
  const styles = useStyles(useTheme())
  return (
    <ul css={styles.root}>
      {channels.map((channel, i) => (
        <li key={i} css={styles.channel}>
          <Button
            href={`/channels/${channel.id}`}
            onClick={(e) => {
              e.preventDefault()
              naviate(`/channels/${channel.id}`)
            }}
            variant="contained" color="primary"
          >
            <Badge
              overlap="circular"
              style={{ marginRight: '7px' }}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                <SmallAvatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              }
            >
              <Avatar sx={{ width: 25, height: 25 }}>
                <Gravatar
                  email={oauth.email}
                  size={25}
                />
              </Avatar>
            </Badge>
            {channel.name}
          </Button>
        </li>
      ))}
    </ul>
  );
}
