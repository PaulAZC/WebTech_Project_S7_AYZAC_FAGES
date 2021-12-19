import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useContext } from 'react';
import Context from './Context';
import { useTheme } from '@mui/styles';
import { Avatar, Button, ListItemIcon, ListItemText } from '@mui/material';
import Gravatar from 'react-gravatar';
import { Slide } from '@mui/material';
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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Input = styled('input')({
    display: 'none',
});

export default function Settings() {
    const navigate = useNavigate()
    const styles = useStyles(useTheme())
    const {
        oauth, setOauth,
    } = useContext(Context)
    const [expanded, setExpanded] = React.useState(false);

    const [open, setOpen] = React.useState(false);

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
                        <Avatar sx={{ width: 150, height: 150 }}>
                            <Gravatar
                                email={oauth.email}
                                size={150}
                            />
                        </Avatar>
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
                                    <Button>
                                        <Avatar alt='avatar1' src={avatar1} sx={{ width: 100, height: 100 }} />
                                    </Button>
                                    <Button>
                                        <Avatar alt='avatar2' src={avatar2} sx={{ width: 100, height: 100 }} />
                                    </Button>
                                    <Button>
                                        <Avatar alt='avatar3' src={avatar3} sx={{ width: 100, height: 100 }} />
                                    </Button>
                                    <Button>
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
                            <AlternateEmailIcon sx={{marginRight: 3, color:'#326e61'}}/>
                            <Typography sx={{color:'#326e61'}}>
                                {oauth.email}
                            </Typography>
                        </div>
                        <div style={styles.data}>
                            <AccountCircleIcon sx={{marginRight: 3, color:'#326e61'}}/>
                            <Typography sx={{color:'#326e61'}}>
                                Username
                            </Typography>
                        </div>
                        <div style={styles.data}>
                            <PasswordIcon sx={{marginRight: 3, color:'#326e61'}}/>
                            <Typography sx={{color:'#326e61'}}>
                                Password
                            </Typography>
                        </div>
                        <div style={styles.data}>
                            <GroupsIcon sx={{marginRight: 3, color:'#326e61'}}/>
                            <Typography sx={{color:'#326e61'}}>
                                Channels
                            </Typography>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>
            <Button variant='contained' onClick={
                (e) => {
                    e.preventDefault()
                    navigate(`/channels`)
                }
            }>Save</Button>
        </div>
    );
}