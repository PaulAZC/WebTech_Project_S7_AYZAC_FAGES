
/** @jsxImportSource @emotion/react */
import { useContext } from 'react';
import * as React from 'react';
// Layout
import { useTheme } from '@mui/styles';
import Context from './Context';
import { Avatar, Link } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Gravatar from 'react-gravatar'
import { useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PanToolIcon from '@mui/icons-material/PanTool';
import SettingsIcon from '@mui/icons-material/Settings';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';


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
    margin: 6
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

export default function Header() {
  const styles = useStyles(useTheme())
  const {
    oauth, setOauth,
  } = useContext(Context)
  const onClickLogout = (e) => {
    e.stopPropagation()
    setOauth(null)
  }
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [value, setValue] = React.useState('recents');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
            label="Welcome"
            value="welcomePage"
            sx={{ color: "#f0f0f0" }}
            icon={<PanToolIcon sx={{ color: "#f0f0f0" }} />}
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
          <BottomNavigationAction
            label="Add a friend"
            value="addPerson"
            sx={{ color: "#f0f0f0" }}
            icon={<PersonAddIcon sx={{ color: "#f0f0f0" }} />}
          />
          <BottomNavigationAction
            label="Settings"
            value="settings"
            sx={{ color: "#f0f0f0" }}
            icon={<SettingsIcon sx={{ color: "#f0f0f0" }} />}
            onClick={(e) => {
              e.preventDefault()
              navigate(`/settings`)
            }}
          />
        </BottomNavigation>
      </div>
      <div style={styles.header}>
        <ExpandMoreIcon onClick={handleClick} sx={{ marginTop: "5px" }} />
        <Avatar style={styles.avatar}>
          <Gravatar
            email={oauth.email}
            sx={{ width: 30, height: 30 }}
            onClick={handleClick}
          />
        </Avatar>
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
