
/** @jsxImportSource @emotion/react */
/* display header of application */
import { useContext, useState } from 'react';
import * as React from 'react';

// Layout MUI
import { useTheme } from '@mui/styles';
import { Avatar } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import CottageIcon from '@mui/icons-material/Cottage';

// Local images
import avatar1 from '../static/images/avatar_1.png'
import avatar2 from '../static/images/avatar_2.png'
import avatar3 from '../static/images/avatar_3.png'
import avatar4 from '../static/images/avatar_4.png'

// Gravatar
import Gravatar from 'react-gravatar'

// Context
import Context from '../Contexts/Context';

//set styles
const useStyles = (theme) => ({
  avatar: {
    margin: "5px 10px 5px 5px"
  },
  header: {
    height: '3em',
    backgroundColor: '#326e61',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  menuChannel: {
    display: 'flex',
    flexDirection: 'row',
    width: "20%",
  },
  link: {
    color: "#f0f0f0",
    fontFamily: "Roboto",
    margin: 2.5,
  },
  menu: {
    [theme.breakpoints.up('sm')]: {
      display: 'none !important',
    },
  },
})

//export default header
export default function Header() {
  //set necessary variables
  const styles = useStyles(useTheme())
  const {
    oauth, setOauth, gravatar
  } = useContext(Context)
  const onClickLogout = (e) => {
    e.stopPropagation()
    setOauth(null)
  }
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [avatar, setAvatar] = useState()
  const [value, setValue] = React.useState('recents');
  //set the avatar according to the gravatar value of the user
  React.useEffect(()=>{
    if(gravatar==false)
      setAvatar(<Gravatar email={oauth.email} sx={{ width: 30, height: 30 }} onClick={handleClick}/>)
    else{
      switch(gravatar){
        case "1":
            setAvatar(<Avatar alt='avatar1' src={avatar1} sx={{ width: 40, height: 40 }} onClick={handleClick}/>)
            break;
        case "2":
            setAvatar(<Avatar alt='avatar2' src={avatar2} sx={{ width: 40, height: 40 }} onClick={handleClick}/>)
            break;
        case "3":
            setAvatar(<Avatar alt='avatar3' src={avatar3} sx={{ width: 40, height: 40 }} onClick={handleClick}/>)
            break;
        case "4":
            setAvatar(<Avatar alt='avatar4' src={avatar4} sx={{ width: 40, height: 40 }} onClick={handleClick}/>)
            break;
        default:
            break;
      }
    }
  },[gravatar,oauth.email])
  //open menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  //close menu
  const handleClose = () => {
    setAnchorEl(null);
  };
  //return layout
  return (
    <header css={styles.header}>
      <div style={styles.menuChannel}>
        <BottomNavigation
          sx={{
            width: 500, height: "3em", backgroundColor: "#326e61", color: "f0f0f0",
            "& .MuiBottomNavigationAction-root, .Mui-selected, svg": {
              color: "#f0f0f0"
            }
          }}
          value={value}
          showLabels
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            label="Home"
            value="homePage"
            sx={{ color: "#f0f0f0" }}
            icon={<CottageIcon sx={{ color: "#f0f0f0" }} />}
            onClick={(e) => {
              e.preventDefault()
              navigate(`/channels`)
            }}
          />
          <BottomNavigationAction
            label="Add a channel"
            value="addChannel"
            sx={{ color: "#f0f0f0" }}
            icon={<AddCircleIcon sx={{ color: "#f0f0f0" }} />}
            onClick={(e) => {
              e.preventDefault()
              navigate(`/channels/create`)
            }}
          />
        </BottomNavigation>
      </div>
      <div style={styles.header}>
        <ExpandMoreIcon onClick={handleClick} sx={{ marginTop: "5px" }} />
          {gravatar ?
            (<div style={styles.avatar}>
                {avatar}
            </div>)
            :
            (<Avatar style={styles.avatar} onClick={handleClick}>
                {avatar}
            </Avatar>)
          }
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={(e) => {
            e.preventDefault()
            navigate(`/settings`)
          }}>Settings</MenuItem>
          <MenuItem onClick={onClickLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </header>
  );
}
