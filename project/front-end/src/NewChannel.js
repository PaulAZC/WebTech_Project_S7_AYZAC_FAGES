import { Button, Grid, TextField, Autocomplete, Chip } from '@mui/material';
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
    const {oauth, channels, setChannels} = useContext(Context);
    const theme = useTheme();
    const styles = useStyles(theme);

    const createGroup = (e) => {
        e.preventDefault()
        var regExp = /\(([^)]+)\)/;
        for(let i=0;i<chooseUser.length;i++){
            chooseUser[i] = users.find(e => e.email === regExp.exec(chooseUser[i])[1])
            chooseUser[i] = chooseUser[i].email
        }
        chooseUser.push(oauth.email)
        if(chooseUser.length>1){
            axios.post('http://localhost:3001/channels',{
                name: nameGroup,
                users: chooseUser,
            })
            .then(res => {
                setChannels([...channels,res.data])
                navigate(`/channels/${res.data.id}`)
            })
            setName('')
            setChooseUser([])
        }
    }

    useEffect( () => {
        const fetch = async () => {
          try{
            const {data: allUsers} = await axios.get(`http://localhost:3001/users`)
            console.log(allUsers)
            setUsers(allUsers)
          }catch(err){
            console.log(err)
          }
        }
        fetch()
    }, [])

    return(
        <Grid
            style={styles.grid}
        >
            <form onSubmit={createGroup}>
            <Grid >
                <TextField id="standard-basic" label="Name of channel" variant="standard" size="medium" value={nameGroup} onChange={(e)=>setName(e.target.value)} error={nameGroup === ""} helperText={nameGroup === "" ? 'Empty field!' : ' '}required/>
            </Grid>
            <Grid>
            <Autocomplete
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
                        error={chooseUser.length === 0}
                        helperText={chooseUser.length === 0 ? 'Empty field!' : ' '}
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
    );
}