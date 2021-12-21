/** @jsxImportSource @emotion/react */
import { useState, useEffect, forwardRef } from 'react';
import React from 'react';
import axios from 'axios';
import { useContext } from 'react';

// Contexte
import Context from '../Contexts/Context';

//Gravatar
import Gravatar from 'react-gravatar';

// Image local
import avatar1 from '../static/images/avatar_1.png'
import avatar2 from '../static/images/avatar_2.png'
import avatar3 from '../static/images/avatar_3.png'
import avatar4 from '../static/images/avatar_4.png'

// Layout MUI
import { styled } from '@mui/material/styles';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import { Dialog, DialogContent } from '@mui/material';
import { useTheme } from '@mui/styles';
import { Avatar, Button, TextField, Slide } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FormControlLabel, Switch } from '@mui/material';

// CSS configuration
const useStyles = (theme) => ({
    settings: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'scroll'
    },
    container: {
        width: '50%',
        margin: '1em'
    },
    avatarButton: {
        margin: 10,
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatarCards: {
        display: 'flex',
        flexDirection: 'row',
    },
    avatarCard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    data: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 10
    }
})

// Transition for the Dialog component when it is oopen
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

// Ignore the input component for the download button
const Input = styled('input')({
    display: 'none',
});

export default function Settings() {
    // All states for gravatar and for oauth values
    const [name, setName] = useState()
    const [gravatar, setGravatar] = useState()
    const [avatar, setAvatar] = useState()
    const [first, setFirst] = useState()
    const [chan, setChanUser] = useState()
    const [hold, setHold] = useState([])
    const [edit, setEdit] = useState(true)
    const styles = useStyles(useTheme())
    const {
        oauth, setGrav
    } = useContext(Context)
    const [expanded, setExpanded] = useState(false);

    const [open, setOpen] = useState(false);

    // Put the DB values to change the avatar with axios
    const changeAvatar = async (e) => {
        e.preventDefault()
        setAvatar(<Avatar alt='avatar1' src={avatar1} sx={{ width: 100, height: 100 }} />)
        await axios.put(`http://localhost:3001/users/${oauth.id}`, {
            email: oauth.email,
            firstName: first,
            lastName: name,
            channels: chan,
            gravatar: 1
        }, {
            headers: {
                'Authorization': `Bearer ${oauth.access_token}`
            },
        })
        setGravatar(1)
        setOpen(false)
        setGrav('1')
    }

    // Same for the avatar 1
    const changeAvatar1 = async (e) => {
        e.preventDefault()
        setAvatar(<Avatar alt='avatar2' src={avatar2} sx={{ width: 100, height: 100 }} />)
        await axios.put(`http://localhost:3001/users/${oauth.id}`, {
            email: oauth.email,
            firstName: first,
            lastName: name,
            channels: chan,
            gravatar: 2
        }, {
            headers: {
                'Authorization': `Bearer ${oauth.access_token}`
            },
        })
        setGravatar(2)
        setOpen(false)
        setGrav('2')
    }

    // Same for the avatar 2
    const changeAvatar2 = async (e) => {
        setGravatar(3)
        e.preventDefault()
        setAvatar(<Avatar alt='avatar3' src={avatar3} sx={{ width: 100, height: 100 }} />)
        await axios.put(`http://localhost:3001/users/${oauth.id}`, {
            email: oauth.email,
            firstName: first,
            lastName: name,
            channels: chan,
            gravatar: 3
        }, {
            headers: {
                'Authorization': `Bearer ${oauth.access_token}`
            },
        })
        setGravatar(3)
        setOpen(false)
        setGrav('3')
    }

    // Same for the avatar 3
    const changeAvatar3 = async (e) => {
        e.preventDefault()
        setAvatar(<Avatar alt='avatar4' src={avatar4} sx={{ width: 100, height: 100 }} />)
        await axios.put(`http://localhost:3001/users/${oauth.id}`, {
            email: oauth.email,
            firstName: first,
            lastName: name,
            channels: chan,
            gravatar: 4
        }, {
            headers: {
                'Authorization': `Bearer ${oauth.access_token}`
            },
        })
        setGravatar(4)
        setOpen(false)
        setGrav('4')
    }

    // Same for the avatar 4
    const changeAvatar4 = async (e) => {
        e.preventDefault()
        setAvatar(<Gravatar email={oauth.email} size={150} />)
        await axios.put(`http://localhost:3001/users/${oauth.id}`, {
            email: oauth.email,
            firstName: first,
            lastName: name,
            channels: chan,
            gravatar: false
        }, {
            headers: {
                'Authorization': `Bearer ${oauth.access_token}`
            },
        })
        setGravatar(false)
        setOpen(false)
        setGrav(false)
    }

    // UseEffect to get the avatar value with axios
    useEffect(() => {
        const fetch = async () => {
            await axios.get(`http://localhost:3001/user/${oauth.email}`, {
                headers: {
                    'Authorization': `Bearer ${oauth.access_token}`
                }
            })
                .then(res => {
                    setGravatar(res.data.gravatar)
                    setName(res.data.lastName)
                    setFirst(res.data.firstName)
                    setChanUser(res.data.channels)
                    setHold([res.data.firstName, res.data.lastName])

                    if (gravatar === false)
                        setAvatar(<Gravatar email={oauth.email} size={150} />)
                    else {
                        switch (gravatar) {
                            case 1:
                                setAvatar(<Avatar alt='avatar1' src={avatar1} sx={{ width: 150, height: 150 }} />)
                                break;
                            case 2:
                                setAvatar(<Avatar alt='avatar2' src={avatar2} sx={{ width: 150, height: 150 }} />)
                                break;
                            case 3:
                                setAvatar(<Avatar alt='avatar3' src={avatar3} sx={{ width: 150, height: 150 }} />)
                                break;
                            case 4:
                                setAvatar(<Avatar alt='avatar4' src={avatar4} sx={{ width: 150, height: 150 }} />)
                                break;
                            default:
                                break;
                        }
                    }
                })
        }
        fetch()
    }, [gravatar])

    // Edit the user with axios 
    const editUser = async () => {
        await axios.put(`http://localhost:3001/users/${oauth.id}`, {
            email: oauth.email,
            firstName: first,
            lastName: name,
            channels: chan,
            gravatar: gravatar
        }, {
            headers: {
                'Authorization': `Bearer ${oauth.access_token}`
            },
        })
            .then(res => {
                if (res) {
                    setHold([first, name])
                    setEdit(!edit)
                }
            })
    }

    // Function to edit the FirstName
    const handleEdit1 = (e) => {
        setName(e.target.value)
    }

    // Function to edit the Lastname
    const handleEdit2 = (e) => {
        setFirst(e.target.value)
    }

    // Open if we click on this component
    const handleClickOpen = () => {
        setOpen(true);
    };

    // Close it if we click on it
    const handleClose = () => {
        setOpen(false);
    };

    // If value change, expande it or not
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    // Return the 
    return (
        <div style={styles.settings}>
            <div style={styles.container}>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"

                    >
                        <Typography sx={{ width: '33%', color: '#326e61' }}>
                            General settings
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormControlLabel
                            // Dark mode but not working here
                            sx={{
                                display: 'flex',
                                color: '#326e61'
                            }}
                            control={
                                <Switch
                                    name="Chanhe theme"
                                    color="primary"
                                //onChange={toggleTheme}
                                />
                            }
                            label="Dark Theme"
                        />
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0, color: '#326e61' }}>Avatar</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={styles.avatarButton}>
                            <div style={styles.avatarCards}>
                                <div style={styles.avatarCard}>

                                    {gravatar ?
                                        // Set avatar choosen  
                                        (<div sx={{ width: 150, height: 150 }}>
                                            {avatar}
                                        </div>)
                                        :
                                        (<Avatar sx={{ width: 150, height: 150 }}>
                                            {avatar}
                                        </Avatar>)
                                    }
                                    <Button
                                        variant='contained'
                                        sx={{ margin: 2 }}
                                        size='small'
                                        onClick={handleClickOpen}
                                    >
                                        Change with models
                                    </Button>
                                    <Dialog
                                        // Choose the avatar with this Dialog component
                                        open={open}
                                        TransitionComponent={Transition}
                                        keepMounted
                                        onClose={handleClose}
                                        aria-describedby="alert-dialog-slide-description"
                                    >
                                        <DialogContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                            <Typography color='primary' fontSize={20} sx={{ margin: 2 }}>
                                                Default avatars
                                            </Typography>
                                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderBottom: 'solid 1px #326e61' }}>
                                                <Button>
                                                    <Avatar alt='avatar1' src={avatar1} sx={{ width: 100, height: 100 }} onClick={changeAvatar} />
                                                </Button>
                                                <Button>
                                                    <Avatar alt='avatar2' src={avatar2} sx={{ width: 100, height: 100 }} onClick={changeAvatar1} />
                                                </Button>
                                                <Button>
                                                    <Avatar alt='avatar3' src={avatar3} sx={{ width: 100, height: 100 }} onClick={changeAvatar2} />
                                                </Button>
                                                <Button>
                                                    <Avatar alt='avatar4' src={avatar4} sx={{ width: 100, height: 100 }} onClick={changeAvatar3} />
                                                </Button>
                                            </div>
                                            <Typography color='primary' fontSize={20} sx={{ margin: 2 }}>
                                                Your Gravatar
                                            </Typography>
                                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                <Button>
                                                    <Avatar sx={{ width: 100, height: 100 }} onClick={changeAvatar4}>
                                                        <Gravatar
                                                            // Choose the gravatar value
                                                            email={oauth.email}
                                                            size={150}
                                                        />
                                                    </Avatar>
                                                </Button>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                                <div style={styles.avatarCard}>


                                </div>
                            </div>
                            <label htmlFor="contained-button-file">
                                <Input accept="image/*" id="contained-button-file" multiple type="file" />
                                <Button variant="contained" component="span" size='small'>
                                    Upload an avatar
                                </Button>
                            </label>
                        </div>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4bh-content"
                        id="panel4bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0, color: '#326e61' }}>Personal data</Typography>
                    </AccordionSummary>
                    <AccordionDetails
                        sx={{
                            display: 'flex',
                            flexDirection: 'column', justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    // Modify and disply the bdd values using oauth
                    >
                        <div style={styles.data}>
                            <FingerprintIcon sx={{ marginRight: 3, color: '#326e61' }} />
                            <Typography sx={{ color: '#326e61' }}>
                                {oauth.id}
                            </Typography>
                        </div>
                        <div style={styles.data}>
                            <AlternateEmailIcon sx={{ marginRight: 3, color: '#326e61' }} />
                            <Typography sx={{ color: '#326e61' }}>
                                {oauth.email}
                            </Typography>
                        </div>
                        <div style={styles.data}>
                            <AccountCircleIcon sx={{ marginRight: 3, color: '#326e61' }} />
                            {edit ?
                                <Typography sx={{ color: '#326e61' }}>
                                    {first}
                                </Typography>
                                :
                                <TextField sx={{ color: '#326e61' }} value={first} onChange={handleEdit2} />
                            }

                        </div>
                        <div style={styles.data}>
                            <AccountCircleIcon sx={{ marginRight: 3, color: '#326e61' }} />
                            {edit ?
                                <Typography sx={{ color: '#326e61' }}>
                                    {name}
                                </Typography>
                                :
                                <TextField sx={{ color: '#326e61' }} value={name} onChange={handleEdit1} />
                            }
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>
            <div style={{ display: 'flex' }}>
                <Button
                    // Edit and save button (save redirect to the channel page)
                    variant='contained'
                    sx={{
                        marginRight: 3, marginTop: 3
                    }}
                    onClick={(e) => {
                        setEdit(!edit); setFirst(hold[0]);
                        setName(hold[1]);
                    }}>
                    {edit ? "Edit" : "Cancel"}
                </Button>
                <Button variant='contained' sx={{ marginTop: 3 }} onClick={editUser}>Save</Button>
            </div>
        </div>
    );
}