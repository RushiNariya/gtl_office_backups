import React, { useEffect } from 'react';
import {
  Route, Switch, withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import useStyles from './styles';

// components
import Header from '../Header/Header';
import Sidebar from '../SideBar/SideBar';

// context
import { useLayoutState } from '../../../context/LayoutContext/LayoutContext';
import ChangePassword from '../ChangePassword/ChangePassword';
import HospitalAdmin from '../components/HospitalAdmin/HospitalAdmin';
import { resetErrorAction } from '../../../store/actions/user';
import Hospital from '../components/Hospital/Hospital';
import Doctor from '../components/Doctor/Doctor';

function Layout({ history, resetError }) {
  const classes = useStyles();

  // global
  const layoutState = useLayoutState();

  useEffect(() => {
    resetError();
  }, []);

  return (
    <div className={classes.root}>
      <>
        <Header history={history} />
        <Sidebar />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          <Switch>
            <Route path="/app/changepassword" component={ChangePassword} />
            <Route path="/app/hadmin" component={HospitalAdmin} />
            <Route path="/app/hospital" component={Hospital} />
            <Route path="/app/doctor" component={Doctor} />
            {/* <Route path="/app/tables" component={Tables} />  */}
            {/* <Route
              exact
              path="/app/ui"
              render={() => <Redirect to="/app/ui/icons" />}
            /> */}
          </Switch>
        </div>
      </>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    resetError: () => dispatch(resetErrorAction()),
  };
}

export default connect(null, mapDispatchToProps)(withRouter(Layout));
