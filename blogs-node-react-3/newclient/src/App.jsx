import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Container } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import AddBlog from './components/AddBlog/AddBlog';
import BlogList from './components/Blog/BlogList/BlogList';
import MyBlogs from './components/Blog/MyBlogs/MyBlogs';
import BlogDetails from './components/BlogDetails/BlogDetails';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import Navigation from './components/Navigation/Navigation';
import Registration from './components/Registration/Registration';
import Welcome from './components/Welcome/Welcome';
import Authorization from './hoc/Authorization';

const httpLink = createHttpLink({
  uri: 'http://10.0.2.234:8080/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const localstate = JSON.parse(localStorage.getItem('state'));
  // return the headers to the context so httpLink can read them
  
  return {
    headers: {
      ...headers,
      authorization: localstate.token ? `Bearer ${localstate.token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const author = Authorization(['Author']);
  const welcomePage = Authorization(['Author', 'Moderator']);

  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
          style: {
            borderRadius: '10px',
            background: '#fff',
            padding: '1rem',
            color: '#000',
          },
        }}
      />
      <ApolloProvider client={client}>
        <Navigation />
        <div className="main-container">
          <Container>
            <div>
              <Switch>
                <Route path="/login" exact component={Login} />
                <Route path="/logout" exact component={Logout} />
                {/* {token && role === 'Author' ? (
                  <Route path="/myblogs" exact component={MyBlogs} />
                ) : null} */}
                <Route path="/myblogs" exact component={author(MyBlogs)} />
                {/* {token && role === 'Author' ? (
                  <Route path="/addblog" exact component={AddBlog} />
                ) : null} */}
                <Route path="/addblog" exact component={author(AddBlog)} />
                <Route path="/welcome" exact component={welcomePage(Welcome)} />
                <Route path="/registration" exact component={Registration} />
                <Route path="/blog/:id" exact component={BlogDetails} />
                <Route path="/" exact component={BlogList} />
              </Switch>
            </div>
          </Container>
        </div>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
