// React
import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';
import {
  BrowserRouter as Router,
} from "react-router-dom";

// Local
import App from './App';
import * as serviceWorker from './serviceWorker';

// CSS and font
import './css/index.css';
import 'typeface-roboto'

// Context
import { Provider as ContextProvider } from './Contexts/Context';


// Layout
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: "Roboto",
  },
  spacing: 5,
  palette: {
    primary: {
      main: "#326e61",
      red: 'red'
    },
    secondary: {
      main: "#f0f0f0"
    },
    error: {
      main: "#d1a04f"
    }
  }
});

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <CookiesProvider>
        <ThemeProvider theme={theme}>
          <Router>
            <App />
          </Router>
        </ThemeProvider>
      </CookiesProvider>
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
