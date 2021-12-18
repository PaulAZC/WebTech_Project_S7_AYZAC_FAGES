
/** @jsxImportSource @emotion/react */
// Layout
import { useTheme } from '@mui/styles';
import { Button, Grid, Typography } from '@mui/material';
import { ReactComponent as ChannelIcon } from './icons/channel.svg';
import { ReactComponent as FriendsIcon } from './icons/friends.svg';
import { ReactComponent as SettingsIcon } from './icons/settings.svg';

import { useNavigate} from 'react-router-dom'

const useStyles = (theme) => ({
  root: {
    height: '100%',
    width: '100%',
  },
  grid: {
    display: 'flex',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
  },
  card: {
    textAlign: 'center',
    flexDirection: 'column',
  },
  icon: {
    width: '100%',
    fill: '#326e61',
  }
})

export default function Welcome() {
  const navigate = useNavigate()
  const styles = useStyles(useTheme())
  return (
    <div css={styles.root}>
      <Grid
        style={styles.grid}
      >
        <Grid item xs>
          <Button css={styles.card} onClick={(e) => {
              e.preventDefault()
              navigate(`/channels/create`)
            }}>
            <ChannelIcon css={styles.icon} />
            <Typography color="primary">
              Create channels
            </Typography>
          </Button>
        </Grid>
        <Grid item xs>
          <Button css={styles.card} onClick={(e) => {
                e.preventDefault()
              }}>
            <FriendsIcon css={styles.icon} />
            <Typography color="primary">
              Invite friends
            </Typography>
          </Button>
        </Grid>
        <Grid item xs>
        <Button css={styles.card} onClick={(e) => {
              e.preventDefault()
              navigate(`/settings`)
            }}>
            <SettingsIcon css={styles.icon} />
            <Typography color="primary">
              Settings
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
