
/** @jsxImportSource @emotion/react */
/* Component to manage login with dex */
import { useContext, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import crypto from 'crypto'
import qs from 'qs'
import axios from 'axios'
import {
  useNavigate
} from "react-router-dom";

// Layout
import { useTheme } from '@mui/styles';
import { Link, Button } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';

// Local contexte
import Context from '../Contexts/Context'

//encode functions
const base64URLEncode = (str) => {
  return str.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

const sha256 = (buffer) => {
  return crypto
    .createHash('sha256')
    .update(buffer)
    .digest()
}
//set styles
const useStyles = (theme) => ({
  button: {
    marginBottom: theme.spacing(4)
  },
  root: {
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
    backgroundColor: "#f0f0f0",
    paddingBottom: "20px",
    alignItems: 'center',
    '& > div': {
      margin: `${theme.spacing(1)}`,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    '& fieldset': {
      border: 'none',
      '& label': {
        marginBottom: theme.spacing(.5),
        display: 'block',
      },
    },
  },
})
// redirect user to dex to connect
const Redirect = ({
  config,
  codeVerifier,
}) => {
  const styles = useStyles(useTheme())
  const navigate = useNavigate();
  const redirect = (e) => {
    e.stopPropagation()
    const code_challenge = base64URLEncode(sha256(codeVerifier))
    const url = [
      `${config.authorization_endpoint}?`,
      `client_id=${config.client_id}&`,
      `scope=${config.scope}&`,
      `response_type=code&`,
      `redirect_uri=${config.redirect_uri}&`,
      `code_challenge=${code_challenge}&`,
      `code_challenge_method=S256`,
    ].join('')
    window.location = url
  }
  return (
    <div css={styles.root}>
      <CommentIcon sx={{ fontSize: 150, color: "#326e61", padding: 7 }} />
      <Button onClick={redirect} style={styles.button} variant="contained" color="primary">Login with OpenID Connect and OAuth2</Button>
      <Button variant="contained" onClick={(e) => {
        e.preventDefault()
        navigate(`/register`)
      }}>
        Register a new account
      </Button>
    </div>
  )
}
//display the finale component once connected with disconnected option
const Tokens = ({
  oauth
}) => {
  const { setOauth } = useContext(Context)
  const styles = useStyles(useTheme())
  const { id_token } = oauth
  const id_payload = id_token.split('.')[1]
  const { email } = JSON.parse(atob(id_payload))
  const logout = (e) => {
    e.stopPropagation()
    setOauth(null)
  }
  return (
    <div css={styles.root}>
      Welcome {email} <Link onClick={logout} >logout</Link>
    </div>
  )
}
//load token and set tokens in cookies + context
//remove token no more used
const LoadToken = ({
  code,
  codeVerifier,
  config,
  removeCookie,
  setOauth,
  setGravatar,
  setCookie
}) => {
  const styles = useStyles(useTheme())
  const navigate = useNavigate();
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.post(
          config.token_endpoint
          , qs.stringify({
            grant_type: 'authorization_code',
            client_id: `${config.client_id}`,
            code_verifier: `${codeVerifier}`,
            redirect_uri: `${config.redirect_uri}`,
            code: `${code}`,
          }))
        removeCookie('code_verifier')
        const payload = JSON.parse(
          Buffer.from(
            data.id_token.split('.')[1], 'base64'
          ).toString('utf-8')
        )
        //get user from db
        await axios.get(`http://localhost:3001/user/${payload.email}`)
          .then(async res => {
            //if user doesn't exist we create him
            if (res.data === "" || res.data == null) {
              await axios.post('http://localhost:3001/users', {
                email: payload.email,
                firstName: "default_name",
                lastName: "default_name",
                channels: [],
                gravatar: false
            },{
                headers: {
                  'Authorization': `Bearer ${payload.access_token}`
                }
            })
            .then(res2 => {
              setCookie('gravatar',false)
              setOauth(data, res2.data.id)
              setGravatar(false)
            })
          }
          else{
            //cookies and avatar
            setCookie('gravatar',res.data.gravatar)
            setOauth(data, res.data.id)
            setGravatar(res.data.gravatar)
          }
        })
        navigate('/')

      } catch (err) {
        console.error(err)
      }
    }
    fetch()
  })
  return (
    <div css={styles.root}>Loading tokens</div>
  )
}

export default function Login({
  onUser
}) {
  const styles = useStyles(useTheme());
  // const location = useLocation();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const {oauth, setOauth, setGrav} = useContext(Context)
  const config = {
    authorization_endpoint: 'http://localhost:5556/dex/auth',
    token_endpoint: 'http://localhost:5556/dex/token',
    client_id: 'webtech-frontend',
    redirect_uri: 'http://localhost:3000',
    scope: 'openid%20email%20offline_access',
  }
  const params = new URLSearchParams(window.location.search)
  const code = params.get('code')
  // is there a code query parameters in the url 
  if (!code) { // no: we are not being redirected from an oauth server
    if (!oauth) {
      const codeVerifier = base64URLEncode(crypto.randomBytes(32))
      setCookie('code_verifier', codeVerifier)
      return (
        <Redirect codeVerifier={codeVerifier} config={config} css={styles.root} />
      )
    } else { // yes: user is already logged in, great, is is working
      return (
        <Tokens oauth={oauth} css={styles.root} />
      )
    }
  } else { // yes: we are coming from an oauth server
    return (
      <LoadToken
        code={code}
        codeVerifier={cookies.code_verifier}
        config={config}
        setOauth={setOauth}
        removeCookie={removeCookie}
        setGravatar={setGrav}
        setCookie={setCookie} />
    )
  }
}
