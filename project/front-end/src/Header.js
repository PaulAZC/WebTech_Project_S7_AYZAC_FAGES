
/** @jsxImportSource @emotion/react */
import { useContext } from 'react';
import * as React from 'react';
// Layout
import { useTheme } from '@mui/styles';
import Context from './Context';
import { Avatar } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Gravatar from 'react-gravatar'
import { useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const useStyles = (theme) => ({
  avatar: {
    margin: "5px 10px 5px 5px"
  },
  header: {
    height: '3em',
    backgroundColor: '#326e61',
    display: 'flex',
    flexDirection: 'row',
    alignItem: 'center',
    justifyContent: 'flex-end'
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
  return (
    <header css={styles.header}>
      <ExpandMoreIcon onClick={handleClick} sx={{marginTop: "5px" }} />
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
    </header>
  );
}
