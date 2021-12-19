import { Button, Grid, TextField, Autocomplete, Chip, Snackbar, Alert } from '@mui/material';
import { useTheme } from '@mui/styles';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Context from './Context';

const useStyles = (theme) => ({
    grid: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
    },
    form:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default function NewChannel(){
    const navigate = useNavigate();
    const [users,setUsers] = useState([]);
    const [chooseUser,setChooseUser] = useState([]);
    const [nameGroup,setName] = useState('');
    const [ncKey,setKey] = useState(true);
    const {oauth, channels, setChannels} = useContext(Context);
    const theme = useTheme();
    const styles = useStyles(theme);
    const [state, setState] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'right',
    });

    const { vertical, horizontal, open } = state;

    const handleClick = (newState) => {
        setState({open: true, ...newState});
    };
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setState({...state, open: false});
    };

    const createGroup = (e) => {
        e.preventDefault()
        var regExp = /\(([^)]+)\)/;
        try{
            for(let i=0;i<chooseUser.length;i++){
                try{
                    chooseUser[i] = users.find(e => e.email === regExp.exec(chooseUser[i])[1])
                    chooseUser[i] = chooseUser[i].email
                }catch(err){
                    chooseUser.splice(i,1)
                    i--
                }
            }
            chooseUser.push(oauth.email)
        }
        catch(err){
            console.error(err)
        }

        if(chooseUser.length>1){
            axios.post('http://localhost:3001/channels',{
                name: nameGroup,
                users: chooseUser,
            },{
                headers: {
                    'Authorization': `Bearer ${oauth.access_token}`
                },
            })
            .then(async res => {
                setChannels([...channels,res.data])
                navigate(`/channels/${res.data.id}`)
                chooseUser.map(async (user) => {
                    await axios.post(`http://localhost:3001/users/channel/${res.data.id}`,{
                        user: user
                    },{
                        headers: {
                          'Authorization': `Bearer ${oauth.access_token}`
                        }
                    })
                })
                    
            })
            setName('')
            setChooseUser([])
        }
        else{
            if(ncKey)
                setKey(false)
            else
                setKey(true)
            handleClick({vertical: 'bottom', horizontal: 'left'})
            setChooseUser([])
        }
    }

    useEffect( () => {
        const fetch = async () => {
            try{
                await axios.get(`http://localhost:3001/users`, {
                  headers: {
                    'Authorization': `Bearer ${oauth.access_token}`
                  }
                })
                .then(res => {
                    const difference = res.data.findIndex(item => item.email === oauth.email)
                    res.data.splice(difference,1)
                    setUsers(res.data)
                })
            }catch(err){
                console.log(err)
            }
        }
        fetch()
    }, [oauth])

    return(
        <div>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <form onSubmit={createGroup}>
                <Grid style={styles.grid}>
                    <TextField id="standard-basic" label="Name of channel" variant="standard" size="medium" value={nameGroup} onChange={(e)=>setName(e.target.value)} error={nameGroup === ""} helperText={nameGroup === "" ? 'Empty field!' : ' '}required/>
                </Grid>
                <Grid>
                <Autocomplete
                    key={ncKey}
                    onChange={(event, value) => setChooseUser(value)}
                    multiple
                    id="tags-filled"
                    options={users.map((option) => option.firstName +" "+ option.lastName +" ("+option.email+")")}
                    style={{width:"500px"}}
                    filterSelectedOptions
                    freeSolo
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                        ))
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="filled"
                            label="Enter name"
                            placeholder="Name"
                        />
                    )}
                />
                </Grid>
                <Grid style={styles.grid}>
                    <Button variant="contained" size="large" type='submit'>
                        Create
                    </Button>
                </Grid>
                </form>
            </Grid>
            <Snackbar anchorOrigin={{vertical, horizontal}} open={open} autoHideDuration={6000} onClose={handleClose} key={vertical + horizontal}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Channel couldn't be created !
                </Alert>
            </Snackbar>
        </div>
    );
}