
/** @jsxImportSource @emotion/react */
// Layout MUI
import { useTheme } from '@mui/styles';
import { Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ChatIcon from '@mui/icons-material/Chat';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Avatar } from '@mui/material';

// Context
import Context from '../Contexts/Context';
import { useContext } from 'react';

// Gravatar
import Gravatar from 'react-gravatar';


const useStyles = (theme) => ({
  root: {
    width: '100%',
    overflow: 'scroll'
  },
  icon: {
    width: '100%',
    fill: '#326e61',
  },
  top: {
    width: '100%',
    height: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: 'solid 1px #326e61',
  },
  fonctionnalty: {
    width: '100%',
    height: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: 'solid 1px #326e61',
    backgroundColor: '#326e61'
  },
  list: {
    width: '100%',
    height: '100%',
    backgroundColor: '#111820'

  },
  showChannel: {
    display: 'flex',
    alignItems: 'center',
    height: "25%",
    borderBottom: '1px #f0f0f0 solid',
    paddingLeft: 35
  },
  showRow: {
    display: 'flex'
  },
  myFonction: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    scrollBehavior: 'smooth',
  },
  fonctionCard: {
    backgroundColor: '#326e61',
    margin: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    width: 150,
    height: 150,
    borderRadius: 10
  }
})

export default function Welcome() {
  const styles = useStyles(useTheme())
  const {
    oauth
  } = useContext(Context)
  return (
    <div css={styles.root}>
      <div style={styles.top}>
        <Typography color={'#326e61'} fontSize={50}>
          Welcome to our chat
        </Typography>

      </div>
      <div style={styles.fonctionnalty}>
        <Typography color={'#f0f0f0'} fontSize={30}>
          Let discover our fonctionnalities
        </Typography>
        <a href='#myFonctionalities'>
          <ExpandMoreIcon sx={{
            color: '#f0f0f0',
            fontSize: 70,
            transition: "0.5s ease-in-out", '&:hover':
              { transform: 'translateY(20%)' }
          }} />
        </a>
      </div>
      <div id='myFonctionalities' style={styles.myFonction}>
        <div style={styles.showRow}>
          <div style={styles.fonctionCard}>
            <AddCircleIcon sx={{ color: '#f0f0f0', fontSize: 50 }} />
            <Typography sx={{ color: '#f0f0f0', textAlign: 'center' }}>
              Add and delete a new channel
            </Typography>
          </div>
          <div style={styles.fonctionCard}>
            <PersonAddIcon sx={{ color: '#f0f0f0', fontSize: 50 }} />
            <Typography sx={{ color: '#f0f0f0', textAlign: 'center' }}>
              Add a friend in your channel
            </Typography>
          </div>
          <div style={styles.fonctionCard}>
            <AutoFixHighIcon sx={{ color: '#f0f0f0', fontSize: 50 }} />
            <Typography sx={{ color: '#f0f0f0', textAlign: 'center' }}>
              Delete or modify a channel
            </Typography>
          </div>
        </div>
        <div style={styles.showRow}>
          <div style={styles.fonctionCard}>
            <ChatIcon sx={{ color: '#f0f0f0', fontSize: 50 }} />
            <Typography sx={{ color: '#f0f0f0', textAlign: 'center' }}>
              Delete or modify your messages
            </Typography>
          </div>
          <div style={styles.fonctionCard}>
            <AdminPanelSettingsIcon sx={{ color: '#f0f0f0', fontSize: 50 }} />
            <Typography sx={{ color: '#f0f0f0', textAlign: 'center' }}>
              Keep the control with the settings
            </Typography>
          </div>
          <div style={styles.fonctionCard}>
            <AccountCircleIcon sx={{ color: '#f0f0f0', fontSize: 50 }} />
            <Typography sx={{ color: '#f0f0f0', textAlign: 'center' }}>
              Choose a personal avatar
            </Typography>
          </div>
        </div>
        <Typography fontSize={30}>
          Discover how it works
        </Typography>
        <a href='#howItWork'>
          <ExpandMoreIcon sx={{
            color: '#326e61',
            fontSize: 70,
            transition: "0.5s ease-in-out", '&:hover':
              { transform: 'translateY(10%)' }
          }} />
        </a>
      </div >
      <div id='howItWork' style={styles.list}>
        <div style={styles.showChannel}>
          <ArrowBackIcon sx={{ color: '#f0f0f0', fontSize: 50, marginRight: 10, }} />
          <Typography color={'#f0f0f0'} fontSize={30}>
            You can access to your different channels here
          </Typography>
        </div>
        <div style={styles.showChannel}>
          <Typography color='error' fontSize={30}>
            You can use these button to edit or delete a message
          </Typography>
          <ArrowForwardIcon color='error' sx={{ fontSize: 50, marginRight: 10, marginLeft: 10 }} />
          <DeleteIcon color='error' sx={{ fontSize: 30 }} />
          <EditIcon color='error' sx={{ fontSize: 30 }} />
        </div>
        <div style={styles.showChannel}>
          <Avatar style={styles.avatar}>
            <Gravatar
              email={oauth.email}
              sx={{ width: 30, height: 30 }}
            />
          </Avatar>
          <ArrowBackIcon sx={{ color: '#f0f0f0', fontSize: 50, marginLeft: 10, marginRight: 10, }} />
          <Typography color='secondary' fontSize={30}>
            Click on your avatar on the top to logout or display the settings
          </Typography>
        </div>
        <div style={styles.showChannel}>
          <Typography color='primary' fontSize={30}>
            Leave a channel or invite a friend with these buttons
          </Typography>
          <ArrowForwardIcon color='primary' sx={{ fontSize: 50, marginRight: 10, marginLeft: 10 }} />
          <MoreHorizIcon color='primary' sx={{ fontSize: 30 }} />
          <PersonAddIcon color='primary' sx={{ fontSize: 30 }} />
        </div>
      </div>
    </div >
  );
}
