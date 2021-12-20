import {useState, useEffect, forwardRef} from 'react';
import axios from 'axios';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useContext } from 'react';
import Context from './Context';
import { useTheme } from '@mui/styles';
import { Avatar, Button, TextField, Slide, ListItemIcon, ListItemText } from '@mui/material';
import Gravatar from 'react-gravatar';
import { Dialog, DialogContent } from '@mui/material';
import avatar1 from './static/images/avatar_1.png'
import avatar2 from './static/images/avatar_2.png'
import avatar3 from './static/images/avatar_3.png'
import avatar4 from './static/images/avatar_4.png'
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PasswordIcon from '@mui/icons-material/Password';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import GroupsIcon from '@mui/icons-material/Groups';

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
        margin: '4em'
    },
    avatarButton: {
        margin: 10,
    }, 
    data:{
        display: 'flex', 
        justifyContent: 'center',
        marginBottom: 10
    }
})

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Input = styled('input')({
    display: 'none',
});

export default function Settings() {
    const [name,setName] = useState()
    const [gravatar, setGravatar] = useState()
    const [avatar,setAvatar] = useState()
    const [first,setFirst] = useState()
    const [chan,setChanUser] = useState()
    const [hold,setHold] = useState([])
    const [edit,setEdit] = useState(true)
    const styles = useStyles(useTheme())
    const {
        oauth, setGrav
    } = useContext(Context)
    const [expanded, setExpanded] = useState(false);

    const [open, setOpen] = useState(false);

    const changeAvatar = async (e) => {
        e.preventDefault()
        setAvatar(<Avatar alt='avatar1' src={avatar1} sx={{ width: 100, height: 100 }} />)
        await axios.put(`http://localhost:3001/users/${oauth.id}`,{
            email: oauth.email,
            firstName: first,
            lastName: name,
            channels: chan,
            gravatar: 1
        },{
            headers: {
              'Authorization': `Bearer ${oauth.access_token}`
            },
        })
        setGravatar(1)
        setOpen(false)
        setGrav('1')
    }

    const changeAvatar1 = async (e) => {
        e.preventDefault()
        setAvatar(<Avatar alt='avatar2' src={avatar2} sx={{ width: 100, height: 100 }} />)
        await axios.put(`http://localhost:3001/users/${oauth.id}`,{
            email: oauth.email,
            firstName: first,
            lastName: name,
            channels: chan,
            gravatar: 2
        },{
            headers: {
              'Authorization': `Bearer ${oauth.access_token}`
            },
        })
        setGravatar(2)
        setOpen(false)
        setGrav('2')
    }

    const changeAvatar2 = async (e) => {
        setGravatar(3)
        e.preventDefault()
        setAvatar(<Avatar alt='avatar3' src={avatar3} sx={{ width: 100, height: 100 }} />)
        await axios.put(`http://localhost:3001/users/${oauth.id}`,{
            email: oauth.email,
            firstName: first,
            lastName: name,
            channels: chan,
            gravatar: 3
        },{
            headers: {
              'Authorization': `Bearer ${oauth.access_token}`
            },
        })
        setGravatar(3)
        setOpen(false)
        setGrav('3')
    }

    const changeAvatar3 = async (e) => {
        e.preventDefault()
        setAvatar(<Avatar alt='avatar4' src={avatar4} sx={{ width: 100, height: 100 }} />)
        await axios.put(`http://localhost:3001/users/${oauth.id}`,{
            email: oauth.email,
            firstName: first,
            lastName: name,
            channels: chan,
            gravatar: 4
        },{
            headers: {
              'Authorization': `Bearer ${oauth.access_token}`
            },
        })
        setGravatar(4)
        setOpen(false)
        setGrav('4')
    }

    useEffect(()=>{
        const fetch = async () => {
            await axios.get(`http://localhost:3001/user/${oauth.email}`,{
                headers: {
                    'Authorization': `Bearer ${oauth.access_token}`
                  }
            })
            .then(res => {
                setGravatar(res.data.gravatar)
                setName(res.data.lastName)
                setFirst(res.data.firstName)
                setChanUser(res.data.channels)
                setHold([res.data.firstName,res.data.lastName])
                
                if(gravatar===false)
                    setAvatar(<Gravatar email={oauth.email} size={150}/>)
                else{
                    switch(gravatar){
                        case 1:
                            setAvatar(<Avatar alt='avatar1' src={avatar1} sx={{ width: 100, height: 100 }} />)
                            break;
                        case 2:
                            setAvatar(<Avatar alt='avatar2' src={avatar2} sx={{ width: 100, height: 100 }} />)
                            break;
                        case 3:
                            setAvatar(<Avatar alt='avatar3' src={avatar3} sx={{ width: 100, height: 100 }} />)
                            break;
                        case 4:
                            setAvatar(<Avatar alt='avatar4' src={avatar4} sx={{ width: 100, height: 100 }} />)
                            break;
                        default:
                            break;
                    }
                }
            })
        }
        fetch()
    },[gravatar])

    const editUser = async () =>{
        await axios.put(`http://localhost:3001/users/${oauth.id}`,{
            email: oauth.email,
            firstName: first,
            lastName: name,
            channels: chan,
            gravatar: gravatar
        },{
            headers: {
              'Authorization': `Bearer ${oauth.access_token}`
            },
        })
        .then(res => {
            if(res){
                setHold([first,name])
                setEdit(!edit)
            }
        })
    }

    const handleEdit1 = (e) => {
        setName(e.target.value)
    }

    const handleEdit2 = (e) => {
        setFirst(e.target.value)
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
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
                        <Typography>
                            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                            Aliquam eget maximus est, id dignissim quam.
                        </Typography>
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
                        {gravatar ?
                            (<div sx={{ width: 100, height: 100 }}>
                                {avatar}
                            </div>)
                            :
                            (<Avatar sx={{ width: 100, height: 100 }}>
                                {avatar}
                            </Avatar>)
                        }
                        <div style={styles.avatarButton}>
                            <Button
                                variant='contained'
                                sx={{ margin: 2 }}
                                size='small'
                            //redirection on gravatar site
                            >
                                Change Gravatar
                            </Button>
                            <Button
                                variant='contained'
                                sx={{ margin: 2 }}
                                size='small'
                                onClick={handleClickOpen}
                            >
                                Change with models
                            </Button>
                            <Dialog
                                open={open}
                                TransitionComponent={Transition}
                                keepMounted
                                onClose={handleClose}
                                aria-describedby="alert-dialog-slide-description"
                            >
                                <DialogContent>
                                    <Button onClick={changeAvatar}>
                                        <Avatar alt='avatar1' src={avatar1} sx={{ width: 100, height: 100 }} />
                                    </Button>
                                    <Button onClick={changeAvatar1}>
                                        <Avatar alt='avatar2' src={avatar2} sx={{ width: 100, height: 100 }} />
                                    </Button>
                                    <Button onClick={changeAvatar2}>
                                        <Avatar alt='avatar3' src={avatar3} sx={{ width: 100, height: 100 }} />
                                    </Button>
                                    <Button onClick={changeAvatar3}>
                                        <Avatar alt='avatar4' src={avatar4} sx={{ width: 100, height: 100 }} />
                                    </Button>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <label htmlFor="contained-button-file">
                            <Input accept="image/*" id="contained-button-file" multiple type="file" />
                            <Button variant="contained" component="span" size='small'>
                                Upload an avatar
                            </Button>
                        </label>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3bh-content"
                        id="panel3bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0, color: '#326e61' }}>
                            Advanced settings
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
                            amet egestas eros, vitae egestas augue. Duis vel est augue.
                        </Typography>
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
                    <AccordionDetails sx={{display: 'flex', flexDirection:'column', justifyContent:'center', paddingBottom:3}}>
                        <div style={styles.data}>
                            <FingerprintIcon sx={{marginRight: 3, color:'#326e61'}}/>
                            <Typography sx={{color:'#326e61'}}>
                                {oauth.id}
                            </Typography>
                        </div>
                        <div style={styles.data}>
                            <AlternateEmailIcon sx={{marginRight: 3, color:'#326e61'}}/>
                            <Typography sx={{color:'#326e61'}}>
                                {oauth.email}
                            </Typography>
                        </div>
                        <div style={styles.data}>
                            <AccountCircleIcon sx={{marginRight: 3, color:'#326e61'}}/>
                            {edit ?
                                <Typography sx={{color:'#326e61'}}>
                                    {first}
                                </Typography>
                                :
                                <TextField sx={{color:'#326e61'}} value={first} onChange={handleEdit2}/>
                            }
                            
                        </div>
                        <div style={styles.data}>
                            <AccountCircleIcon sx={{marginRight: 3, color:'#326e61'}}/>
                            {edit ?
                                <Typography sx={{color:'#326e61'}}>
                                    {name}
                                </Typography>
                                :
                                <TextField sx={{color:'#326e61'}} value={name} onChange={handleEdit1}/>
                            }
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>
            <Button variant='contained' onClick={editUser}>Save</Button>
            <Button variant='contained' onClick={(e)=>{setEdit(!edit); setFirst(hold[0]); setName(hold[1]);}}>{edit ? "Edit" : "Cancel"}</Button>
        </div>
    );
}