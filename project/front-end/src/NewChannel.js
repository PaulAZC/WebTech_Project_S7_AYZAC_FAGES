import { Button, Grid, TextField, Autocomplete, Chip } from '@mui/material';
import { useTheme } from '@mui/styles';
import { useEffect, useState } from 'react';
import axios from 'axios';

const useStyles = (theme) => ({
    top: {
        position: 'fixed',
        top: "15%"
    },
    grid: {
        padding: 25,
    },
    root:{
        width: "50%"
    },
})

export default function NewChannel(){
    const [users,setUsers] = useState([]);
    const [chooseUser,setChooseUser] = useState([])
    const theme = useTheme()
    const styles = useStyles(theme)

    const createGroup = (e) => {
        e.preventDefault()
        //comparaison
    }

    useEffect( () => {
        const fetch = async () => {
          try{
            const {data: allUsers} = await axios.get(`http://localhost:3001/users`)
            setUsers(allUsers)
          }catch(err){
            console.log(err)
          }
        }
        fetch()
    }, [])

    return(
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            <form onSubmit={createGroup}>
            <Grid style={styles.grid}>
                <TextField id="standard-basic" label="Name of channel" variant="standard" size="medium" required/>
            </Grid>
            <Grid>
            <Autocomplete
                onChange={(event, value) => setChooseUser(value)}
                multiple
                id="tags-filled"
                options={users.map((option) => option.firstName +" "+ option.lastName)}
                style={{width:"500px"}}
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
    );
}