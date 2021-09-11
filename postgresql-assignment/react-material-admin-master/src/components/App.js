import React, { useContext } from "react";
import {
  BrowserRouter,
  HashRouter,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

// components
import Layout from "./Layout/Layout";

// pages
import Error from "../pages/error/Error";
import LoginDashboard from "../pages/login/LoginDashboard";

// context
import { userContext } from "../context/user/userProvider";
import Dashboard from "../pages/dashboard/Dashboard";
import { Typography } from "@material-ui/core";
import Tables from "../pages/tables/Tables";
import Register from "../pages/Reg/Register";
import Login from "../pages/Log/Login";
import Logout from "./Logout/Logout";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import ChangePassword from "../pages/changePassword/ChangePassword";

export default function App() {
  // global
  var { token } = useContext(userContext);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/app/dashboard" />} />
        <Route
          exact
          path="/app"
          render={() => <Redirect to="/app/dashboard" />}
        />
        
        <Route path="/app" component={Layout} />
        <Route path="/user/login" component={Login} />
        <Route path="/user/register" component={Register} />
        <Route path="/user/logout" component={Logout} />
        <Route path="/user/applyforgotpassword" component={ForgotPassword} />
        <Route path="/user/changepassword" component={ChangePassword} />

        //----------pending
        <Route path="/user/forgotpassword" component={ForgotPassword} />

        {/* <Route path="/login" component={LoginDashboard} />
        <Route path="/login" component={LoginDashboard} /> */}

        <Route component={Error} />
      </Switch>
    </BrowserRouter>
  );
}