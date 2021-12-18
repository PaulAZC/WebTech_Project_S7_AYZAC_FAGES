
/** @jsxImportSource @emotion/react */
import {useContext, useRef, useState, useEffect} from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import axios from 'axios';
// Layout
import { useTheme } from '@mui/material/styles';
import {Button, Drawer, Toolbar, Typography, IconButton, AppBar, Popper, Box, Autocomplete, TextField, Chip} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
// Local
import Form from './channel/Form'
import List from './channel/List'
import Context from './Context'
import { useNavigate, useParams } from 'react-router-dom'

const useStyles = (theme) => ({
  root: {
    height: '100%',
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflowX: 'auto',
  },
  fab: {
    position: 'absolute !important',
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
  fabDisabled: {
    display: 'none !important',
  },
  drawer: {
    position: "relative",
    marginLeft: "auto",
    width: 240,
    "& .MuiBackdropRoot": {
      display: "none"
    },
    "& .MuiDrawerPaper": {
      width: 240,
      position: "absolute",
      height: 200,
      transition: "none !important"
    }
  }
})

export default function Channel() {
  const navigate = useNavigate()
  const { id } = useParams()
  const {channels, setChannels, oauth} = useContext(Context)
  const channel = channels.find( channel => channel.id === id)
  const styles = useStyles(useTheme())
  const listRef = useRef()
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])
  const [, setScrollDown] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);
  const [chooseUser,setChooseUser] = useState([]);
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const open2 = Boolean(anchorEl);
  const id2 = open2 ? 'simple-popper' : undefined;
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  
  const leaveChannel = async () => {
    const data = channels.filter(i => i.id !== channel.id)
    setChannels(data);
    await axios.delete(`http://localhost:3001/channels/${channel.id}/user/${oauth.email}`, {
      headers: {
        'Authorization': `Bearer ${oauth.access_token}`
      }
    })
    .then(async () => {
      await axios.delete(`http://localhost:3001/user/${oauth.id}/channel/${channel.id}`, {
        headers: {
          'Authorization': `Bearer ${oauth.access_token}`
        }
      })
    });
    navigate('/channels')
  }

  const removeMessage = async (messages,item) => {
    setMessages(messages)
    await axios.delete(`http://localhost:3001/channels/${channel.id}/message/${item.creation}`, {
      headers: {
        'Authorization': `Bearer ${oauth.access_token}`
      }
    })
  }

  const editMessage = async (i,message) => {
    let newArr = [...messages];
    newArr[i] = message;
    setMessages(newArr);
    await axios.put(`http://localhost:3001/channels/${channel.id}/message/${message.creation}`,{
      message
    },{
      headers: {
        'Authorization': `Bearer ${oauth.access_token}`
      },
    });
  }

  const addMessage = async (message) => {
    setMessages([...messages, message])
  }

  const addPeople = (e) => {
    e.preventDefault()
    var regExp = /\(([^)]+)\)/;
    for(let i=0;i<chooseUser.length;i++){
        chooseUser[i] = users.find(e => e.email === regExp.exec(chooseUser[i])[1])
        chooseUser[i] = chooseUser[i].email
        channel.users.push(chooseUser[i])
        const index = users.findIndex(item => item.email === chooseUser[i])
        if(index > -1)
          users.splice(index,1)
    }
    axios.put(`http://localhost:3001/channels/${channel.id}/users`, {
      users: chooseUser
    },{
      headers: {
        'Authorization': `Bearer ${oauth.access_token}`
      },
    })
    .then(async res => {
      for(let i=0;i<chooseUser.length;i++)
        await axios.post(`http://localhost:3001/users/channel/${res.data.id}`,{
            user: chooseUser[i]
        },{
            headers: {
              'Authorization': `Bearer ${oauth.access_token}`
            }
        })
    })
    setAnchorEl()
  }

  useEffect( () => {
    const fetch = async () => {
      try{
        const {data: messages} = await axios.get(`http://localhost:3001/channels/${id}/messages`, {
          headers: {
            'Authorization': `Bearer ${oauth.access_token}`
          }
        })
        setMessages(messages)
        if(listRef.current){
          listRef.current.scroll()
        }
      }catch(err){
        navigate('/oups')
      }
    }
    fetch()
  }, [id, oauth, navigate])

  useEffect(()=>{
      const fetch = async () => {
        try{
          await axios.get(`http://localhost:3001/users`, {
            headers: {
              'Authorization': `Bearer ${oauth.access_token}`
            }
          })
          .then(res => {
            const difference = res.data.filter(e => !channel.users.includes(e.email))
            setUsers(difference)
          })
        }catch(err){
          console.log(err)
        }
      }
      if(channel)
        fetch()
  },[channel, oauth])

  const onScrollDown = (scrollDown) => {
    setScrollDown(scrollDown)
  }
  const onClickScroll = () => {
    listRef.current.scroll()
  }
  // On refresh, context.channel is not yet initialized
  if(!channel){
    const check = async () => {
      await axios.get(`http://localhost:3001/user/${oauth.id}/channels`, {
        headers: {
          'Authorization': `Bearer ${oauth.access_token}`
        }
      })
      .then(res => {
        var n = window.location.href.lastIndexOf('/');
        var str = window.location.href.substring(n+1)
        if(!res.data.includes(str))
          navigate('/oups')
      })
    }
    check()
    return (<div>loading</div>)
  }
  return (
    <div css={styles.root}>
      <AppBar position="static" open={open} 
        style={{
          heigth:100,
          backgroundColor: 'transparent',
          boxShadow: "0px 0px 0px 0px"
        }}>
        <Toolbar sx={{borderBottom: '1px solid #326e61'}}>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} color="primary" component="div">
            {channel.name}
          </Typography>
          <div>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleClick}
            >
              {open2 ? <CancelIcon/> : <PersonAddIcon/>} 
            </IconButton>
            <Popper id={id2} open={open2} anchorEl={anchorEl}>
              <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper', display: 'flex-inline', flexDirection: 'row' }}>
                <Autocomplete
                  onChange={(event, value) => setChooseUser(value)}
                  multiple
                  id="tags-filled"
                  options={users.map((option) => option.firstName +" "+ option.lastName +" ("+option.email+")")}
                  style={{width:"300px"}}
                  filterSelectedOptions
                  freeSolo
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="filled"
                        label="Enter name"
                        placeholder="Name"
                    />
                  )}
                />
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="end"
                  onClick={addPeople}
                >
                  <AddIcon/>
                </IconButton>
              </Box>
            </Popper>
          </div>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: 'none' }), color:"primary" }}
            
          >
            <MoreHorizIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        style={styles.drawer}
        variant="persistent"
        open={open}
        anchor="right"
      >
        <IconButton onClick={handleDrawerClose} position="relative">
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
        {channel.users.map((user,i)=>{
          return(
              <Button key={i}>
                {user}
              </Button>
          );
        })}
        <Button variant="contained" color="primary" onClick={leaveChannel}>Leave Channel</Button>
      </Drawer>

      <List
        channel={channel}
        messages={messages}
        onScrollDown={onScrollDown}
        ref={listRef}
        removeMessage={removeMessage}
        editMessage={editMessage}
      />
      <Form addMessage={addMessage} channel={channel} />
    </div>
  );
}
