import { Container } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AddBlog from './components/AddBlog/AddBlog';
import BlogList from './components/Blog/BlogList/BlogList';
import BlogDetails from './components/BlogDetails/BlogDetails';
import EditBLog from './components/EditBlog/EditBlog';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import Navigation from './components/Navigation/Navigation';
import Registration from './components/Registration/Registration';
import Authorization from './hoc/Authorization';
import './App.css';
import Error from './components/Error/Error';

function App() {
  const administrator = Authorization(['administrator']);
  const addBlogPage = Authorization(['administrator', 'editor']);
  const allBlogsPage = Authorization(['administrator', 'editor', 'viewer']);

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
      <Navigation />
      <div className="main-container">
        <Container>
          <div>
            <Switch>
              <Route path="/" exact component={Login} />
              <Route path="/logout" exact component={Logout} />
              <Route path="/addblog" exact component={addBlogPage(AddBlog)} />
              <Route
                path="/addUser"
                exact
                component={administrator(Registration)}
              />
              <Route path="/blog/:id" exact component={BlogDetails} />
              <Route path="/blog/:id/edit" exact component={administrator(EditBLog)} />
              <Route path="/blogs" exact component={allBlogsPage(BlogList)} />
              <Route>
                <Error
                  error="404 Page not found"
                  message="we can not seem to find the page you are looking for."
                />
              </Route>
            </Switch>
          </div>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
