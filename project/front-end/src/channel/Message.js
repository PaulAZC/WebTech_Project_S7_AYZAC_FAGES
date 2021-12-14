import { useState } from "react"
import { useTheme } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
// Time
import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
import updateLocale from 'dayjs/plugin/updateLocale'
dayjs.extend(calendar)
dayjs.extend(updateLocale)
dayjs.updateLocale('en', {
  calendar: {
    sameElse: 'DD/MM/YYYY hh:mm A'
  }
})

const useStyles = (theme) => ({
    message: {
      padding: '.2rem .5rem',
      ':hover': {
        backgroundColor: 'rgba(255,255,255,.05)',
      },
    },
    button:{
      position: 'fixed',
      left: "5%",
      zIndex: 1,
      backgroundColor: "black"
    },
})

const Message = ({message,value,deleteFct,deletable})=>{
    const styles = useStyles(useTheme())
    const [showButton,setButton] = useState(false)

    const clickDelete = (e)=>{
        e.preventDefault()
        deleteFct(message)
    } 

    const clickEdit = (e)=>{
        e.preventDefault()
        console.log("oui")
    } 

    return(
        <li css={styles.message} onMouseEnter={e =>setButton(true)} onMouseLeave={e=>setButton(false)}>
            { deletable ?
                <div style={{visibility: showButton ? 'visible' : 'hidden'}} css={styles.button} >
                    <IconButton aria-label="delete" size="small" onClick={clickDelete}>
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton aria-label="edit" size="small" onClick={clickEdit}>
                        <EditIcon fontSize="inherit" />
                    </IconButton>
                </div>
                : <p></p> }
            <p>
                <span>{message.author}</span>
                {' - '}
                <span>{dayjs().calendar(message.creation)}</span>
            </p>
            <div dangerouslySetInnerHTML={{__html: value}}>
            </div>
        </li>
    )
}

export default Message