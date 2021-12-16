
/** @jsxImportSource @emotion/react */
import {forwardRef, useImperativeHandle, useLayoutEffect, useRef, useContext, useState} from 'react'
// Layout
import { useTheme } from '@mui/styles';
// Markdown
import { unified } from 'unified'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import html from 'rehype-stringify'

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';

import Context from '../Context';
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
  root: {
    position: 'relative',
    flex: '1 1 auto',
    overflow: 'auto',
    '& ul': {
      'margin': 0,
      'padding': 0,
      'textIndent': 0,
      'listStyleType': 0,
    },
  },
  fabWrapper: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: '50px',
  },
  fab: {
    position: 'fixed !important',
    top: 0,
    width: '50px',
  },
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

export default forwardRef(({
  channel,
  messages,
  onScrollDown,
  removeMessage,
  editMessage
}, ref) => {
  const styles = useStyles(useTheme())
  const {oauth,} = useContext(Context)
  const [actValue,setValue] = useState()
  const [clicked,setClicked] = useState(null)
  // Expose the `scroll` action
  useImperativeHandle(ref, () => ({
    scroll: scroll
  }));
  const rootEl = useRef(null)
  const scrollEl = useRef(null)
  const scroll = () => {
    scrollEl.current.scrollIntoView()
  }
  // See https://dev.to/n8tb1t/tracking-scroll-position-with-react-hooks-3bbj
  const throttleTimeout = useRef(null) // react-hooks/exhaustive-deps
  useLayoutEffect( () => {
    const rootNode = rootEl.current // react-hooks/exhaustive-deps
    const handleScroll = () => {
      if (throttleTimeout.current === null) {
        throttleTimeout.current = setTimeout(() => {
          throttleTimeout.current = null
          const {scrollTop, offsetHeight, scrollHeight} = rootNode // react-hooks/exhaustive-deps
          onScrollDown(scrollTop + offsetHeight < scrollHeight)
        }, 200)
      }
    }
    handleScroll()
    rootNode.addEventListener('scroll', handleScroll)
    return () => rootNode.removeEventListener('scroll', handleScroll)
  })
  
  const clickDelete = (message)=>{
    const data = messages.filter(i => i.creation !== message.creation)
    removeMessage(data,message)
  }

  const clickEdit = (index,message)=>{
    setClicked(index)
    setValue(message.content)
  } 

  const handleChange = (e)=>{
    setValue(e.target.value)
  }

  const changeEdit = (i,sms)=>{
    sms.content = actValue
    editMessage(i,sms)
    setClicked(null)
  }

  return (
    <div css={styles.root} ref={rootEl}>
      <ul>
        { messages.map( (message, i) => {
            const {value} = unified()
            .use(markdown)
            .use(remark2rehype)
            .use(html)
            .processSync(message.content);
            let deletable = false;
            if(message.author === oauth.email){
              deletable = true
            }
            return (
              <li key={i} css={styles.message}>
                { deletable ?
                (<div>
                    <IconButton aria-label="delete" size="small" onClick={clickDelete.bind(this,message)}>
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton aria-label="edit" size="small" onClick={clickEdit.bind(this,i,message)}>
                        <EditIcon fontSize="inherit" />
                    </IconButton>
                </div>)
                : (<p></p>) }
                <p>
                  <span>{message.author}</span>
                  {' - '}
                  <span>{dayjs().calendar(message.creation)}</span>
                </p>
                {clicked !== i ?
                    <div dangerouslySetInnerHTML={{__html: value}}>
                    </div>
                    : <div>
                        <input value={actValue} onChange={handleChange.bind(this)}/>
                        <IconButton aria-label="edit" size="small" onClick={changeEdit.bind(this,i,message)}>
                            <CheckIcon fontSize="inherit" />
                        </IconButton>
                    </div>
                }
              </li>
            )
        })}
      </ul>
      <div ref={scrollEl} />
    </div>
  )
})
