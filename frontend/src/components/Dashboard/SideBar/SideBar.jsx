import React, { useState, useEffect } from 'react';
import {
  Drawer, IconButton, List,
} from '@material-ui/core';
import {
  Home as HomeIcon,
  // NotificationsNone as NotificationsIcon,
  ArrowBack as ArrowBackIcon,
} from '@material-ui/icons';
import { useTheme } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';
import useStyles from './styles';
import SidebarLink from './SideBarLink/SideBarLink';
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from '../../../context/LayoutContext/LayoutContext';

const patientStructure = [
  {
    id: 1,
    label: 'Appointments',
    link: '/app/tables',
    icon: <HomeIcon />,
  },
  {
    id: 2,
    label: 'Query/Concern',
    link: '/app/tables',
    icon: <HomeIcon />,
  },
  {
    id: 3,
    label: 'General Notes',
    link: '/app',
    icon: <HomeIcon />,
  },
];

const adminStructure = [
  {
    id: 1,
    label: 'Hospitals',
    link: '/app/hospital',
    icon: <HomeIcon />,
  },
  {
    id: 2,
    label: 'Hospital Admins',
    link: '/app/hadmin',
    icon: <HomeIcon />,
  },
  {
    id: 3,
    label: 'Doctors',
    link: '/app/doctor',
    icon: <HomeIcon />,
  },
  {
    id: 4,
    label: 'General Notes',
    link: '/app/notes',
    icon: <HomeIcon />,
  },
];

const hospitalAdminStructure = [
  {
    id: 1,
    label: 'Doctor management',
    link: '/app/dashboard',
    icon: <HomeIcon />,
  },
  {
    id: 2,
    label: 'Query/Concern',
    link: '/app/dashboard',
    icon: <HomeIcon />,
  },
  {
    id: 3,
    label: 'Patient',
    link: '/app/dashboard',
    icon: <HomeIcon />,
  },
  {
    id: 4,
    label: 'Announcement',
    link: '/app/dashboard',
    icon: <HomeIcon />,
  },
];

const doctorStructure = [
  {
    id: 1,
    label: 'Dashboard',
    link: '/app/dashboard',
    icon: <HomeIcon />,
  },
  {
    id: 1,
    label: 'Query/Concern',
    link: '/app/dashboard',
    icon: <HomeIcon />,
  },
  {
    id: 2,
    label: 'Appointments',
    link: '/app/dashboard',
    icon: <HomeIcon />,
  },
  {
    id: 4,
    label: 'Announcement',
    link: '/app/dashboard',
    icon: <HomeIcon />,
  },
];

function Sidebar({ location, role }) {
  const classes = useStyles();
  const theme = useTheme();
  // global
  const { isSidebarOpened } = useLayoutState();
  const layoutDispatch = useLayoutDispatch();

  // local
  const [isPermanent, setPermanent] = useState(true);

  function handleWindowWidthChange() {
    const windowWidth = window.innerWidth;
    const breakpointWidth = theme.breakpoints.values.md;
    const isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
  let sidebarArray;
  if (role === 'admin') {
    sidebarArray = adminStructure;
  } else if (role === 'hospitaladmin') {
    sidebarArray = hospitalAdminStructure;
  } else if (role === 'patient') {
    sidebarArray = patientStructure;
  } else {
    sidebarArray = doctorStructure;
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener('resize', handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? 'permanent' : 'temporary'}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {sidebarArray.map((link) => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
    </Drawer>
  );
}

function mapStateToProps(state) {
  return {
    role: state.user.role,
  };
}

export default connect(mapStateToProps, null)(withRouter(Sidebar));
