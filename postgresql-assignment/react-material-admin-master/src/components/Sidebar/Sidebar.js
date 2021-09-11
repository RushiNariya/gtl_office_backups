import React, { useState, useEffect, useContext } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
  Home as HomeIcon,
  NotificationsNone as NotificationsIcon,
  FormatSize as TypographyIcon,
  FilterNone as UIElementsIcon,
  BorderAll as TableIcon,
  QuestionAnswer as SupportIcon,
  LibraryBooks as LibraryIcon,
  HelpOutline as FAQIcon,
  ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";

// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";
import Dot from "./components/Dot";
import { userContext } from "../../context/user/userProvider";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";

const patientStructure = [
  { id: 1, label: "Dashboard", link: "/app/tables", icon: <HomeIcon /> },
  { id: 1, label: "Appointments", link: "/app/tables", icon: <HomeIcon /> },
  { id: 2, label: "Query Concern", link: "/app/tables", icon: <HomeIcon /> },
  { id: 3, label: "General Notes", link: "/app", icon: <HomeIcon /> },
];

const AdminStructure = [
  { id: 1, label: "Hospitals", link: "/app/dashboard", icon: <HomeIcon /> },
  { id: 2, label: "Doctors", link: "/app/dashboard", icon: <HomeIcon /> },
  { id: 3, label: "General Notes", link: "/app/dashboard", icon: <HomeIcon /> },
];

const hospitalAdminStructure = [
  { id: 2, label: "Dashboard", link: "/app/dashboard", icon: <HomeIcon /> },
  {
    id: 1,
    label: "Doctor management",
    link: "/app/dashboard",
    icon: <HomeIcon />,
  },
  { id: 2, label: "query-concern", link: "/app/dashboard", icon: <HomeIcon /> },
  { id: 3, label: "Patient", link: "/app/dashboard", icon: <HomeIcon /> },
  {
    id: 4,
    label: "Announcement",
    link: "/app/dashboard",
    icon: <NotificationsIcon />,
  },
];

const DoctorStructure = [
  { id: 1, label: "Dashboard", link: "/app/dashboard", icon: <HomeIcon /> },
  { id: 1, label: "query-concern", link: "/app/dashboard", icon: <HomeIcon /> },
  { id: 2, label: "Appointments", link: "/app/dashboard", icon: <HomeIcon /> },
  {
    id: 4,
    label: "Announcement",
    link: "/app/dashboard",
    icon: <NotificationsIcon />,
  },
];

// const structure = [
//   { id: 0, label: "Dashboard", link: "/app/dashboard", icon: <HomeIcon /> },
//   {
//     id: 1,
//     label: "Typography",
//     link: "/app/typography",
//     icon: <TypographyIcon />,
//   },
//   { id: 2, label: "Tables", link: "/app/tables", icon: <TableIcon /> },
//   {
//     id: 3,
//     label: "Notifications",
//     link: "/app/notifications",
//     icon: <NotificationsIcon />,
//   },
//   {
//     id: 4,
//     label: "UI Elements",
//     link: "/app/ui",
//     icon: <UIElementsIcon />,
//     children: [
//       { label: "Icons", link: "/app/ui/icons" },
//       { label: "Charts", link: "/app/ui/charts" },
//       { label: "Maps", link: "/app/ui/maps" },
//     ],
//   },
//   { id: 5, type: "divider" },
//   { id: 6, type: "title", label: "HELP" },
//   { id: 7, label: "Library", link: "https://flatlogic.com/templates", icon: <LibraryIcon /> },
//   { id: 8, label: "Support", link: "https://flatlogic.com/forum", icon: <SupportIcon /> },
//   { id: 9, label: "FAQ", link: "https://flatlogic.com/forum", icon: <FAQIcon /> },
//   { id: 10, type: "divider" },
//   { id: 11, type: "title", label: "PROJECTS" },
//   {
//     id: 12,
//     label: "My recent",
//     link: "",
//     icon: <Dot size="small" color="warning" />,
//   },
//   {
//     id: 13,
//     label: "Starred",
//     link: "",
//     icon: <Dot size="small" color="primary" />,
//   },
//   {
//     id: 14,
//     label: "Background",
//     link: "",
//     icon: <Dot size="small" color="secondary" />,
//   },
// ];

function Sidebar({ location }) {
  var { token, role } = useContext(userContext);

  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function () {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
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
        {role === "admin" &&
          AdminStructure.map((link) => (
            <SidebarLink
              key={link.id}
              location={location}
              isSidebarOpened={isSidebarOpened}
              {...link}
            />
          ))}
        {role === "hospitaladmin" &&
          hospitalAdminStructure.map((link) => (
            <SidebarLink
              key={link.id}
              location={location}
              isSidebarOpened={isSidebarOpened}
              {...link}
            />
          ))}
        {role === "patient" &&
          patientStructure.map((link) => (
            <SidebarLink
              key={link.id}
              location={location}
              isSidebarOpened={isSidebarOpened}
              {...link}
            />
          ))}
        {role === "doctor" &&
          DoctorStructure.map((link) => (
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

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
