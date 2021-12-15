
/** @jsxImportSource @emotion/react */
// Layout
import { useTheme } from '@mui/styles';



const useStyles = (theme) => ({
  header: {
    height: '4em',
    backgroundColor: '#326e61',
    display: 'flex',
    flexDirection: 'row',
    alignItem: 'center',
    justifyContent: 'center'
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

export default function HeaderMenu() {
  const styles = useStyles(useTheme())
  return (
    <header css={styles.header}>
        <img alt="chat logo" src={require('./static/images/chat_icon.jpg')}/>
    </header>
  );
}