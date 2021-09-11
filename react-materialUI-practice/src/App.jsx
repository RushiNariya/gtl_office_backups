import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import Create from './components/Create';
import Layout from './components/Layout';
import Notes from './components/Notes';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fefefe',
    },
    secondary: purple,
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Notes} />
            <Route path="/create" component={Create} />
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
