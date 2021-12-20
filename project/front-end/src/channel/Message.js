/** @jsxImportSource @emotion/react */
import { useState } from "react"

// Layout MUI
import { useTheme } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';

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
        display: "flex",
        flexDirection: "raw",
        ':hover': {
            backgroundColor: '#f0f0f0',
        },
    },
    button: {
        position: 'fixed',
        left: "5%",
        zIndex: 1,
    },
})

const Message = ({ i, message, value, deletable, deleteFct, editFct }) => {
    const styles = useStyles(useTheme())
    const [showButton, setButton] = useState(false)
    const [actValue, setValue] = useState(value)
    const [onEdit, setEdit] = useState(true)

    const clickDelete = (e) => {
        e.preventDefault()
        deleteFct(message)
    }

    const changeEdit = (e) => {
        e.preventDefault()
        setEdit(true)
        message.content = actValue
        editFct(i, message)

    }

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    const clickEdit = (e) => {
        e.preventDefault()
        let temp = actValue.replace('<p>', '')
        temp = temp.replace('</p>', '')
        setEdit(false)
        setValue(temp)
    }
    return (
        <li css={styles.message} onMouseEnter={e => setButton(true)} onMouseLeave={e => setButton(false)}>
            <p>
                <span>{message.author}</span>
                {' - '}
                <span>{dayjs().calendar(message.creation)}</span>
            </p>
            {onEdit ?
                <div dangerouslySetInnerHTML={{ __html: actValue }}>
                </div>
                : <div>
                    <input value={actValue} onChange={handleChange} />
                    <IconButton aria-label="edit" size="small" onClick={changeEdit}>
                        <CheckIcon fontSize="inherit" />
                    </IconButton>
                </div>
            }
            {deletable ?
                <div style={{ visibility: showButton ? 'visible' : 'hidden' }} css={styles.button} >
                    <IconButton aria-label="delete" size="small" onClick={clickDelete}>
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton aria-label="edit" size="small" onClick={clickEdit}>
                        <EditIcon fontSize="inherit" />
                    </IconButton>
                </div>
                : <p></p>}
        </li>
    )
}

export default Message