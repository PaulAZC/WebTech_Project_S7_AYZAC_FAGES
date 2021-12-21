// Layout
import { Typography } from '@mui/material';
import { useTheme } from '@mui/styles';
import CancelIcon from '@mui/icons-material/Cancel';

// Root style
const useStyles = (theme) => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default function Oups() {
  //Use the style
  const styles = useStyles(useTheme())
  return (
    //Main content with message and icon
    <main style={styles.root}>
      <CancelIcon sx={{ fontSize: 250 }} color='primary' />
      <Typography color='primary' sx={{ fontSize: 40 }}>
        An unexpected error occured, it is probably not your fault. Sorry.
      </Typography>
    </main>
  );
}
