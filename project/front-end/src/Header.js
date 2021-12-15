
/** @jsxImportSource @emotion/react */
import { useContext } from 'react';
import * as React from 'react';
// Layout
import { useTheme } from '@mui/styles';
import Context from './Context';
import { Avatar } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

const useStyles = (theme) => ({
  header: {
    //padding: theme.spacing(1),
    backgroundColor: 'rgba(255,255,0,.3)',
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
          src={require('./static/images/default_avatar.jpg')}
          sx={{width: 35, height:35}}
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
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
