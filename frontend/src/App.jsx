import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Layout from './components/Dashboard/Layout/Layout';
import Toast from './components/Toast/Toast';
import ForgotPassword from './components/ApplyForgotPassword/ApplyForgotPassword';
import { refreshStateAction } from './store/actions/user';
import Error from './components/Error/Error';
import Authorization from './hoc/Authorization';
// import Authorization from './hoc/Authorization';
// import { useStateValue } from './context/GlobalState';

function App({ refreshStateAction: refreshState }) {
  // const registerPage = Authorization(['admin']);
  // const articleListPage = Authorization(['admin', 'editor', 'viewer']);
  // const articleDetailsPage = Authorization(['admin', 'editor', 'viewer']);
  // const addArticlesPage = Authorization(['admin', 'editor']);
  const authenticateRoute = Authorization();

  // const { token } = useStateValue();

  useEffect(() => {
    refreshState();
  }, []);

  return (
    <BrowserRouter>
      <Container className="container">
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/app" component={authenticateRoute(Layout)} />
          <Route path="/applyforgotpassword" exact component={ForgotPassword} />
          <Route>
            <Error
              error="404 Page not found"
              message="we can not seem to find the page you are looking for."
            />
          </Route>
        </Switch>
        <Toast />
      </Container>
    </BrowserRouter>
  );
}

export default connect(null, { refreshStateAction })(App);
