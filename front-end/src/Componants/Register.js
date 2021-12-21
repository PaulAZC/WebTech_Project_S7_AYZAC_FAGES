/** @jsxImportSource @emotion/react */
/* Create a new user */
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Layout MUI
import { Button, Grid, TextField, Snackbar, Alert } from '@mui/material';
import { useTheme } from '@mui/styles';
//create style
const useStyles = (theme) => ({
    grid: {
        paddingBottom: 20,
        color: "#326e61",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        font: "2em bold"
    },
    root: {
        width: "50%"
    },
})

export default function Register() {
    const theme = useTheme()
    const styles = useStyles(theme)
    const navigate = useNavigate()
    //const {oauth, setOauth} = useContext(Context)
    const [email, setEmail] = useState('')
    const [fname, setFirst] = useState('')
    const [lname, setLast] = useState('')
    const [sever, setSever] = useState({ severity: 'success', message: 'User created !' })
    const [state, setState] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'left',
    });

    const { vertical, horizontal, open } = state;
    //state for snackbars
    const handleClick = (newState) => {
        setState({ open: true, ...newState });
    };
    //close snackbar
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setState({ ...state, open: false });
    };
    //function to create a new user
    const register = async (e) => {
        e.preventDefault()
        //setOauth(email)
        try {
            //try axios method
            await axios.post('http://localhost:3001/users', {
                email: email,
                firstName: fname,
                lastName: lname,
                channels: [],
                gravatar: false
            })
            setSever({ severity: 'success', message: 'User created !' })
        }
        catch (err) {
            setSever({ severity: 'error', message: 'Error on creation !' })
        }
        //set textfield empty
        setEmail('')
        setFirst('')
        setLast('')
        handleClick({ vertical: 'bottom', horizontal: 'left' })
    }
    return (
        <div>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                marginTop="4em"
            >
                <Grid style={styles.grid}>
                    Register
                </Grid>
                <form onSubmit={register}>
                    <Grid style={styles.grid}>
                        <TextField id="standard-basic" label="Email" type="email" variant="standard" size="medium" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </Grid>
                    <Grid style={styles.grid}>
                        <TextField id="standard-basic" label="First Name" variant="standard" size="medium" value={fname} onChange={(e) => setFirst(e.target.value)} required />
                    </Grid>
                    <Grid style={styles.grid}>
                        <TextField id="standard-basic" label="Last Name" variant="standard" size="medium" value={lname} onChange={(e) => setLast(e.target.value)} required />
                    </Grid>
                    <Grid style={styles.grid}>
                        <Button variant="contained" size="medium" type='submit'>
                            Create Account
                        </Button>
                    </Grid>
                </form>
                <Button onClick={(e) => {
                    e.preventDefault()
                    navigate(`/`)
                }}>Go Back</Button>
            </Grid>
            <Snackbar anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={6000} onClose={handleClose} key={vertical + horizontal}>
                <Alert onClose={handleClose} severity={sever.severity} sx={{ width: '100%' }}>
                    {sever.message}
                </Alert>
            </Snackbar>
        </div>
    )
}