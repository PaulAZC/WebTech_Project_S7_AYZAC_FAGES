
/** @jsxImportSource @emotion/react */
import { useContext } from 'react';
import * as React from 'react';
// Layout
import { useTheme } from '@mui/styles';
import Context from './Context';
import { Avatar } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import avatarDefault from './static/images/default_avatar.png'

const useStyles = (theme) => ({
  avatar:{
    margin: "5px 5px 5px 5px"
  },
  header: {
    height: '4em',
    backgroundColor: '#326e61',
    display: 'flex',
    flexDirection: 'row',
    alignItem: 'center',
    justifyContent: 'flex-end'
  },
  headerLogIn: {
    backgroundColor: 'red',
  },
  headerLogOut: {
    backgroundColor: 'blue',
  },
  menu: {
    [theme.breakpoints.up('sm')]: {
      display: 'none !important',
    },
  }
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

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <header css={styles.header}>
        <Avatar 
          alt={oauth.email}
          src={avatarDefault}
          sx={{width: 50, height:50}}
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          style={styles.avatar}
        />
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
        }}
        >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>Settings</MenuItem>
        <MenuItem onClick={onClickLogout}>Logout</MenuItem>
      </Menu>
    </header>
  );
}
