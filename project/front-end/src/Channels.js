
/** @jsxImportSource @emotion/react */
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
// Layout
import { Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
// Local
import Context from './Context'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '@mui/styles';
import { Avatar, Badge } from '@mui/material';
import { styled } from '@mui/material/styles';
import Gravatar from 'react-gravatar';
import avatar1 from './static/images/avatar_1.png'
import avatar2 from './static/images/avatar_2.png'
import avatar3 from './static/images/avatar_3.png'
import avatar4 from './static/images/avatar_4.png'


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
    channels, setChannels, gravatar
  } = useContext(Context)
  const naviate = useNavigate();
  const [avatar, setAvatar] = useState()

  useEffect(() => {

    if(gravatar===false)
      setAvatar(<Gravatar email={oauth.email} size={25}/>)
    else{
      switch(gravatar){
        case "1":
            setAvatar(<Avatar alt='avatar1' src={avatar1} sx={{ width: 25, height: 25 }}/>)
            break;
        case "2":
            setAvatar(<Avatar alt='avatar2' src={avatar2} sx={{ width: 25, height: 25 }}/>)
            break;
        case "3":
            setAvatar(<Avatar alt='avatar3' src={avatar3} sx={{ width: 25, height: 25 }}/>)
            break;
        case "4":
            setAvatar(<Avatar alt='avatar4' src={avatar4} sx={{ width: 25, height: 25 }}/>)
            break;
        default:
            break;
      }
    }

    const fetch = async () => {
      try {
        const { data: channels } = await axios.get('http://localhost:3001/channels', {
          headers: {
            'Authorization': `Bearer ${oauth.access_token}`
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
              {gravatar ?
                (<div>
                    {avatar}
                </div>)
                :
                (<Avatar>
                    {avatar}
                </Avatar>)
              }
            </Badge>
            {channel.name}
          </Button>
        </li>
      ))}
    </ul>
  );
}
