
// Layout
import { useTheme } from '@mui/styles';


//set style
const useStyles = (theme) => ({
  header: {
    height: '3em',
    backgroundColor: '#326e61',
  },
  menu: {
    [theme.breakpoints.up('sm')]: {
      display: 'none !important',
    },
  }
})
//header menu style
export default function HeaderMenu() {
  const styles = useStyles(useTheme())
  return (
    <header css={styles.header}>
    </header>
  );
}
