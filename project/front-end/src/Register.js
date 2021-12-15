import { Button, Grid, TextField} from '@mui/material';
import { useTheme } from '@mui/styles';
import axios from 'axios';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from './Context';

const useStyles = (theme) => ({
    grid: {
        paddingBottom: 20,
        color: "#326e61",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",   
        font:"2em bold"     
    },
    root:{
        width: "50%"
    },
})

export default function Register(){
    const theme = useTheme()
    const styles = useStyles(theme)
    const navigate = useNavigate()
    const {oauth, setOauth} = useContext(Context)
    const [email,setEmail] = useState('')
    const [fname,setFirst] = useState('')
    const [lname,setLast] = useState('')
    const register = async (e) =>{
        e.preventDefault()
        //setOauth(email)
        await axios.post('http://localhost:3001/users', {
            email: email,
            firstName: fname,
            lastName: lname
        })
        setEmail('')
        setFirst('')
        setLast('')
    }
    return(
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
                    <TextField id="standard-basic" label="Email" variant="standard" size="medium" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                </Grid>
                <Grid style={styles.grid}>
                    <TextField id="standard-basic" label="First Name" variant="standard" size="medium" value={fname} onChange={(e)=>setFirst(e.target.value)} required/>
                </Grid>
                <Grid style={styles.grid}>
                    <TextField id="standard-basic" label="Last Name" variant="standard" size="medium" value={lname} onChange={(e)=>setLast(e.target.value)} required/>
                </Grid>
                <Grid style={styles.grid}>
                    <Button variant="contained" size="medium" type='submit'>
                        Create Account
                    </Button>
                </Grid>
            </form>
            <Button onClick={(e) => {e.preventDefault()
                navigate(`/`)}}>Go Back</Button>
        </Grid>
    )
}